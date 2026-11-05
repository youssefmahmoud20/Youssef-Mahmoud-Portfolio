import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  asset,
  base,
  home,
  services,
  clients,
  testimonials,
  quote,
  experience,
  education,
  coding,
  knowledge,
  frontend,
  languages,
  works,
  workUrl,
  posts,
  postUrl,
  excerpt,
  products,
} from "./content";
import type { Work, Post } from "./content";
import { Heading, Facts, IconTitle, Action } from "./components";
import { Icon } from "./icons";
import { useApp } from "./state";
import { ProductGrid } from "./commerce";

export function About() {
  return (
    <>
      <section>
        <Heading>About Me</Heading>
        <div className="about-intro">
          <p>
            <strong>Hello! I’m Donald Wellborn.</strong>
            <br />
            Back-end &amp; Frond-end developer from UK, London. I have rich
            experience in wordpress, also I am good at Magento. I love to talk
            with you about our unique.
          </p>
          <Facts
            items={[
              ["Age", "45"],
              ["Residence", "UK"],
              ["Freelance", "Available"],
              ["Address", "London, UK"],
            ]}
          />
        </div>
      </section>
      <section>
        <Heading>My Services</Heading>
        <div className="services-grid bleed">
          {services.map((s) => (
            <article key={s.title}>
              <span className="service-icon">
                <Icon name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <Heading>Pricing</Heading>
        <div className="pricing-grid bleed">
          {[
            { name: "Popular", price: 22, icon: "queen" },
            { name: "Pro", price: 48, icon: "rocket" },
          ].map((p, i) => (
            <article className="price-card" key={p.name}>
              <Icon name={p.icon} className="price-icon" />
              <h3>{p.name}</h3>
              <div className="price">
                <sup>$</sup>
                <span>{p.price}</span>
                <small>hour</small>
              </div>
              <ul>
                {[
                  "WorPress Development",
                  "Installation Services",
                  "SEO Audit",
                  "Hosting & Domain",
                  "WordPress Security",
                ].map((t, j) => (
                  <li key={t} className={j > 2 && i === 0 ? "unavailable" : ""}>
                    {t}
                    {j > 2 && i === 1 && <em>new</em>}
                  </li>
                ))}
              </ul>
              <Action to={home("contact")} icon="chevron">
                Order Now
              </Action>
            </article>
          ))}
        </div>
      </section>
      <section>
        <Heading>Clients</Heading>
        <div className="clients-grid bleed">
          {clients.map((c) => (
            <a key={c.name} href={c.url} target="_blank" rel="noreferrer">
              <img
                loading="lazy"
                src={asset(c.image)}
                alt={c.name}
                width="184"
                height="62"
              />
            </a>
          ))}
        </div>
      </section>
      <section>
        <Heading>Testimonials</Heading>
        <Testimonial />
      </section>
      <section>
        <Heading>Fun Facts</Heading>
        <div className="fun-facts bleed">
          {[
            ["disc", "100+", "Albumes Listened"],
            ["medal", "15+", "Awards Won"],
            ["js", "10,000+", "Lines Written"],
            ["flag", "10+", "Countries Visited"],
          ].map(([icon, count, label]) => (
            <div key={label}>
              <span className="circle-icon">
                <Icon name={icon} />
              </span>
              <p>
                <strong>{count}</strong>
                <br />
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
function Testimonial({ single = false }: { single?: boolean }) {
  const [slide, setSlide] = useState(0);
  const p = single
    ? {
        name: "Ryan Adlard",
        role: "Web Developer",
        image: "avatar2-184x184.png",
      }
    : testimonials[slide];
  return (
    <div className="testimonial">
      <blockquote>
        <Icon name="quote" />
        {quote}
        <span className="closing-quote">”</span>
      </blockquote>
      <img
        loading="lazy"
        src={asset(p.image)}
        alt={p.name}
        width="92"
        height="92"
      />
      <h3>{p.name}</h3>
      <div>{p.role}</div>
      {!single && (
        <div className="carousel-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to slide ${i + 1}`}
              aria-pressed={slide === i}
              onClick={() => setSlide(i)}
              className={slide === i ? "active" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export function Resume() {
  const { setViewer } = useApp();
  return (
    <>
      <section>
        <Heading>Resume</Heading>
        <div className="timeline-grid bleed">
          {[
            { title: "Experience", icon: "briefcase", rows: experience },
            { title: "Education", icon: "graduation", rows: education },
          ].map((group) => (
            <div className="timeline-column" key={group.title}>
              <IconTitle icon={group.icon}>{group.title}</IconTitle>
              {group.rows.map((row) => (
                <article
                  className={
                    "timeline-item " +
                    ("current" in row && row.current ? "current" : "")
                  }
                  key={row.date}
                >
                  <span className="date">{row.date}</span>
                  {"logo" in row && (
                    <img
                      className="company-logo"
                      src={asset(String(row.logo))}
                      alt=""
                    />
                  )}
                  <h3>{row.title}</h3>
                  <div className="muted">{row.place}</div>
                  <p>{row.text}</p>
                  {row.action && (
                    <button
                      className="action small"
                      onClick={() =>
                        setViewer({
                          kind: "images",
                          images: ["certificate.jpeg"],
                          title: row.action!,
                        })
                      }
                    >
                      {row.action}
                      <Icon name="right" />
                    </button>
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section>
        <Heading>Skills</Heading>
        <div className="skill-grid bleed">
          <div className="skill-group">
            <IconTitle icon="code">Coding</IconTitle>
            <div className="ring-grid">
              {coding.map((s) => (
                <div key={s.name}>
                  <div
                    className="skill-ring"
                    style={{
                      background: `conic-gradient(var(--accent) ${s.value}%, var(--track) 0)`,
                    }}
                  >
                    <span>
                      {s.value}
                      <small>%</small>
                    </span>
                  </div>
                  <div>{s.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="skill-group">
            <IconTitle icon="knowledge">Knowledge</IconTitle>
            <ul className="knowledge-list">
              {knowledge.map((s) => (
                <li key={s}>
                  <Icon name="check" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="skill-group">
            <IconTitle icon="html">Front-end</IconTitle>
            {frontend.map((s) => (
              <div className="meter" key={s.name}>
                <span>{s.name}</span>
                <div
                  className="meter-track"
                  role="meter"
                  aria-label={s.name}
                  aria-valuenow={s.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <i style={{ width: s.value + "%" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="skill-group">
            <IconTitle icon="language">Languages</IconTitle>
            {languages.map((s) => (
              <div className="meter" key={s.name}>
                <span>{s.name}</span>
                <div className="dot-meter" aria-label={`${s.name} ${s.value}%`}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <i className={i < s.value / 10 ? "filled" : ""} key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <Heading>Quote</Heading>
        <Testimonial single />
      </section>
    </>
  );
}

export function Filters({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="filters" aria-label="Filter">
      {options.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={value === f ? "active" : ""}
          aria-pressed={value === f}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
function MasonryItem({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(100);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSpan(Math.ceil(el.getBoundingClientRect().height + 30));
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div
      layout
      className="masonry-item"
      style={{ gridRowEnd: `span ${span}` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
export function Masonry({ children }: { children: ReactNode[] }) {
  return (
    <div className="masonry">
      {children.map((child, i) => (
        <MasonryItem key={(child as { key?: string })?.key || i}>
          {child}
        </MasonryItem>
      ))}
    </div>
  );
}
export function Works() {
  const [filter, setFilter] = useState("All");
  return (
    <section>
      <Heading
        aside={
          <Filters
            options={["All", "Video", "Link", "Image", "Gallery", "Content"]}
            value={filter}
            onChange={setFilter}
          />
        }
      >
        Works
      </Heading>
      <div className="grid-content">
        <Masonry>
          {works
            .filter((w) => filter === "All" || w.type === filter)
            .map((w) => (
              <WorkCard key={w.slug} work={w} />
            ))}
        </Masonry>
      </div>
    </section>
  );
}
function WorkCard({ work: w }: { work: Work }) {
  const { setViewer } = useApp();
  const action = () => {
    if (w.type === "Video") setViewer({ kind: "video", title: w.title });
    else if (w.type === "Content") setViewer({ kind: "project", work: w });
    else
      setViewer({
        kind: "images",
        title: w.title,
        images:
          w.type === "Gallery"
            ? [w.image, ...(w.thumbnailGallery || w.gallery)]
            : [w.image],
      });
  };
  const image = (
    <>
      <img
        src={asset(w.image)}
        alt={w.title}
        width={w.width}
        height={w.height}
        loading="lazy"
      />
      <span className="image-overlay">
        <Icon
          name={
            w.type === "Video"
              ? "play"
              : w.type === "Gallery"
                ? "gallery"
                : w.type === "Link"
                  ? "link"
                  : w.type === "Content"
                    ? "content"
                    : "plus"
          }
        />
      </span>
    </>
  );
  return (
    <article className="work-card">
      {w.type === "Link" ? (
        <a
          className="image-link"
          href="https://bslthemes.com/"
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${w.title}`}
        >
          {image}
        </a>
      ) : (
        <button
          className="image-link"
          onClick={action}
          aria-label={`Open ${w.title} ${w.type.toLowerCase()}`}
        >
          {image}
        </button>
      )}
      <h3>
        <Link to={workUrl(w)}>{w.title}</Link>
      </h3>
      <span className="work-type">{w.type}</span>
    </article>
  );
}
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <Link className="image-link" to={postUrl(post)}>
        <img
          src={asset(post.image)}
          alt={post.title}
          width={post.image === "bg.jpg" ? 1000 : 800}
          height={post.image === "bg.jpg" ? 680 : 375}
          loading="lazy"
        />
      </Link>
      <Link className="post-date" to={`${base}/2020/04/`}>
        April 28, 2020
      </Link>
      <h3>
        <Link to={postUrl(post)}>{post.title}</Link>
      </h3>
      <p>
        {excerpt}
        {post === posts[4]
          ? " So striking at of to welcomed resolved. Northward by described up household therefore attention."
          : ""}
      </p>
    </article>
  );
}
export function Blog() {
  const [filter, setFilter] = useState("All"),
    [limit, setLimit] = useState(4);
  const filtered = posts.filter(
    (p) => filter === "All" || p.categories.includes(filter),
  );
  return (
    <section>
      <Heading
        aside={
          <Filters
            options={["All", "Music", "Design", "Code"]}
            value={filter}
            onChange={(v) => {
              setFilter(v);
              setLimit(4);
            }}
          />
        }
      >
        Blog
      </Heading>
      <div className="grid-content">
        <Masonry>
          {filtered.slice(0, limit).map((p) => (
            <PostCard post={p} key={p.slug} />
          ))}
        </Masonry>
        {filtered.length > limit && (
          <div className="center">
            <button
              className="action"
              onClick={() => setLimit(filtered.length)}
            >
              Load More
              <Icon name="right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <>
      <section>
        <Heading>Get in Touch</Heading>
        <div className="map-wrap">
          <iframe
            title="London Eye, London map"
            src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=16&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <Facts
          items={[
            ["Address", "London, UK"],
            ["Email", "wellborn@example.com"],
            ["Phone", "+123 654 78900"],
            ["Freelance", "Available"],
          ]}
        />
      </section>
      <section>
        <Heading>Contact Form</Heading>
        <ContactForm />
      </section>
    </>
  );
}
function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [status, setStatus] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget),
      errs: Record<string, string> = {};
    for (const key of ["name", "email", "message"])
      if (!String(data.get(key) || "").trim())
        errs[key] = "The field is required.";
    if (
      !errs.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email")))
    )
      errs.email = "Please enter a valid email address.";
    setErrors(errs);
    setStatus(
      Object.keys(errs).length
        ? "One or more fields have an error. Please check and try again."
        : "Your message has not been sent. Email delivery is not connected in this preview.",
    );
    if (Object.keys(errs).length)
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)
        ?.focus();
  };
  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="form-grid">
        {[
          ["name", "Full Name", "text"],
          ["email", "Email Address", "email"],
        ].map(([name, label, type]) => (
          <label className="field" key={name}>
            <span className="sr-only">{label}</span>
            <input
              name={name}
              type={type}
              placeholder={label}
              maxLength={400}
              required
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span className="field-error" id={`${name}-error`}>
                {errors[name]}
              </span>
            )}
          </label>
        ))}
      </div>
      <label className="field">
        <span className="sr-only">Your Message</span>
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          maxLength={2000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </label>
      <button className="action" type="submit">
        Send Message
        <Icon name="right" />
      </button>
      {status && (
        <div className="form-status" role="status">
          {status}
        </div>
      )}
    </form>
  );
}
export function Products() {
  return (
    <section>
      <Heading>Products</Heading>
      <div className="grid-content">
        <ProductGrid items={products} />
        <div className="center">
          <Action to={`${base}/shop/`}>All Products</Action>
        </div>
      </div>
    </section>
  );
}

export function HomePanels({ active }: { active: string }) {
  const panels = [
    ["home", About],
    ["resume", Resume],
    ["works", Works],
    ["blog", Blog],
    ["contact", Contact],
    ["products", Products],
  ] as const;
  useEffect(() => {
    if (matchMedia("(max-width:1120px)").matches && active !== "home")
      requestAnimationFrame(() =>
        document.getElementById(active)?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        }),
      );
  }, [active]);
  return (
    <>
      {panels.map(([id, Panel]) => (
        <div
          id={id}
          className={`card-inner home-panel ${id === active ? "active" : ""}`}
          key={id}
          aria-label={navTitle(id)}
        >
          <div className="card-wrap">
            <Panel />
          </div>
        </div>
      ))}
    </>
  );
}
const navTitle = (id: string) =>
  id === "home" ? "About" : id.charAt(0).toUpperCase() + id.slice(1);
