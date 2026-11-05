import { useEffect, useRef, useState } from "react";
import { asset } from "./content";
import { useApp } from "./state";
import { Icon } from "./icons";
import { ProjectDetail } from "./pages";
export function Overlay() {
  const { viewer, setViewer } = useApp();
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0),
    [zoom, setZoom] = useState(false),
    [share, setShare] = useState(false);
  useEffect(() => {
    setIndex(viewer?.kind === "images" ? viewer.index || 0 : 0);
    setZoom(false);
    setShare(false);
    if (viewer) {
      dialog.current?.showModal();
      const before = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        if (document.fullscreenElement === dialog.current)
          document.exitFullscreen().catch(() => {});
        dialog.current?.close();
        document.body.style.overflow = before;
      };
    }
  }, [viewer]);
  const step = (n: number) => {
    if (viewer?.kind === "images") {
      setIndex((i) => (i + n + viewer.images.length) % viewer.images.length);
      setZoom(false);
    }
  };
  const close = () => {
    setViewer(
      viewer?.kind === "images" && viewer.returnTo
        ? { kind: "project", work: viewer.returnTo }
        : null,
    );
  };
  const currentIndex =
    viewer?.kind === "images" ? Math.min(index, viewer.images.length - 1) : 0;
  return (
    <dialog
      className={`overlay ${viewer?.kind || ""}`}
      ref={dialog}
      aria-label={
        viewer?.kind === "project"
          ? viewer.work.title
          : viewer?.title || "Image viewer"
      }
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {viewer && (
        <>
          <div className="overlay-tools">
            {viewer.kind === "images" && (
              <>
                <button aria-label="Zoom image" onClick={() => setZoom(!zoom)}>
                  <Icon name="zoom" />
                </button>
                <button
                  aria-label="Fullscreen"
                  onClick={() => {
                    if (document.fullscreenElement) document.exitFullscreen();
                    else dialog.current?.requestFullscreen?.();
                  }}
                >
                  <Icon name="expand" />
                </button>
                <button
                  aria-label="Share image"
                  onClick={() => setShare(!share)}
                >
                  <Icon name="share" />
                </button>
              </>
            )}
            <button aria-label="Close (Esc)" onClick={close}>
              <Icon name="close" />
            </button>
          </div>
          {viewer.kind === "images" && (
            <>
              {viewer.images.length > 1 && (
                <button
                  className="viewer-prev"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                >
                  <Icon name="prev" />
                </button>
              )}
              <div className={`viewer-image ${zoom ? "zoomed" : ""}`}>
                <img
                  src={asset(viewer.images[currentIndex])}
                  alt={`${viewer.title} — ${currentIndex + 1}`}
                  onClick={() => setZoom(!zoom)}
                />
              </div>
              {viewer.images.length > 1 && (
                <button
                  className="viewer-next"
                  aria-label="Next image"
                  onClick={() => step(1)}
                >
                  <Icon name="chevron" />
                </button>
              )}
              <div className="viewer-caption">
                {viewer.title}
                <span>
                  {currentIndex + 1} / {viewer.images.length}
                </span>
              </div>
              {share && (
                <div className="viewer-share">
                  <a
                    href={asset(viewer.images[currentIndex])}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open original image <Icon name="link" />
                  </a>
                </div>
              )}
            </>
          )}
          {viewer.kind === "video" && (
            <div className="video-dialog">
              <iframe
                title={viewer.title}
                src="https://player.vimeo.com/video/97102654?autoplay=1"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
              <a
                href="https://vimeo.com/97102654"
                target="_blank"
                rel="noreferrer"
              >
                Watch on Vimeo <Icon name="link" />
              </a>
            </div>
          )}
          {viewer.kind === "project" && (
            <div className="project-dialog">
              <ProjectDetail work={viewer.work} embedded inOverlay />
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
