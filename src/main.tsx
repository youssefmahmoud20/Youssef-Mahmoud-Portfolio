import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./state";
import { SiteShell } from "./components";
import { HomePanels, Blog } from "./sections";
import {
  Article,
  Archive,
  ProjectDetail,
  SearchResults,
  NotFound,
} from "./pages";
import { Shop, ProductDetail, CartPage, Checkout } from "./commerce";
import { Overlay } from "./Overlay";
import { base, posts, products, works } from "./content";
import "./styles.css";

function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const local = path.startsWith(base) ? path.slice(base.length) || "/" : path;
  let page: React.ReactNode;
  let title = "RyanCV — Developer";
  let detail = false;
  let isHome = false;
  const post = posts.find((p) => local === `/2020/04/28/${p.slug}`),
    work = works.find((w) => local === `/portfolio-archive/${w.slug}`),
    product = products.find((p) => local === `/product/${p.slug}`);
  if (local === "/" && !location.search) {
    isHome = true;
    const hash = location.hash.slice(1);
    page = (
      <HomePanels
        active={
          ["home", "resume", "works", "blog", "contact", "products"].includes(
            hash,
          )
            ? hash
            : "home"
        }
      />
    );
  } else if (local === "/" && new URLSearchParams(location.search).has("s")) {
    page = <SearchResults />;
    title = "Search Results — RyanCV";
  } else if (post) {
    page = <Article post={post} />;
    title = post.title + " — RyanCV";
    detail = true;
  } else if (work) {
    page = <ProjectDetail work={work} />;
    title = work.title + " — RyanCV";
    detail = true;
  } else if (product) {
    page = <ProductDetail product={product} />;
    title = product.name + " — RyanCV";
  } else if (local === "/blog") {
    page = <Blog />;
    title = "Blog — RyanCV";
  } else if (
    /^\/(category\/(code|design|music)|tag\/(code|html|plugin|wordpress)|author\/oleksandr|2020\/04)(\/page\/2)?$/.test(
      local,
    )
  ) {
    page = <Archive />;
    title = "Archive — RyanCV";
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
    if (location.hash.startsWith("#comment-"))
      requestAnimationFrame(() =>
        document.querySelector(location.hash)?.scrollIntoView(),
      );
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
