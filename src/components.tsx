import { useEffect, useRef, useState } from "react";
import type { ReactNode, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  asset,
  base,
  home,
  roles,
  socials,
  navItems,
  posts,
  postUrl,
  works,
  demoSlugs,
  relatedSlugs,
  allThemeSlugs,
} from "./content";
import { Icon } from "./icons";
import { useApp } from "./state";

export function Heading({
  children,
  aside,
}: {
  children: string;
  aside?: ReactNode;
}) {
  const [first, ...rest] = children.split(" ");
  return (
    <div className="section-heading">
      <h2>
        <span>{first}</span>
        {rest.length ? " " + rest.join(" ") : ""}
      </h2>
      {aside}
    </div>
  );
}
export function Action({
  children,
  to,
  icon = "right",
}: {
  children: ReactNode;
  to: string;
  icon?: string;
}) {
  return (
    <Link className="action" to={to}>
      {children}
      <Icon name={icon} />
    </Link>
  );
}
export function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="facts-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <span className="leaders" />
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function IconTitle({
  icon,
  children,
}: {
  icon: string;
  children: ReactNode;
}) {
  return (
    <h3 className="icon-title">
      <Icon name={icon} />
      {children}
    </h3>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice" role="status">
      <Icon name="check" />
      <div>{children}</div>
    </div>
  );
}
export function Typewriter() {
  const [text, setText] = useState(roles[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0,
      count = roles[0].length,
      deleting = false,
      timer: ReturnType<typeof setTimeout>;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      const role = roles[index];
      let delay = deleting ? 35 : 70;
      if (!deleting && count === role.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && count === 0) {
        deleting = false;
        index = (index + 1) % roles.length;
        delay = 250;
      } else {
        count += deleting ? -1 : 1;
        setText(roles[index].slice(0, count));
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1800);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);
  return (
    <span className="typed-role" aria-label={roles.join(", ")}>
      {text}
      <span className="caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}
export function Profile() {
  const [slide, setSlide] = useState(0);
  const covers = [
    "dev-bg-4-1200x744.jpg",
    "dev-bg-1200x800.jpg",
    "dev-bg-3-1200x812.jpg",
  ];
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="profile-card" aria-label="Tony Ryan profile">
      <div className="profile-main">
        <div className="cover">
          {covers.map((src, i) => (
            <img
              key={src}
              src={asset(src)}
              alt={i === slide ? "Mountain landscape" : ""}
              className={i === slide ? "visible" : ""}
            />
          ))}
        </div>
        <div className="profile-info">
          <Link to={home()} className="portrait-link">
            <img
              className="portrait"
              src={asset("avatar.png")}
              alt="Tony Ryan"
              width="140"
              height="140"
            />
          </Link>
          <h1>
            <Link to={home()}>Tony Ryan</Link>
          </h1>
          <Typewriter />
          <div className="socials">
            {socials.map((s) => (
              <a
                href={s.url}
                key={s.label}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <a href={asset("cv.pdf")} download>
          Download CV <Icon name="download" />
        </a>
        <Link to={home("contact")}>
          Contact Me <Icon name="plane" />
        </Link>
      </div>
    </section>
  );
}
function Sidebar({ close }: { close: () => void }) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const s = String(new FormData(e.currentTarget).get("s") || "").trim();
    if (s) {
      navigate(`${base}/?s=${encodeURIComponent(s)}`);
      close();
    }
  };
  return (
    <>
      <button
        className="sidebar-backdrop"
        onClick={close}
        aria-label="Close sidebar"
        tabIndex={-1}
      />
      <aside
        ref={panelRef}
        className="sidebar"
        aria-label="Site sidebar"
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const focusable = [
            ...e.currentTarget.querySelectorAll<HTMLElement>("a,button,input"),
          ];
          const first = focusable[0],
            last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }}
      >
        <button
          className="sidebar-close icon-button"
          onClick={close}
          aria-label="Close sidebar"
        >
          <Icon name="close" />
        </button>
        <form className="search-form" onSubmit={search}>
          <input name="s" placeholder="Search …" aria-label="Search" required />
          <button aria-label="Search">
            <Icon name="search" />
          </button>
        </form>
        <h3>Recent Posts</h3>
        <ul>
          {posts.slice(0, 5).map((p) => (
            <li key={p.slug}>
              <Link to={postUrl(p)} onClick={close}>
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <h3>Recent Comments</h3>
        <ul>
          {[
            ["Ryan Adlard", posts[4], 2],
            ["James Rodri", posts[2], 3],
            ["James Rodri", posts[1], 5],
            ["John Doe", posts[1], 4],
            ["Ryan Adlard", posts[0], 8],
          ].map(([author, p, id]) => (
            <li key={String(id)}>
              {String(author)} on{" "}
              <Link
                to={`${postUrl(p as (typeof posts)[number])}#comment-${id}`}
                onClick={close}
              >
                {(p as (typeof posts)[number]).title}
              </Link>
            </li>
          ))}
        </ul>
        <h3>Archives</h3>
        <ul>
          <li>
            <Link to={`${base}/2020/04/`} onClick={close}>
              April 2020
            </Link>
          </li>
        </ul>
        <h3>Categories</h3>
        <ul>
          {["Code", "Design", "Music"].map((c) => (
            <li key={c}>
              <Link to={`${base}/category/${c.toLowerCase()}/`} onClick={close}>
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
export function SiteShell({
  children,
  detail = false,
  checkout = false,
}: {
  children: ReactNode;
  detail?: boolean;
  checkout?: boolean;
}) {
  const [sidebar, setSidebar] = useState(false);
  const { theme, toggleTheme, cart } = useApp();
  const location = useLocation();
  const active =
    location.pathname === `${base}/`
      ? location.hash.slice(1) || "home"
      : location.pathname.includes("portfolio")
        ? "works"
        : /product|shop|cart|checkout/.test(location.pathname)
          ? "products"
          : "blog";
  useEffect(() => {
    setSidebar(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    document.body.classList.toggle("is-light", theme === "light");
    return () => document.body.classList.remove("is-light");
  }, [theme]);
  useEffect(() => {
    if (!sidebar) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebar(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebar]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="line-background" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <i
            key={i}
            style={{ left: `${(i + 1) * 10}%`, animationDelay: `${i * 1.3}s` }}
          />
        ))}
      </div>
      <div
        className={`site-shell ${detail ? "detail-shell" : ""} ${checkout ? "checkout-shell" : ""}`}
      >
        <header className="navigation">
          <div className="compact-identity">
            <img src={asset("avatar.png")} alt="" />
            <div>
              <Link to={home()}>Tony Ryan</Link>
              <Typewriter />
            </div>
          </div>
          <div className="nav-tools">
            <button
              className="icon-button"
              aria-label="Open sidebar"
              onClick={() => setSidebar(true)}
            >
              <Icon name="menu" />
            </button>
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
          </div>
          <nav aria-label="Main navigation">
            {navItems.map((n) => (
              <Link
                key={n.id}
                className={active === n.id ? "active" : ""}
                to={home(n.id)}
                aria-current={active === n.id ? "page" : undefined}
              >
                <Icon name={n.icon} />
                <span>{n.label}</span>
              </Link>
            ))}
          </nav>
        </header>
        <Profile />
        <main id="main-content" className="content-stage">
          {children}
        </main>
      </div>
      <footer className="site-footer">
        © 2026 RyanCV is Proudly Powered by{" "}
        <a href="https://bslthemes.com/" target="_blank" rel="noreferrer">
          bslthemes
        </a>
        {Object.values(cart).reduce((s, n) => s + n, 0) > 0 && (
          <Link
            className="footer-cart"
            to={`${base}/cart/`}
            aria-label="View cart"
          >
            <Icon name="cart" />{" "}
            {Object.values(cart).reduce((s, n) => s + n, 0)}
          </Link>
        )}
      </footer>
      {sidebar && <Sidebar close={() => setSidebar(false)} />}
      <VendorToolbar />
      <PointerHalo />
    </>
  );
}
function PointerHalo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 14}px,${e.clientY - 14}px)`;
        ref.current.style.opacity = "1";
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div className="pointer-halo" ref={ref} aria-hidden="true" />;
}
export function ShareLinks({ title, path }: { title: string; path?: string }) {
  const url = encodeURIComponent(
      window.location.origin + (path || window.location.pathname),
    ),
    t = encodeURIComponent(title);
  const urls = [
    ["facebook", `https://www.facebook.com/sharer/sharer.php?u=${url}`],
    ["twitter", `https://twitter.com/intent/tweet?text=%20${url}`],
    [
      "linkedin",
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${t}`,
    ],
    ["reddit", `https://www.reddit.com/submit?url=${url}&title=${t}`],
    ["pinterest", `https://pinterest.com/pin/create/button/?url=${url}`],
  ];
  return (
    <div className="share-row">
      <span>Share:</span>
      {urls.map(([icon, href]) => (
        <a
          href={href}
          key={icon}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${icon}`}
        >
          <Icon name={icon} />
        </a>
      ))}
    </div>
  );
}

export function VendorToolbar() {
  const [hidden, setHidden] = useState(false),
    [help, setHelp] = useState(false),
    [open, setOpen] = useState(false),
    [tab, setTab] = useState("DEMO");
  const utm =
    "?utm_source=sticky_panel&utm_medium=referral&utm_campaign=sticky_panel";
  if (hidden) return null;
  return (
    <>
      <div className="vendor-toolbar">
        <button
          aria-label="Remove Panel"
          title="Remove Panel"
          onClick={() => setHidden(true)}
        >
          <Icon name="close" />
        </button>
        <button aria-label="Help" title="Help" onClick={() => setHelp(!help)}>
          <Icon name="help" />
        </button>
        <a
          title="Buy Theme"
          aria-label="Buy Theme"
          href={
            "https://bslthemes.com/products/ryancv-vcard-resume-wordpress-theme/" +
            utm
          }
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="cart" />
        </a>
        <button title="Demos" aria-label="Demos" onClick={() => setOpen(true)}>
          <Icon name="grid" />
        </button>
      </div>
      {help && (
        <div className="vendor-help">
          <a
            href="https://bslthemes.gitbook.io/ryancv-wp-doc/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
          <a
            href={"https://bslthemes.com/support" + utm}
            target="_blank"
            rel="noreferrer"
          >
            Get Support
          </a>
          <a
            href="https://bslthemes.gitbook.io/ryancv-wp-doc/extras/changelog"
            target="_blank"
            rel="noreferrer"
          >
            Changelog
          </a>
        </div>
      )}
      {open && (
        <>
          <button
            className="vendor-backdrop"
            aria-label="Close Panel"
            onClick={() => setOpen(false)}
          />
          <aside className="vendor-drawer" aria-label="Theme demos">
            <button
              className="icon-button"
              aria-label="Close Panel"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" />
            </button>
            <div className="vendor-tabs">
              {["DEMO", "RELATED THEMES", "ALL THEMES"].map((t) => (
                <button
                  className={t === tab ? "active" : ""}
                  key={t}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="vendor-links">
              {(tab === "DEMO"
                ? demoSlugs
                : tab === "RELATED THEMES"
                  ? relatedSlugs
                  : allThemeSlugs
              ).map((slug, i) => (
                <a
                  href={
                    tab === "DEMO"
                      ? `https://ryancv.bslthemes.com/${slug}/${utm}`
                      : `https://${slug}.bslthemes.com/${tab === "RELATED THEMES" ? utm : ""}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  key={slug}
                >
                  <div className="theme-miniature">
                    <img src={asset(works[i % works.length].image)} alt="" />
                  </div>
                  {slug.replaceAll("-", " ")}
                </a>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
