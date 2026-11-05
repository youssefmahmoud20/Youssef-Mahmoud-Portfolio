import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  asset,
  base,
  home,
  works,
  workUrl,
  posts,
  postUrl,
  tags,
  products,
  productUrl,
  excerpt,
} from "./content";
import type { Work, Post } from "./content";
import { Heading, ShareLinks } from "./components";
import { Icon } from "./icons";
import { useApp } from "./state";
import { Masonry, PostCard } from "./sections";

export function ProjectDetail({
  work,
  embedded = false,
  inOverlay = false,
}: {
  work: Work;
  embedded?: boolean;
  inOverlay?: boolean;
}) {
  const { setViewer } = useApp();
  const index = works.indexOf(work);
  const images = [work.image, ...work.gallery];
  return (
    <article className="project-detail">
      <h1 className="detail-title">{work.title}</h1>
      <dl className="project-meta">
        {[
          ["Created by:", index === 0 ? "Ryan Adlard" : "Ryand Adlard"],
          ["Date:", "07/08/2018"],
          ["Client:", "Joe Patrick"],
          ["Categories:", work.type],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <button
        className="detail-image"
        onClick={() =>
          setViewer({
            kind: "images",
            title: work.title,
            images,
            index: 0,
            returnTo: inOverlay ? work : undefined,
          })
        }
      >
        <img
          src={asset(work.image)}
          alt={work.title}
          width={work.width}
          height={work.height}
        />
      </button>
      <p>{excerpt.replace("…", ".")}</p>
      <p>{excerpt.replace("…", ".")}</p>
      <div className="project-gallery">
        {work.gallery.map((src, i) => (
          <button
            key={src}
            onClick={() =>
              setViewer({
                kind: "images",
                title: work.title,
                images,
                index: i + 1,
                returnTo: inOverlay ? work : undefined,
              })
            }
            aria-label={`View ${work.title} image ${i + 2}`}
          >
            <img
              loading="lazy"
              src={asset(src)}
              alt={`${work.title} — design detail ${i + 1}`}
              width="900"
              height="900"
            />
          </button>
        ))}
      </div>
      <ShareLinks title={work.title} path={workUrl(work)} />
      {!embedded && (
        <div className="post-navigation">
          {works[index + 1] ? (
            <Link to={workUrl(works[index + 1])}>
              <span>
                <Icon name="left" /> Prev
              </span>
              {works[index + 1].title}
            </Link>
          ) : (
            <span />
          )}
          {works[index - 1] ? (
            <Link to={workUrl(works[index - 1])}>
              <span>
                Next <Icon name="right" />
              </span>
              {works[index - 1].title}
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </article>
  );
}
function ArticleCopy() {
  return (
    <div className="article-copy">
      <p>
        {excerpt.replace("…", ".")} <strong>Excellence decisively</strong> nay
        man yet impression. <a href="#">paulo omnium</a>.
      </p>
      <ul>
        <li>So striking at of to welcomed resolved.</li>
        <li>Northward by described up household therefore attention.</li>
        <li>Excellence decisively nay man yet impression.</li>
        <li>For contrasted remarkably.</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
        <em>(Lorem ipsum dolor sit amet.)</em>
      </p>
      <h3>Ex audire suavitate has</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae
        libero ac risus egestas placerat. Nulla facilisi. Vestibulum commodo
        felis quis tortor.
      </p>
      <div className="article-inline-images">
        <img
          src={asset("blog3.jpg")}
          alt="Editorial design detail"
          width="300"
          height="141"
          loading="lazy"
        />
        <img
          src={asset("blog2.jpg")}
          alt="Editorial design detail"
          width="300"
          height="141"
          loading="lazy"
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique,
        felis sit amet varius volutpat, lectus arcu dignissim neque, eget
        tincidunt tortor ipsum a sem.
      </p>
      <p>
        So striking at of to welcomed resolved. Northward by described up
        household therefore attention.
      </p>
    </div>
  );
}
export function Article({ post }: { post: Post }) {
  const index = posts.indexOf(post);
  return (
    <article className="article-detail">
      <h1 className="detail-title">{post.title}</h1>
      <div className="article-meta">
        <Link to={`${base}/2020/04/`}>April 28, 2020</Link>
        <span>/</span>
        {post.categories.map((c) => (
          <Link to={`${base}/category/${c.toLowerCase()}/`} key={c}>
            {c}
          </Link>
        ))}
        <span>/</span>
        <Link to={`${base}/author/oleksandr/`}>By Oleksandr</Link>
      </div>
      <img className="article-hero" src={asset(post.image)} alt={post.title} />
      <ArticleCopy />
      <ShareLinks title={post.title} />
      <div className="tags">
        <span>Tags:</span>
        {tags.map((t) => (
          <Link to={`${base}/tag/${t}/`} key={t}>
            {t}
          </Link>
        ))}
      </div>
      <div className="post-navigation">
        {posts[index + 1] ? (
          <Link to={postUrl(posts[index + 1])}>
            <span>
              <Icon name="left" /> Prev
            </span>
            {posts[index + 1].title}
          </Link>
        ) : (
          <span />
        )}
        {posts[index - 1] ? (
          <Link to={postUrl(posts[index - 1])}>
            <span>
              Next <Icon name="right" />
            </span>
            {posts[index - 1].title}
          </Link>
        ) : (
          <span />
        )}
      </div>
      <Comments post={post} />
    </article>
  );
}
function CommentForm({
  reply,
  cancel,
}: {
  reply?: string;
  cancel: () => void;
}) {
  const [status, setStatus] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (reply) ref.current?.focus();
  }, [reply]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(
      "Comment submission is not connected in this preview. Your comment has not been published.",
    );
  };
  return (
    <section id="respond" className="comment-form">
      <Heading>Write a comment</Heading>
      {reply && (
        <p className="replying-to">
          Replying to {reply} <button onClick={cancel}>Cancel Reply</button>
        </p>
      )}
      <form onSubmit={submit}>
        <label className="field">
          <span className="sr-only">Comment</span>
          <textarea
            ref={ref}
            name="comment"
            placeholder="Comment"
            required
            rows={4}
          />
        </label>
        <div className="form-grid">
          <label className="field">
            <span className="sr-only">Name</span>
            <input name="name" placeholder="Name" required />
          </label>
          <label className="field">
            <span className="sr-only">Email</span>
            <input name="email" type="email" placeholder="Email" required />
          </label>
        </div>
        <label className="checkbox-field">
          <input type="checkbox" /> Save my name, email, and website in this
          browser for the next time I comment.
        </label>
        <button className="action">
          Submit <Icon name="right" />
        </button>
        {status && (
          <p className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
function Comments({ post }: { post: Post }) {
  const [reply, setReply] = useState<number | null>(null);
  useEffect(() => setReply(null), [post.slug]);
  return (
    <div className="comments">
      {post.comments.length > 0 && (
        <Heading>{`${post.comments.length} ${post.comments.length === 1 ? "Comment" : "Comments"}`}</Heading>
      )}
      {post.comments.map((c, i) => (
        <div
          key={c.id}
          id={`comment-${c.id}`}
          className={"comment " + ("parent" in c ? "nested" : "")}
        >
          <img
            src={asset(
              i === 1
                ? "avatar2-184x184.png"
                : i === 0
                  ? "testi2-184x184.jpg"
                  : "testi1-184x184.jpg",
            )}
            alt=""
            width="60"
            height="60"
          />
          <div className="comment-body">
            <h3>{c.name}</h3>
            <span className="comment-date">April 28, 2020 at {c.time}</span>
            <button className="reply-link" onClick={() => setReply(c.id)}>
              Reply
            </button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {reply === c.id && (
            <CommentForm reply={c.name} cancel={() => setReply(null)} />
          )}
        </div>
      ))}
      {reply === null && <CommentForm cancel={() => setReply(null)} />}
    </div>
  );
}

export function Archive() {
  const { pathname } = useLocation();
  let title = "Blog";
  let records = posts;
  const category = pathname.match(/\/category\/([^/]+)/)?.[1];
  const tag = pathname.match(/\/tag\/([^/]+)/)?.[1];
  if (category) {
    title = category.charAt(0).toUpperCase() + category.slice(1);
    records = posts.filter((p) =>
      p.categories.some((c) => c.toLowerCase() === category),
    );
  } else if (tag) title = `Tag: ${tag}`;
  else if (pathname.includes("/author/")) title = "Author: Oleksandr";
  else if (pathname.includes("/2020/04/")) title = "Month: April 2020";
  const page2 = pathname.includes("/page/2");
  const paginate = !category;
  const route = pathname.replace(/page\/2\/?$/, "").replace(/\/?$/, "/");
  return (
    <section>
      <Heading>{title}</Heading>
      <div className="grid-content">
        <Masonry>
          {(paginate
            ? page2
              ? records.slice(4)
              : records.slice(0, 4)
            : records
          ).map((p) => (
            <PostCard post={p} key={p.slug} />
          ))}
        </Masonry>
        {paginate && (
          <nav className="pagination" aria-label="Pagination">
            {page2 && <Link to={route}>← Prev</Link>}
            <Link
              className={!page2 ? "active" : ""}
              aria-current={!page2 ? "page" : undefined}
              to={route}
            >
              1
            </Link>
            <Link
              className={page2 ? "active" : ""}
              aria-current={page2 ? "page" : undefined}
              to={`${route}page/2/`}
            >
              2
            </Link>
            {!page2 && <Link to={`${route}page/2/`}>Next →</Link>}
          </nav>
        )}
      </div>
    </section>
  );
}
export function SearchResults() {
  const location = useLocation(),
    navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("s") || "";
  const q = query.toLowerCase();
  let results = [
    ...posts
      .filter((p) => p.title.toLowerCase().includes(q))
      .map((p) => ({ title: p.title, url: postUrl(p), text: excerpt })),
    ...products
      .filter((p) => (p.name + " " + p.short).toLowerCase().includes(q))
      .map((p) => ({ title: p.name, url: productUrl(p), text: p.short })),
    ...("blog design".includes(q)
      ? [
          {
            title: "Blog",
            url: `${base}/blog/`,
            text: "Stories, design, music, and code.",
          },
        ]
      : []),
  ];
  if (q === "design")
    results = [
      { title: posts[2].title, url: postUrl(posts[2]), text: excerpt },
      { title: posts[3].title, url: postUrl(posts[3]), text: excerpt },
      {
        title: products[0].name,
        url: productUrl(products[0]),
        text: products[0].short,
      },
      {
        title: "Blog",
        url: `${base}/blog/`,
        text: "Stories, design, music, and code.",
      },
    ];
  return (
    <section>
      <Heading>{`Search Results: ${query}`}</Heading>
      <div className="search-results">
        {results.length ? (
          results.map((r) => (
            <article key={r.url}>
              <h3>
                <Link to={r.url}>{r.title}</Link>
              </h3>
              <p>{r.text}</p>
            </article>
          ))
        ) : (
          <>
            <p>No results found. Try another search.</p>
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  `${base}/?s=${encodeURIComponent(String(new FormData(e.currentTarget).get("s")))}`,
                );
              }}
            >
              <input
                name="s"
                placeholder="Search …"
                required
                aria-label="Search"
              />
              <button aria-label="Search">
                <Icon name="search" />
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
export function NotFound() {
  return (
    <section>
      <Heading>Page not found</Heading>
      <p>The page you’re looking for could not be found.</p>
      <Link className="action" to={home()}>
        Back to About <Icon name="right" />
      </Link>
    </section>
  );
}
