import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  PortfolioShell,
  PortfolioNav,
  ContentsSection,
  AboutSection,
  ContactSection,
} from "../portfolio-parts/index.js";
import { portfolio, pages, palette } from "./data/portfolio.js";
import { PortfolioHero } from "./components/PortfolioHero.jsx";
import { UniverseSection } from "./components/UniverseSection.jsx";
import { VideoCollection } from "./components/VideoCollection.jsx";
import { ScrollMotion } from "./components/ScrollMotion.tsx";
import { CheckerArtwork } from "./components/CheckerArtwork.jsx";
import "./styles.css";

const colors = {
  blue: palette.blue,
  green: palette.blue,
  orange: palette.blue,
  yellow: palette.cream,
};

export default function App() {
  const chapters = portfolio.chapters.map((chapter) => ({
    ...chapter,
    content: <VideoCollection videos={chapter.videos} title={chapter.title} />,
  }));
  return (
    <PortfolioShell className="portfolio-site" colors={colors}>
      <a className="portfolio-skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="portfolio-topline portfolio-container">
        <a href="#cover" className="portfolio-wordmark">
          {portfolio.name}
          <span aria-hidden="true">✳</span>
        </a>
        <span>PORTFÓLIO / {portfolio.year}</span>
        <a href="#contact" className="topline-contact">
          Fale comigo <ArrowUpRight size={14} />
        </a>
      </div>
      <PortfolioNav pages={pages} />
      <ScrollMotion>
        <main id="conteudo">
          <PortfolioHero data={portfolio} />
          <div className="portfolio-container folder-section">
            <ContentsSection
              name={portfolio.name}
              years={portfolio.year}
              title="Projetos"
              pages={pages}
              chapters={chapters}
              intro="Cada pasta guarda um pedaço do trabalho. Abra, explore e descubra o que acontece em cada projeto."
            />
          </div>
          <UniverseSection data={portfolio.universe} />
          <div className="portfolio-container folder-section about-wrapper">
            <AboutSection
              name={portfolio.name}
              handle={portfolio.handle}
              years={portfolio.year}
              title="Quem sou eu?"
              greeting={portfolio.about.greeting}
              blurb={portfolio.about.description}
              photo={
                portfolio.about.photo || (
                  <div className="about-artwork">
                    <CheckerArtwork />
                    <span className="about-monogram" aria-hidden="true">
                      {portfolio.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  </div>
                )
              }
              photoHover={portfolio.about.photoHover}
              photoLayers={portfolio.about.photoLayers}
              highlights={portfolio.about.highlights}
              timeline={portfolio.about.timeline}
              contacts={portfolio.contact.links}
              pages={pages}
              colors={colors}
            />
          </div>
          <div className="portfolio-container folder-section contact-wrapper">
            <ContactSection
              name={portfolio.name}
              years={portfolio.year}
              title="Contato"
              heading={portfolio.contact.heading}
              message={portfolio.contact.message}
              email={portfolio.contact.email}
              contacts={portfolio.contact.links}
              copyLabel="Copiar"
              writeLabel="Escrever"
              emptyEmailMessage="Informações de contato em breve."
              tabs={["Novas possibilidades", "Contato", "Redes sociais"]}
              pages={pages}
            />
          </div>
        </main>
      </ScrollMotion>
      <footer className="portfolio-footer portfolio-container">
        <span>
          {portfolio.name}{" "}
          <span className="footer-muted">/ {portfolio.role}</span>
        </span>
        <span>© {portfolio.year}</span>
        <a href="#cover">Voltar ao topo ↑</a>
      </footer>
    </PortfolioShell>
  );
}
