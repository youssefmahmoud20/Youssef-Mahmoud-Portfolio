import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { asset, base, products, productUrl, money } from "./content";
import type { Product } from "./content";
import type { Cart } from "./state";
import { useApp } from "./state";
import { Heading, Notice } from "./components";
import { Icon } from "./icons";

export function ProductGrid({ items }: { items: Product[] }) {
  const { addToCart } = useApp();
  const [added, setAdded] = useState<string | null>(null);
  return (
    <>
      {added && (
        <Notice>
          “{added}” has been added to your cart.{" "}
          <Link to={`${base}/cart/`}>View cart</Link>
        </Notice>
      )}
      <div className="product-grid">
        {items.map((p) => (
          <article className="product-card" key={p.id}>
            <Link to={productUrl(p)} className="image-link">
              <img
                src={asset(p.image.replace(".jpg", "-300x300.jpg"))}
                alt={p.name}
                width="300"
                height="300"
                loading="lazy"
              />
            </Link>
            <div className="product-card-info">
              <h3>
                <Link to={productUrl(p)}>{p.name}</Link>
              </h3>
              <Link to={productUrl(p)} className="product-price">
                {money(p.price)}
              </Link>
              <button
                className="cart-square"
                aria-label={`Add to cart: “${p.name}”`}
                onClick={() => {
                  addToCart(p.id);
                  setAdded(p.name);
                }}
              >
                <Icon name="cart" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
const sorting = [
  ["menu_order", "Default sorting"],
  ["popularity", "Sort by popularity"],
  ["rating", "Sort by average rating"],
  ["date", "Sort by latest"],
  ["price", "Sort by price: low to high"],
  ["price-desc", "Sort by price: high to low"],
];
export function Shop({ category }: { category?: string }) {
  const location = useLocation(),
    navigate = useNavigate();
  const sort =
    new URLSearchParams(location.search).get("orderby") || "menu_order";
  let items = category
    ? products.filter((p) => p.categorySlug === category)
    : [products[1], products[0]];
  if (sort === "price" || sort === "price-desc")
    items = [...items].sort((a, b) =>
      sort === "price" ? a.price - b.price : b.price - a.price,
    );
  return (
    <section>
      <Heading>{category ? items[0]?.category || "Shop" : "Shop"}</Heading>
      <div className="shop-toolbar">
        <p>
          {items.length === 1
            ? "Showing the single result"
            : "Showing all 2 results"}
        </p>
        <select
          aria-label="Shop order"
          value={sort}
          onChange={(e) =>
            navigate(`${location.pathname}?orderby=${e.target.value}`)
          }
        >
          {sorting.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <ProductGrid items={items} />
    </section>
  );
}
export function ProductDetail({ product: p }: { product: Product }) {
  const { setViewer, addToCart } = useApp();
  const [qty, setQty] = useState(1),
    [added, setAdded] = useState(false);
  const { hash } = useLocation();
  const navigate = useNavigate();
  const tab = hash.includes("additional")
    ? "attributes"
    : hash.includes("reviews")
      ? "reviews"
      : "description";
  useEffect(() => {
    setAdded(false);
    setQty(1);
  }, [p.id]);
  return (
    <article className="product-detail">
      {added && (
        <Notice>
          “{p.name}” has been added to your cart.{" "}
          <Link to={`${base}/cart/`}>View cart</Link>
        </Notice>
      )}
      <div className="product-summary-grid">
        <button
          className="product-photo"
          onClick={() =>
            setViewer({ kind: "images", images: [p.image], title: p.name })
          }
          aria-label="View full-screen image gallery"
        >
          <img src={asset(p.image)} alt={p.name} />
          <span>
            <Icon name="zoom" />
          </span>
        </button>
        <div className="product-summary">
          <h1 className="detail-title">{p.name}</h1>
          <div className="single-price">{money(p.price)}</div>
          <p>{p.short}</p>
          <form
            className="add-to-cart"
            onSubmit={(e) => {
              e.preventDefault();
              addToCart(p.id, qty);
              setAdded(true);
            }}
          >
            <label className="sr-only" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={1}
              max={99}
              required
              value={qty}
              onChange={(e) =>
                setQty(Math.min(99, Math.max(1, Number(e.target.value))))
              }
            />
            <button className="primary-button">Add to cart</button>
          </form>
          <p className="product-category">
            Category:{" "}
            <Link to={`${base}/product-category/${p.categorySlug}/`}>
              {p.category}
            </Link>
          </p>
        </div>
      </div>
      <div
        className="product-tabs"
        role="tablist"
        aria-label="Product information"
      >
        {[
          ["description", "Description", "tab-description"],
          [
            "attributes",
            "Additional information",
            "tab-additional_information",
          ],
          ["reviews", "Reviews (0)", "tab-reviews"],
        ].map(([value, label, id]) => (
          <button
            role="tab"
            id={`${id}-control`}
            aria-controls={id}
            aria-selected={tab === value}
            className={tab === value ? "active" : ""}
            onClick={() => navigate("#" + id, { replace: true })}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="product-tab-content"
        role="tabpanel"
        id={tab === "attributes" ? "tab-additional_information" : `tab-${tab}`}
        aria-labelledby={`${tab === "attributes" ? "tab-additional_information" : `tab-${tab}`}-control`}
      >
        {tab === "description" ? (
          <>
            <h2>Description</h2>
            <p>{p.description}</p>
          </>
        ) : tab === "attributes" ? (
          <>
            <h2>Additional information</h2>
            <table className="attributes">
              <tbody>
                {p.attributes.map(([label, value]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <ReviewForm product={p} />
        )}
      </div>
      <Heading>Related products</Heading>
      <ProductGrid items={products.filter((x) => x.id !== p.id)} />
    </article>
  );
}
function ReviewForm({ product }: { product: Product }) {
  const [rating, setRating] = useState(0),
    [status, setStatus] = useState("");
  return (
    <div className="review-form">
      <h2>Reviews</h2>
      <p>There are no reviews yet.</p>
      <h3>Be the first to review “{product.name}”</h3>
      <p>
        Your email address will not be published. Required fields are marked *
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus(
            "Review submission is not connected in this preview. Your review has not been published.",
          );
        }}
      >
        <fieldset className="rating-field">
          <legend>Your rating *</legend>
          {[1, 2, 3, 4, 5].map((n) => (
            <label className={n <= rating ? "selected" : ""} key={n}>
              <input
                required
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
              />
              <span className="sr-only">
                {n} {n === 1 ? "star" : "stars"}
              </span>
              <Icon name="star" />
            </label>
          ))}
        </fieldset>
        <label className="field">
          Your review *<textarea required name="review" rows={4} />
        </label>
        <div className="form-grid">
          <label className="field">
            Name *<input required name="name" />
          </label>
          <label className="field">
            Email *<input required type="email" name="email" />
          </label>
        </div>
        <label className="checkbox-field">
          <input type="checkbox" /> Save my name, email, and website in this
          browser for the next time I comment.
        </label>
        <button className="primary-button">Submit</button>
        {status && (
          <div className="form-status" role="status">
            {status}
          </div>
        )}
      </form>
    </div>
  );
}
function cartItems(cart: Cart) {
  return products.filter((p) => cart[p.id] > 0);
}
const total = (cart: Cart) =>
  cartItems(cart).reduce((sum, p) => sum + p.price * cart[p.id], 0);
export function CartPage() {
  const { cart, setCart } = useApp();
  const [draft, setDraft] = useState<Cart>(cart),
    [removed, setRemoved] = useState<{ id: number; qty: number } | null>(null),
    [coupon, setCoupon] = useState(""),
    [couponMessage, setCouponMessage] = useState("");
  useEffect(() => setDraft(cart), [cart]);
  const remove = (id: number) => {
    setRemoved({ id, qty: cart[id] });
    const next = { ...cart };
    delete next[id];
    setCart(next);
  };
  const update = (e: FormEvent) => {
    e.preventDefault();
    const next = Object.fromEntries(
      Object.entries(draft).filter(([, n]) => n > 0),
    );
    setCart(next);
  };
  return (
    <section>
      <Heading>Cart</Heading>
      {removed && (
        <Notice>
          Item removed.{" "}
          <button
            className="text-button"
            onClick={() => {
              setCart({ ...cart, [removed.id]: removed.qty });
              setRemoved(null);
            }}
          >
            Undo?
          </button>
        </Notice>
      )}
      {cartItems(cart).length === 0 ? (
        <>
          <Notice>Your cart is currently empty.</Notice>
          <Link className="primary-button" to={`${base}/shop/`}>
            Return to shop
          </Link>
        </>
      ) : (
        <>
          <form onSubmit={update}>
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>
                      <span className="sr-only">Remove item</span>
                    </th>
                    <th>
                      <span className="sr-only">Thumbnail image</span>
                    </th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems(cart).map((p) => (
                    <tr key={p.id}>
                      <td>
                        <button
                          type="button"
                          className="remove-item"
                          onClick={() => remove(p.id)}
                          aria-label={`Remove ${p.name} from cart`}
                        >
                          <Icon name="close" />
                        </button>
                      </td>
                      <td>
                        <Link to={productUrl(p)}>
                          <img
                            src={asset(p.image.replace(".jpg", "-300x300.jpg"))}
                            alt=""
                            width="60"
                            height="60"
                          />
                        </Link>
                      </td>
                      <td>
                        <Link to={productUrl(p)}>{p.name}</Link>
                      </td>
                      <td data-label="Price">{money(p.price)}</td>
                      <td data-label="Quantity">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          aria-label={`${p.name} quantity`}
                          value={draft[p.id] ?? cart[p.id]}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              [p.id]: Math.max(
                                0,
                                Math.min(99, Number(e.target.value)),
                              ),
                            })
                          }
                        />
                      </td>
                      <td data-label="Subtotal">
                        {money(p.price * cart[p.id])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-actions">
              <div className="coupon">
                <label className="sr-only" htmlFor="coupon">
                  Coupon
                </label>
                <input
                  id="coupon"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    setCouponMessage(
                      coupon.trim()
                        ? `Coupon “${coupon}” is not available.`
                        : "Please enter a coupon code.",
                    )
                  }
                >
                  Apply coupon
                </button>
              </div>
              <button
                className="primary-button"
                disabled={JSON.stringify(cart) === JSON.stringify(draft)}
              >
                Update cart
              </button>
            </div>
          </form>
          {couponMessage && (
            <div className="form-status" role="status">
              {couponMessage}
            </div>
          )}
          <div className="cart-totals">
            <h2>Cart totals</h2>
            <table>
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>{money(total(cart))}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>
                    <strong>{money(total(cart))}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <Link className="primary-button wide" to={`${base}/checkout/`}>
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
const countryCodes =
  "AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW".split(
    " ",
  );
export function Checkout() {
  const { cart } = useApp();
  const [country, setCountry] = useState("US"),
    [couponOpen, setCouponOpen] = useState(false),
    [couponStatus, setCouponStatus] = useState(""),
    [status, setStatus] = useState("");
  const regions = new Intl.DisplayNames(["en"], { type: "region" });
  const fields = [
    ["first_name", "First name", true],
    ["last_name", "Last name", true],
    ["company", "Company name", false],
    ["address", "Street address", true],
    ["address2", "Apartment, suite, unit, etc.", false],
    ["city", "Town / City", true],
    ["postcode", "ZIP Code", true],
    ["phone", "Phone", true],
    ["email", "Email address", true],
  ] as const;
  if (!cartItems(cart).length)
    return (
      <section>
        <Heading>Checkout</Heading>
        <Notice>Your cart is currently empty.</Notice>
        <Link to={`${base}/shop/`} className="primary-button">
          Return to shop
        </Link>
      </section>
    );
  return (
    <section>
      <Heading>Checkout</Heading>
      <div className="checkout-coupon">
        Have a coupon?{" "}
        <button
          className="text-button"
          onClick={() => setCouponOpen(!couponOpen)}
        >
          Click here to enter your code
        </button>
      </div>
      {couponOpen && (
        <form
          className="coupon checkout-coupon-form"
          onSubmit={(e) => {
            e.preventDefault();
            const code = new FormData(e.currentTarget).get("coupon");
            setCouponStatus(`Coupon “${code}” is not available.`);
          }}
        >
          <input name="coupon" placeholder="Coupon code" required />
          <button className="primary-button">Apply coupon</button>
          {couponStatus && <p role="status">{couponStatus}</p>}
        </form>
      )}
      <form
        className="checkout-form"
        onSubmit={(e) => {
          e.preventDefault();
          setStatus(
            "Sorry, there are no available payment methods. Please contact us if you require assistance. No order has been placed.",
          );
        }}
      >
        <h2>Billing details</h2>
        <div className="billing-grid">
          {fields.slice(0, 3).map(([name, label, required]) => (
            <label
              className={"field " + (name === "company" ? "full" : "")}
              key={name}
            >
              {label} {required ? <em>*</em> : "(optional)"}
              <input
                name={name}
                required={required}
                autoComplete={
                  name === "first_name"
                    ? "given-name"
                    : name === "last_name"
                      ? "family-name"
                      : "organization"
                }
              />
            </label>
          ))}
          <label className="field full">
            Country / Region *
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              name="country"
            >
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {regions.of(code)}
                </option>
              ))}
            </select>
          </label>
          {fields.slice(3).map(([name, label, required]) => (
            <label
              className={
                "field " +
                (["address", "address2", "city"].includes(name) ? "full" : "")
              }
              key={name}
            >
              {label} {required ? <em>*</em> : "(optional)"}
              <input
                name={name}
                type={
                  name === "email" ? "email" : name === "phone" ? "tel" : "text"
                }
                required={required}
                placeholder={
                  name === "address"
                    ? "House number and street name"
                    : undefined
                }
              />
            </label>
          ))}
          <label className="field full">
            State / Region *
            {country === "US" ? (
              <select required name="state" defaultValue="CA">
                {"Alabama:AL,Alaska:AK,Arizona:AZ,Arkansas:AR,California:CA,Colorado:CO,Connecticut:CT,Delaware:DE,Florida:FL,Georgia:GA,Hawaii:HI,Idaho:ID,Illinois:IL,Indiana:IN,Iowa:IA,Kansas:KS,Kentucky:KY,Louisiana:LA,Maine:ME,Maryland:MD,Massachusetts:MA,Michigan:MI,Minnesota:MN,Mississippi:MS,Missouri:MO,Montana:MT,Nebraska:NE,Nevada:NV,New Hampshire:NH,New Jersey:NJ,New Mexico:NM,New York:NY,North Carolina:NC,North Dakota:ND,Ohio:OH,Oklahoma:OK,Oregon:OR,Pennsylvania:PA,Rhode Island:RI,South Carolina:SC,South Dakota:SD,Tennessee:TN,Texas:TX,Utah:UT,Vermont:VT,Virginia:VA,Washington:WA,West Virginia:WV,Wisconsin:WI,Wyoming:WY"
                  .split(",")
                  .map((item) => {
                    const [label, value] = item.split(":");
                    return (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    );
                  })}
              </select>
            ) : (
              <input name="state" required />
            )}
          </label>
        </div>
        <h2>Additional information</h2>
        <label className="field">
          Order notes (optional)
          <textarea
            name="notes"
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery."
          />
        </label>
        <h2>Your order</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems(cart).map((p) => (
              <tr key={p.id}>
                <td>
                  {p.name} × {cart[p.id]}
                </td>
                <td>{money(p.price * cart[p.id])}</td>
              </tr>
            ))}
            <tr>
              <th>Subtotal</th>
              <td>{money(total(cart))}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong>{money(total(cart))}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Notice>
          Sorry, it seems that there are no available payment methods. Please
          contact us if you require assistance or wish to make alternate
          arrangements.
        </Notice>
        <button className="primary-button wide">Place order</button>
        {status && (
          <p className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
