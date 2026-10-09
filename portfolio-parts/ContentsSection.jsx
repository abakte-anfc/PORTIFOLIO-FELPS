"use client";
import React, { useState } from "react";
import * as t from "react/jsx-runtime";
import { Folder as F, Arrow as S, number as k } from "./primitives.js";
import { useSection } from "./shared.jsx";

export function ContentsSection({
  id = "contents",
  name: o = "Seu nome",
  years: r = "2026",
  title = "Projetos",
  chapters: M = [],
  pages,
  defaultOpen = 0,
  onNavigate,
  disciplines,
  intro,
}) {
  const [Ut, Xt] = useState(defaultOpen);
  const {
    H,
    P,
    et,
    U: navigate,
    V,
    O,
    Y,
  } = useSection({ id, name: o, years: r, pages, disciplines });
  const U = onNavigate || navigate;
  return t.jsxs("section", {
    className: "ftp-sheet ftp-rv",
    ...V("contents"),
    children: [
      O("contents"),
      Y("contents", "(" + k(M.length) + ")", title, {
        local: null,
        kicker:
          intro ??
          "Projetos de " + o + " · " + r + ". Abra uma pasta para explorar os trabalhos.",
      }),
      t.jsx("div", {
        className: "ftp-band-list",
        children: M.map((e, a) => {
          const c = Ut === a,
            g = [0.62, 0.08, 0.84, 0.3, 0.7, 0.18][a % 6];
          return t.jsxs(
            F,
            {
              tone: c ? "blue" : "sheet",
              tabAt: g,
              className: "ftp-band",
              "data-open": c ? "true" : "false",
              tab: t.jsxs(t.Fragment, {
                children: [
                  e.tab || "Projeto " + (a + 1),
                  t.jsx(S, { size: 12 }),
                ],
              }),
              children: [
                t.jsxs("button", {
                  type: "button",
                  className: "ftp-band-head",
                  "aria-expanded": c,
                  "aria-controls": H + "-ch-" + a,
                  onClick: () => Xt(c ? -1 : a),
                  children: [
                    t.jsx("span", {
                      className: "ftp-band-n",
                      children: k(a + 1),
                    }),
                    t.jsxs("span", {
                      style: { minWidth: 0 },
                      children: [
                        t.jsx("span", {
                          className: "ftp-band-t",
                          style: { display: "block" },
                          children: e.title,
                        }),
                        c &&
                          e.local &&
                          t.jsx("span", {
                            className: "ftp-band-local",
                            lang: "zh",
                            children: e.local,
                          }),
                      ],
                    }),
                    c &&
                      e.points &&
                      e.points.length > 0 &&
                      t.jsx("ul", {
                        className: "ftp-band-pts",
                        children: e.points.map((L) =>
                          t.jsx("li", { children: L }, L),
                        ),
                      }),
                  ],
                }),
                t.jsx("div", {
                  className: "ftp-band-fold",
                  hidden: !c,
                  id: H + "-ch-" + a,
                  children: t.jsxs("div", {
                    children: [
                      e.content,
                      e.target &&
                        P.some((L) => L.id === e.target) &&
                        t.jsxs("div", {
                          className: "ftp-band-go",
                          children: [
                            t.jsx("p", {
                              children:
                                "Capítulo " +
                                k(a + 1) +
                                " · página " +
                                k(et(e.target)),
                            }),
                            t.jsxs("button", {
                              type: "button",
                              className: "ftp-go",
                              tabIndex: c ? 0 : -1,
                              onClick: () => U(e.target),
                              children: [
                                "Abrir capítulo ",
                                t.jsx(S, { size: 12 }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
              ],
            },
            e.title + a,
          );
        }),
      }),
    ],
  });
}
