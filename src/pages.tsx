import { Link } from "react-router-dom";
import {
  asset,
  home,
  works,
  workUrl,
  projectDescription,
} from "./content";
import type { Work } from "./content";
import { Heading, ShareLinks } from "./components";
import { Icon } from "./icons";
import { useApp } from "./state";

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
      <p>{projectDescription}</p>
      <p>{projectDescription}</p>
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
