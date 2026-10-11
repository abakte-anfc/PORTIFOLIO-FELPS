import React from "react";
import { ArrowDown } from "lucide-react";
import { VideoCard } from "./VideoCard.jsx";
import { useSection } from "../../portfolio-parts/shared.jsx";

// Grade assimétrica original do KaKa: largo/estreito e estreito/largo.
export function UniverseSection({ data, years, pages }) {
  const { O: renderMeta } = useSection({ id: "work", years, pages });
  return (
    <section
      id="work"
      className="universe-section"
      aria-labelledby="universe-title"
      data-motion-section
    >
      <div className="portfolio-container">
        {renderMeta()}
        <div className="section-heading">
          <div data-motion-item>
            <h2 id="universe-title">
              {data.title[0]}
              <br />
              <span>{data.title[1]}</span>
            </h2>
          </div>
          <div className="gallery-heading-side" data-motion-item>
            <p>{data.description}</p>
            <a href="#about" className="portfolio-text-link">
              Conheça quem cria <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <div className="universe-grid">
          {data.videos.slice(0, 4).map((video, index) => (
            <div
              className={`universe-item universe-item-${index}`}
              key={video.id}
              data-motion-item
            >
              <VideoCard video={video} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
