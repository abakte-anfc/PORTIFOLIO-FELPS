"use client";
import React from "react";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cascadeItems = gsap.utils.toArray<HTMLElement>(
          "[data-motion-item]",
          root,
        );
        gsap.set(cascadeItems, { opacity: 0, y: 28 });

        ScrollTrigger.batch(cascadeItems, {
          start: "top 88%",
          interval: 0.12,
          batchMax: 4,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              y: 24,
              duration: 0.28,
              stagger: 0.035,
              overwrite: true,
            }),
        });

        gsap.utils
          .toArray<HTMLElement>("[data-parallax]", root)
          .forEach((element) => {
            const distance = Number(element.dataset.parallax) || 10;
            const section = element.closest("[data-motion-section]") ?? element;
            gsap.fromTo(
              element,
              { yPercent: distance },
              {
                yPercent: -distance,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.55,
                },
              },
            );
          });
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="scroll-motion-root">
      {children}
    </div>
  );
}
