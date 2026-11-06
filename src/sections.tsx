import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { FormEvent, ReactNode } from "react";
import { motion } from "motion/react";
import {
  asset,
  home,
  profile,
  services,
  testimonials,
  experience,
  education,
  skillGroups,
  works,
  workCategories,
} from "./content";
import type { Work } from "./content";
import { Heading, Facts, IconTitle, Action } from "./components";
import { Icon } from "./icons";

export function About() {
  return (
    <>
      <section>
        <Heading>About Me</Heading>
        <div className="about-intro">
          <p>
            <strong>Hello, I’m {profile.name}.</strong>
            <br />
            I’m a senior full stack developer based in Beirut with 5+ years of
            experience building production web applications, e-commerce stores,
            APIs, and dashboards. I work across React, Node.js, PHP, and
            WordPress, taking projects from requirements through deployment and
            ongoing support.
          </p>
          <Facts
            items={[
              ["Based in", profile.location],
              ["Work", "Freelance / Remote"],
            ]}
          />
          <Action to={home("services")}>Explore my services</Action>
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
            ["code", "20+", "Production projects delivered"],
            ["rocket", "5+ years", "Building for the web"],
            ["shield", "Up to 40%", "WordPress performance improvement"],
            ["js", "3", "Databases in my toolkit"],
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

function Testimonial() {
  const [slide, setSlide] = useState(0);
  const testimonial = testimonials[slide];
  const move = (direction: number) =>
    setSlide(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );

  return (
    <div className="testimonial">
      <div aria-live="polite">
        <blockquote>
          <Icon name="quote" />
          {testimonial.quote}
          <span className="closing-quote">”</span>
        </blockquote>
        <h3>{testimonial.topic}</h3>
        <p className="muted">Illustrative example</p>
      </div>
      <div className="carousel-controls" aria-label="Testimonial navigation">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => move(-1)}
        >
          <Icon name="left" />
        </button>
        <div className="carousel-dots">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.topic}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-pressed={slide === index}
              onClick={() => setSlide(index)}
              className={slide === index ? "active" : ""}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => move(1)}
        >
          <Icon name="right" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section>
      <Heading>Services</Heading>
      <div className="services-grid bleed">
        {services.map((service) => (
          <article key={service.title}>
            <span className="service-icon">
              <Icon name={service.icon} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <ul className="knowledge-list service-details">
              {service.details.map((detail) => (
                <li key={detail}>
                  <Icon name="check" />
                  {detail}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Action to={home("contact")}>Discuss your project</Action>
    </section>
  );
}

type TimelineEntry = {
  date: string;
  title: string;
  place: string;
  text?: string;
  current?: boolean;
};

function Timeline({
  title,
  icon,
  entries,
}: {
  title: string;
  icon: string;
  entries: TimelineEntry[];
}) {
  return (
    <div className="timeline-column">
      <IconTitle icon={icon}>{title}</IconTitle>
      {entries.map((entry) => (
        <article
          className={entry.current ? "timeline-item current" : "timeline-item"}
          key={entry.title}
        >
          <span className="date">{entry.date}</span>
          <h3>{entry.title}</h3>
          <div className="muted">{entry.place}</div>
          {entry.text && <p>{entry.text}</p>}
        </article>
      ))}
    </div>
  );
}

export function Resume() {
  return (
    <>
      <section>
        <Heading>Resume</Heading>
        <div className="timeline-grid bleed">
          <Timeline title="Experience" icon="briefcase" entries={experience} />
          <div>
            <Timeline title="Education" icon="graduation" entries={education} />
            <div className="timeline-column">
              <IconTitle icon="medal">Certification</IconTitle>
              <h3>WordPress Mastery Certification</h3>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Heading>Skills & Languages</Heading>
        <div className="skill-grid bleed">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <IconTitle icon={group.icon}>{group.title}</IconTitle>
              <ul className="knowledge-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
            options={["All", ...workCategories]}
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
            .filter((work) => filter === "All" || work.category === filter)
            .map((work) => (
              <WorkCard key={work.url} work={work} />
            ))}
        </Masonry>
      </div>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <article className="work-card">
      <a
        href={work.url}
        target="_blank"
        rel="noreferrer"
        aria-label={work.title + " (opens in a new tab)"}
      >
        <span className="image-link">
          <img
            src={asset(work.image)}
            alt=""
            width={work.width}
            height={work.height}
            loading="lazy"
          />
          <span className="image-overlay">
            <Icon name="link" />
          </span>
        </span>
        <h3>{work.title}</h3>
      </a>
      <span className="work-type">{work.category}</span>
    </article>
  );
}

export function Contact() {
  return (
    <>
      <section>
        <Heading>Get in Touch</Heading>
        <div className="map-wrap">
          <iframe
            title="Beirut, Lebanon map"
            src="https://maps.google.com/maps?q=Beirut%2C%20Lebanon&t=m&z=16&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <Facts
          items={[
            ["Location", profile.location],
            ["Email", profile.email],
            ["Phone", profile.phone],
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
    const firstError = Object.keys(errs)[0];
    if (!firstError) {
      setStatus("");
      return;
    }
    e.preventDefault();
    setStatus("One or more fields have an error. Please check and try again.");
    e.currentTarget
      .querySelector<HTMLElement>(`[name="${firstError}"]`)
      ?.focus();
  };
  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${profile.email}`}
      method="post"
      noValidate
      onSubmit={submit}
    >
      <input type="hidden" name="_subject" value="New portfolio message" />
      <div hidden>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>
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
export function HomePanels({ active }: { active: string }) {
  const { hash, key } = useLocation();
  const panels = [
    ["home", About],
    ["services", Services],
    ["resume", Resume],
    ["works", Works],
    ["contact", Contact],
  ] as const;
  useEffect(() => {
    if (hash !== "#" + active || !matchMedia("(max-width: 1120px)").matches) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      document.getElementById(active)?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [active, hash, key]);
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
