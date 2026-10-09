import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VideoCard } from "./VideoCard.jsx";

export function VideoCollection({ videos, title, pageSize = 4 }) {
  const [page, setPage] = useState(0);
  const count = Math.ceil(videos.length / pageSize);
  return (
    <div className="folder-video-content">
      <div className="folder-video-grid">
        {videos
          .slice(page * pageSize, (page + 1) * pageSize)
          .map((video, index) => (
            <VideoCard
              key={video.id || video.src || index}
              video={video}
              index={page * pageSize + index}
            />
          ))}
      </div>
      {count > 1 && (
        <nav className="video-pagination" aria-label={`Páginas de ${title}`}>
          <button
            type="button"
            disabled={page === 0}
            aria-label="Página anterior"
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <span aria-live="polite">
            {page + 1} / {count}
          </span>
          <button
            type="button"
            disabled={page === count - 1}
            aria-label="Próxima página"
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}
