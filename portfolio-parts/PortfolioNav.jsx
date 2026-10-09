"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ThemeIcon, number } from "./primitives.js";
import { portfolioPages, scrollToPage, usePortfolioTheme } from "./shared.jsx";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PortfolioNav({
  pages = portfolioPages,
  onNavigate,
  activeId,
  onThemeChange,
}) {
  const shell = usePortfolioTheme();
  const [localTheme, setLocalTheme] = useState("light");
  const [observed, setObserved] = useState(pages[0]?.id);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const links = useRef(null);
  const buttons = useRef({});
  const current = activeId ?? observed;
  const theme = shell?.theme ?? localTheme;

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            const page = pages.find(
              (p) => (p.targetId || p.id) === entry.target.id,
            );
            if (page) setObserved(page.id);
          }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    for (const page of pages) {
      const element = document.getElementById(page.targetId || page.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pages]);

  useBrowserLayoutEffect(() => {
    const update = () => {
      const button = buttons.current[current];
      if (!button) return;
      setIndicator({ x: button.offsetLeft, width: button.offsetWidth });
      if (links.current?.scrollWidth > links.current?.clientWidth)
        links.current.scrollTo({
          left:
            button.offsetLeft -
            links.current.clientWidth / 2 +
            button.offsetWidth / 2,
          behavior: "smooth",
        });
    };
    update();
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    if (links.current) observer?.observe(links.current);
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [current, pages]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    (shell?.setTheme || setLocalTheme)(next);
    onThemeChange?.(next);
  };
  return (
    <div className="ftp-navwrap">
      <nav className="ftp-nav" aria-label="Páginas do portfólio">
        <span className="ftp-count" aria-hidden="true">
          {number(Math.max(1, pages.findIndex((p) => p.id === current) + 1))}
          <small>/{number(pages.length)}</small>
        </span>
        <div className="ftp-links" ref={links}>
          <span
            className="ftp-ind"
            style={{
              transform: `translateX(${indicator.x}px)`,
              width: indicator.width,
              opacity: indicator.width ? 1 : 0,
            }}
          />
          {pages.map((page) => (
            <button
              key={page.id}
              ref={(element) => {
                buttons.current[page.id] = element;
              }}
              type="button"
              className="ftp-link"
              aria-current={current === page.id ? "page" : undefined}
              onClick={() => {
                if (onNavigate) onNavigate(page.id);
                else scrollToPage(page.id, pages);
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ftp-icon"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
          }
        >
          <ThemeIcon dark={theme === "dark"} />
        </button>
      </nav>
    </div>
  );
}
