"use client";
import React from "react";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GsapSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GsapSplitText, useGSAP);

type SplitTextProps = {
  text?: string;
  children?: ReactNode;
  className?: string;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
};

export function SplitText({
  text = "",
  children,
  className = "",
  tag = "span",
  delay = 34,
  duration = 0.85,
  ease = "power3.out",
  threshold = 0.12,
  rootMargin = "-72px",
  from = { opacity: 0, y: 44, rotateX: -22 },
  to = { opacity: 1, y: 0, rotateX: 0 },
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const setRef = useCallback((element: HTMLElement | null) => {
    ref.current = element;
  }, []);
  const Tag: ElementType = tag;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || (!text && !children)) return;

      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
        rootMargin.trim(),
      );
      const margin = marginMatch ? Number(marginMatch[1]) : 0;
      const unit = marginMatch?.[2] || "px";
      const offset =
        margin === 0
          ? ""
          : `${margin > 0 ? "+=" : "-="}${Math.abs(margin)}${unit}`;
      const start = `top ${(1 - threshold) * 100}%${offset}`;
      const media = gsap.matchMedia();
      let cancelled = false;

      const initialize = () =>
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const split = GsapSplitText.create(element, {
            type: "chars",
            charsClass: "split-char",
            deepSlice: true,
            autoSplit: true,
            reduceWhiteSpace: false,
            aria: "none",
            onSplit: (instance) =>
              gsap.fromTo(
                instance.chars,
                { ...from },
                {
                  ...to,
                  duration,
                  ease,
                  stagger: delay / 1000,
                  willChange: "transform, opacity",
                  force3D: true,
                  scrollTrigger: {
                    trigger: element,
                    start,
                    once: true,
                    fastScrollEnd: true,
                  },
                },
              ),
          });

          return () => split.revert();
        });

      // Splitting with fallback font metrics can duplicate the original block lines.
      // Load the computed font first; the original, unsplit text remains visible meanwhile.
      const font = getComputedStyle(element).font;
      const ready = document.fonts
        ? document.fonts.load(font, element.textContent || text)
        : Promise.resolve();
      ready
        .catch(() => undefined)
        .then(() => {
          if (!cancelled) initialize();
        });

      return () => {
        cancelled = true;
        media.revert();
      };
    },
    {
      scope: ref,
      dependencies: [
        text,
        children,
        delay,
        duration,
        ease,
        threshold,
        rootMargin,
        from,
        to,
      ],
    },
  );

  const style: CSSProperties = { textAlign: "left", whiteSpace: "normal" };
  return (
    <Tag
      ref={setRef}
      style={style}
      className={`split-parent ${className}`}
      aria-hidden="true"
    >
      {children ?? text}
    </Tag>
  );
}
