"use client";
import React, { useRef, useState } from "react";
import * as t from "react/jsx-runtime";
import {
  Folder as F,
  Arrow as S,
  Star as Bt,
  Portrait as Me,
  initials as ve,
  seed as rt,
  colors,
} from "./primitives.js";
import { useSection } from "./shared.jsx";

export function AboutSection({
  id = "about",
  name: o = "Seu nome",
  localName: l = "",
  handle: s = "@yourname",
  years: r = "2026",
  photo: w,
  photoHover,
  photoLayers = [],
  greeting: A = "Olá, eu sou",
  blurb: y = "Adicione sua apresentação aqui.",
  highlights: u = [],
  timeline: N = [],
  contacts: K = [],
  colors: palette,
  title = "Sobre mim",
  timelineLabel = "Experiência profissional",
  pages,
  disciplines,
}) {
  const { V, O, Y } = useSection({ id, name: o, years: r, pages, disciplines });
  const E = { ...colors, ...palette };
  const Zt = o.split(/\s+/)[0];
  const _ = ["blue", "green", "orange", "yellow"];
  const [Kt, Lt] = useState(Math.max(0, N.length - 1));
  const $ = useRef(null);
  const [is3D, setIs3D] = useState(false);
  const hasLayers = photoLayers.length > 0;
  const interactive = Boolean(photoHover || hasLayers);
  const motionAllowed = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const activate = () => { if (motionAllowed()) setIs3D(true); };
  const ee = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = $.current.getBoundingClientRect();
    activate();
    $.current.style.setProperty("--photo-x", `${(event.clientX - bounds.left) / bounds.width - 0.5}`);
    $.current.style.setProperty("--photo-y", `${(event.clientY - bounds.top) / bounds.height - 0.5}`);
    $.current.style.setProperty(
      "--ry",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 10}deg`,
    );
    $.current.style.setProperty(
      "--rx",
      `${-((event.clientY - bounds.top) / bounds.height - 0.5) * 10}deg`,
    );
  };
  const ae = () => {
    setIs3D(false);
    $.current?.style.setProperty("--ry", "0deg");
    $.current?.style.setProperty("--rx", "0deg");
    $.current?.style.setProperty("--photo-x", "0");
    $.current?.style.setProperty("--photo-y", "0");
  };
  return t.jsxs("section", {
    className: "ftp-sheet ftp-rv",
    ...V("about"),
    children: [
      O("about"),
      Y("about", "#" + Zt, title, { withSig: !0 }),
      t.jsxs("div", {
        className: "ftp-about",
        children: [
          t.jsx("div", {
            className: "ftp-photo",
            "data-3d": is3D ? "true" : "false",
            "data-layered": hasLayers ? "true" : undefined,
            tabIndex: interactive ? 0 : undefined,
            role: interactive ? "group" : undefined,
            "aria-label": interactive ? "Retrato de " + o + ", cartão com efeito 3D" : undefined,
            onFocus: interactive ? activate : undefined,
            onBlur: interactive ? ae : undefined,
            ref: $,
            onPointerMove: ee,
            onPointerLeave: ae,
            children: t.jsxs(F, {
              tone: "blue",
              tabAt: 0.08,
              tab: ve(o) + (s ? " · " + s.replace(/^@/, "").split(".")[0] : ""),
              bodyClass: "ftp-photo-body",
              children: [
                t.jsx("div", {
                  className: "ftp-photo-frame",
                  children:
                    typeof w == "string"
                      ? t.jsxs(t.Fragment, { children: [t.jsx("img", {
                          src: w,
                          alt: o,
                          className: interactive ? "about-photo-normal" : undefined,
                          width: 300,
                          height: 360,
                          style: { maxWidth: "none" },
                        }), !hasLayers && photoHover && t.jsx("img", { src: photoHover, alt: "", "aria-hidden": true, className: "about-photo-3d", width: 464, height: 657 }), ...photoLayers.map((layer, index) => t.jsx("img", {
                          src: layer.src,
                          alt: "",
                          "aria-hidden": true,
                          className: "about-photo-layer",
                          width: 3840,
                          height: 2160,
                          style: { "--layer-distance": `${layer.distance ?? (index + 1) * 8}px`, zIndex: layer.behind ? 0 : index + 2 },
                        }, layer.src))] })
                      : (w ?? t.jsx(Me, { name: o, seed: rt(o) })),
                }),
                t.jsxs("div", {
                  className: "ftp-photo-glass",
                  style: { color: "var(--ftp-blue)" },
                  children: [
                    t.jsx(Bt, { size: 28 }),
                    t.jsx("span", { className: "profile-year", children: r.split(/[–-]/).pop() || r }),
                  ],
                }),
              ],
            }),
          }),
          t.jsxs("div", {
            children: [
              t.jsxs("p", {
                className: "ftp-hi",
                children: [
                  t.jsx("span", {
                    style: { color: "var(--ftp-blue)" },
                    children: t.jsx(Bt, { size: 34 }),
                  }),
                  t.jsxs("span", {
                    children: [
                      A,
                      " ",
                      t.jsx("b", { children: l || o }),
                      "!",
                      l
                        ? t.jsx("span", {
                            style: {
                              fontWeight: 500,
                              fontSize: ".5em",
                              marginLeft: 12,
                              color: "var(--ftp-muted)",
                            },
                            children: o,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              t.jsx("p", {
                className: "ftp-kicker",
                style: { marginTop: 12, maxWidth: 560 },
                children: y,
              }),
              u.length > 0 &&
                t.jsx("div", {
                  className: "ftp-cols",
                  children: u.map((e, a) =>
                    t.jsxs(
                      "div",
                      {
                        children: [
                          t.jsx("span", {
                            className: "ftp-badge",
                            style: {
                              background:
                                E[e.tone ?? (a % 2 ? "blue" : "green")],
                              color: e.tone === "yellow" ? "#5d5434" : "#fff",
                            },
                            children: e.label,
                          }),
                          t.jsx("ul", {
                            children: e.lines.map((c) =>
                              t.jsx("li", { children: c }, c),
                            ),
                          }),
                        ],
                      },
                      e.label + a,
                    ),
                  ),
                }),
              N.length > 0 &&
                t.jsxs("div", {
                  className: "ftp-tl",
                  children: [
                    t.jsx("span", {
                      className: "ftp-badge",
                      style: { background: E.blue, color: "#fff" },
                      children: timelineLabel,
                    }),
                    t.jsx("ol", {
                      className: "ftp-tl-track",
                      style: { "--n": N.length },
                      children: N.map((e, a) =>
                        t.jsxs(
                          "li",
                          {
                            className: "ftp-tl-item",
                            "data-on": Kt === a ? "true" : "false",
                            onPointerEnter: () => Lt(a),
                            onFocus: () => Lt(a),
                            tabIndex: 0,
                            children: [
                              t.jsxs("span", {
                                className: "ftp-tl-date",
                                style: { display: "block" },
                                children: [e.from, "–", e.to],
                              }),
                              t.jsx("span", {
                                className: "ftp-tl-dot",
                              }),
                              t.jsxs("span", {
                                style: { display: "block" },
                                children: [
                                  t.jsx("span", {
                                    className: "ftp-tl-title",
                                    style: { display: "block" },
                                    children: e.title,
                                  }),
                                  e.place &&
                                    t.jsx("span", {
                                      className: "ftp-tl-place",
                                      children: e.place,
                                    }),
                                ],
                              }),
                            ],
                          },
                          e.from + a,
                        ),
                      ),
                    }),
                  ],
                }),
              K.length > 0 &&
                t.jsx("div", {
                  className: "ftp-contacts",
                  children: K.map((e, a) => {
                    const c = _[a % 3],
                      g = t.jsxs(t.Fragment, {
                        children: [
                          t.jsx("i", {
                            style: { background: E[c], color: "#fff" },
                            children: e.label.slice(0, 1),
                          }),
                          e.value,
                        ],
                      });
                    return e.href
                      ? t.jsx(
                          "a",
                          {
                            className: "ftp-contact",
                            href: e.href,
                            target: "_blank",
                            rel: "noreferrer",
                            "aria-label": e.label + ": " + e.value,
                            children: g,
                          },
                          e.label,
                        )
                      : t.jsx(
                          "span",
                          { className: "ftp-contact", children: g },
                          e.label,
                        );
                  }),
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
