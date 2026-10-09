"use client";
import React, { createContext, useContext, useId, useState } from "react";
import { number, colors } from "./primitives.js";
import "./styles.css";

export const portfolioPages = [
  { id: "cover", label: "Início" },
  { id: "contents", label: "Projetos" },
  { id: "about", label: "Sobre" },
  { id: "work", label: "Trabalhos" },
  { id: "process", label: "Processo" },
  { id: "words", label: "Palavras" },
  { id: "contact", label: "Contato" },
];
const Context = createContext(null);

export function PortfolioShell({
  children,
  defaultTheme = "light",
  colors: overrides,
  className = "",
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const palette = { ...colors, ...overrides };
  return (
    <Context.Provider value={{ theme, setTheme }}>
      <div
        className={`ftp-root ${className}`}
        data-theme={theme}
        style={{
          "--ftp-blue": palette.blue,
          "--ftp-green": palette.green,
          "--ftp-orange": palette.orange,
          "--ftp-yellow": palette.yellow,
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}
export function usePortfolioTheme() {
  return useContext(Context);
}

export function scrollToPage(id, pages = portfolioPages) {
  const page = pages.find((p) => p.id === id);
  const target = document.getElementById(page?.targetId || id);
  target?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

export function useSection({
  id,
  name = "Portfolio",
  years = "2026",
  disciplines = [],
  pages = portfolioPages,
}) {
  const unique = useId().replace(/:/g, "");
  const headingId = `${id}-${unique}-h`;
  const position = (key) =>
    Math.max(0, pages.findIndex((p) => p.id === key) + 1);
  return {
    H: unique,
    P: pages,
    et: position,
    U: (target) => scrollToPage(target, pages),
    V: () => ({ id, "data-sheet": id, "aria-labelledby": headingId }),
    O: () => (
      <div className="ftp-meta" aria-hidden="true">
        <span>{years}</span>
        {disciplines.slice(0, 3).map((d) => (
          <span key={d}>{d}</span>
        ))}
        <span data-on="true">{pages.find((p) => p.id === id)?.label}</span>
        <span>
          {number(position(id))} / {number(pages.length)}
        </span>
      </div>
    ),
    Y: (_id, tag, title, options = {}) => (
      <div className="ftp-head">
        <span className="ftp-plus" style={{ left: -18, top: -6 }} />
        <span className="ftp-plus" style={{ right: -18, top: -6 }} />
        <div className="ftp-head-row">
          <h2 id={headingId} style={{ minWidth: 0, flex: "1 1 auto" }}>
            <span className="ftp-head-title">{title}</span>
          </h2>
        </div>
        {options.kicker && (
          <p className="ftp-kicker" style={{ marginTop: 14 }}>
            {options.kicker}
          </p>
        )}
      </div>
    ),
  };
}
