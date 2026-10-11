import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SplitText } from "./SplitText.tsx";
import { CheckerArtwork } from "./CheckerArtwork.jsx";
import { VideoCard } from "./VideoCard.jsx";

// Mesma composição da abertura do KaKa: três linhas, texto/ações e mídia à direita.
export function PortfolioHero({ data }) {
  return (
    <section className="portfolio-hero" id="cover" aria-labelledby="hero-title">
      <div className="portfolio-container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            {data.hero.eyebrow}
          </div>
          <h1 id="hero-title" aria-label={data.hero.lines.join(" ")}>
            <SplitText
              className="hero-split"
              tag="span"
              delay={26}
              duration={0.85}
              from={{ opacity: 0, y: 56, rotateX: -24 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
            >
              {data.hero.lines.map((line, i) => (
                <span
                  key={line}
                  className={`hero-title-line ${i === 2 ? "hero-title-accent" : ""}`}
                >
                  {line}
                </span>
              ))}
            </SplitText>
          </h1>
          <p>{data.hero.description}</p>
          <div className="hero-actions">
            <a href="#contents" className="portfolio-button">
              Explorar projetos <ArrowDown size={18} />
            </a>
            <a href="#contact" className="portfolio-button button-outline">
              Fale comigo <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-location">
            <span className="location-line" />
            {data.role} <span aria-hidden="true">/</span> {data.year}
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-index">
            <span>{data.name} / PORTFÓLIO</span>
            <span>01 — 05</span>
          </div>
          <div className="hero-artwork">
            {data.hero.media.src ? (
              <VideoCard video={data.hero.media} showCaption={false} />
            ) : (
              <CheckerArtwork />
            )}
            <span className="artwork-label">UM JEITO PRÓPRIO DE VER.</span>
          </div>
          <div className="visual-footer">
            <span>O detalhe faz a diferença.</span>
            <ArrowUpRight size={27} />
          </div>
        </div>
      </div>
      <div className="hero-bottom portfolio-container">
        <span>
          CRIAÇÃO <b>/</b> NARRATIVA <b>/</b> MOVIMENTO
        </span>
        <a href="#contents">
          Bora conhecer <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
