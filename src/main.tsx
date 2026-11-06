import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./state";
import { SiteShell } from "./components";
import { HomePanels } from "./sections";
import { NotFound } from "./pages";
import { Shop, ProductDetail, CartPage, Checkout } from "./commerce";
import { Overlay } from "./Overlay";
import { base, navItems, products } from "./content";
import "./styles.css";

function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const local = path.startsWith(base) ? path.slice(base.length) || "/" : path;
  let page: React.ReactNode;
  let title = "Youssef Mahmoud — Developer";
  let isHome = false;
  const product = products.find((p) => local === `/product/${p.slug}`);
  if (local === "/") {
    isHome = true;
    const hash = location.hash.slice(1);
    page = (
      <HomePanels
        active={navItems.some((item) => item.id === hash) ? hash : "home"}
      />
    );
  } else if (product) {
    page = <ProductDetail product={product} />;
    title = product.name + " — Youssef Mahmoud";
  } else if (local === "/shop") {
    page = <Shop />;
    title = "Shop — Youssef Mahmoud";
  } else if (
    local.startsWith("/product-category/") &&
    ["branding", "web-development"].includes(local.split("/")[2])
  ) {
    page = <Shop category={local.split("/")[2]} />;
    title = "Products — Youssef Mahmoud";
  } else if (local === "/cart") {
    page = <CartPage />;
    title = "Cart — Youssef Mahmoud";
  } else if (local === "/checkout") {
    page = <Checkout />;
    title = "Checkout — Youssef Mahmoud";
  } else {
    page = <NotFound />;
    title = "Page not found — Youssef Mahmoud";
  }
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    document.querySelectorAll(".content-stage > .card-inner").forEach((el) => {
      if (!isHome) el.scrollTop = 0;
    });
    if (!isHome) window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  if (path === "/") return <Navigate to={`${base}/`} replace />;
  return (
    <>
      <SiteShell checkout={local === "/checkout"}>
        {isHome ? (
          page
        ) : (
          <div
            className="card-inner route-card"
            key={location.pathname + location.search}
          >
            <div className="card-wrap">{page}</div>
          </div>
        )}
      </SiteShell>
      <Overlay />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
