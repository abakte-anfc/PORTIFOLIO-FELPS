import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";

function localMedia(value) {
  return typeof value === "string" &&
    /^\/(?!\/)[a-zA-Z0-9_./% -]+$/.test(value) &&
    !value.includes("..")
    ? value
    : "";
}

export function VideoCard({
  video,
  index = 0,
  className = "",
  showCaption = true,
}) {
  const [failedSource, setFailedSource] = useState("");
  const player = useRef(null);
  const src = localMedia(video.src);
  const poster = localMedia(video.poster);
  const available = src && src !== failedSource;
  useEffect(() => {
    const element = player.current;
    const folder = element?.closest(".ftp-band-fold");
    if (!folder || typeof window.MutationObserver !== "function") return;
    const pauseWhenClosed = () => {
      if (folder.hidden) element.pause();
    };
    const observer = new window.MutationObserver(pauseWhenClosed);
    observer.observe(folder, { attributes: true, attributeFilter: ["hidden"] });
    pauseWhenClosed();
    return () => observer.disconnect();
  }, [available]);
  return (
    <figure className={`video-card ${className}`}>
      <div
        className={`video-stage ${available ? "has-video" : "video-reserved"}`}
      >
        {available ? (
          <video
            ref={player}
            key={src}
            controls
            preload={video.preload === "auto" ? "auto" : "none"}
            playsInline
            poster={poster || undefined}
            aria-label={video.title}
            onError={() => setFailedSource(src)}
          >
            <source src={src} onError={() => setFailedSource(src)} />
            Seu navegador não reproduz este vídeo.{" "}
            <a href={src}>Baixar vídeo</a>
          </video>
        ) : (
          <>
            <span className="video-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="video-abstract" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="video-play" aria-hidden="true">
              <Play size={24} strokeWidth={1.4} />
            </span>
            <span className="video-status">Vídeo em breve</span>
          </>
        )}
      </div>
      {showCaption && (
        <figcaption>
          <span>{video.title}</span>
          <span className="video-kind">
            VÍDEO <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </figcaption>
      )}
      {video.description && (
        <p className="video-description">{video.description}</p>
      )}
    </figure>
  );
}
