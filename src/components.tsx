import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  asset,
  base,
  home,
  roles,
  profile,
  socials,
  navItems,
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
    <section className="profile-card" aria-label={profile.name + " profile"}>
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
            <span className="portrait">
              <img src={asset("profile-pic.webp")} alt={profile.name} />
            </span>
          </Link>
          <h1>
            <Link to={home()}>{profile.name}</Link>
          </h1>
          <Typewriter />
          <div className="socials">
            {socials.map((social) =>
              social.url ? (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} />
                </a>
              ) : (
                <span
                  key={social.label}
                  role="img"
                  aria-label={social.label + " profile link pending"}
                >
                  <Icon name={social.icon} />
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <a href={asset("cv.pdf")} download="CV - Youssef Mahmoud.pdf">
          Download CV <Icon name="download" />
        </a>
        <Link to={home("contact")}>
          Contact Me <Icon name="plane" />
        </Link>
      </div>
    </section>
  );
}
export function SiteShell({
  children,
  checkout = false,
}: {
  children: ReactNode;
  checkout?: boolean;
}) {
  const { cart } = useApp();
  const location = useLocation();
  const active =
    location.pathname === base || location.pathname === base + "/"
      ? (navItems.find((item) => "#" + item.id === location.hash)?.id ?? "home")
      : undefined;
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
      <div className={`site-shell ${checkout ? "checkout-shell" : ""}`}>
        <header className="navigation">
          <div className="compact-identity">
            <img src={asset("profile-pic.webp")} alt="" />
            <div>
              <Link to={home()}>{profile.name}</Link>
              <Typewriter />
            </div>
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
        © 2026 Youssef Mahmoud
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
