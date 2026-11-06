import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./state";
import { SiteShell } from "./components";
import { HomePanels } from "./sections";
import { ProjectDetail, NotFound } from "./pages";
import { Shop, ProductDetail, CartPage, Checkout } from "./commerce";
import { Overlay } from "./Overlay";
import { base, navItems, products, works } from "./content";
import "./styles.css";

function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const local = path.startsWith(base) ? path.slice(base.length) || "/" : path;
  let page: React.ReactNode;
  let title = "RyanCV — Developer";
  let detail = false;
  let isHome = false;
  const work = works.find((w) => local === `/portfolio-archive/${w.slug}`),
    product = products.find((p) => local === `/product/${p.slug}`);
  if (local === "/") {
    isHome = true;
    const hash = location.hash.slice(1);
    page = (
      <HomePanels
        active={
          navItems.some((item) => item.id === hash)
            ? hash
            : "home"
        }
      />
    );
  } else if (work) {
    page = <ProjectDetail work={work} />;
    title = work.title + " — RyanCV";
    detail = true;
  } else if (product) {
    page = <ProductDetail product={product} />;
    title = product.name + " — RyanCV";
  } else if (local === "/shop") {
    page = <Shop />;
    title = "Shop — RyanCV";
  } else if (
    local.startsWith("/product-category/") &&
    ["branding", "web-development"].includes(local.split("/")[2])
  ) {
    page = <Shop category={local.split("/")[2]} />;
    title = "Products — RyanCV";
  } else if (local === "/cart") {
    page = <CartPage />;
    title = "Cart — RyanCV";
  } else if (local === "/checkout") {
    page = <Checkout />;
    title = "Checkout — RyanCV";
  } else {
    page = <NotFound />;
    title = "Page not found — RyanCV";
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
  if (work && new URLSearchParams(location.search).has("popup"))
    return (
      <>
        <div className="standalone-project">
          <ProjectDetail work={work} embedded />
        </div>
        <Overlay />
      </>
    );
  return (
    <>
      <SiteShell detail={detail} checkout={local === "/checkout"}>
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
