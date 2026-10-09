"use client";
import React, { useEffect, useRef, useState } from "react";
import * as t from "react/jsx-runtime";
import { Folder as F, Arrow as S } from "./primitives.js";
import { useSection } from "./shared.jsx";

export function ContactSection({
  id = "contact",
  name = "Seu nome",
  years: r = "2026",
  email: T = "you@example.com",
  contacts: K = [],
  title = "Contato",
  heading = "Vamos conversar :)",
  message = "Ideias, dúvidas e convites para um café são bem-vindos.",
  copyLabel = "Copiar",
  writeLabel = "Escrever",
  emptyEmailMessage = "Informações de contato em breve.",
  tabs = ["Novas possibilidades", "Contato", "Redes sociais"],
  pages,
  disciplines,
}) {
  const { V, O, Y } = useSection({ id, name, years: r, pages, disciplines });
  const [status, setStatus] = useState("");
  const timeout = useRef();
  useEffect(() => () => clearTimeout(timeout.current), []);
  const $t = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(T);
      copied = true;
    } catch {
      const previous = document.activeElement;
      const input = document.createElement("textarea");
      input.value = T;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.append(input);
      input.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      input.remove();
      previous?.focus();
    }
    setStatus(copied ? `Copiado: ${T}` : `Copie manualmente: ${T}`);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus(""), 3000);
  };
  return (
    <>
      {t.jsxs("section", {
        className: "ftp-sheet ftp-rv",
        ...V("contact"),
        children: [
          O("contact"),
          Y("contact", "(:)", title, { local: null, withSig: !0 }),
          t.jsxs("div", {
            className: "ftp-stack",
            children: [
              t.jsx(F, {
                tone: "blue",
                tabAt: 0.78,
                tab: t.jsxs(t.Fragment, {
                  children: [tabs[0] + " ", t.jsx(S, { size: 12 })],
                }),
                children: t.jsxs("div", {
                  className: "ftp-talk",
                  children: [
                    t.jsx("h3", { children: heading }),
                    t.jsx("p", {
                      children: message,
                    }),
                  ],
                }),
              }),
              t.jsx(F, {
                tone: "green",
                tabAt: 0.56,
                tab: t.jsxs(t.Fragment, {
                  children: [tabs[1] + " ", t.jsx(S, { size: 12 })],
                }),
                children: t.jsxs("div", {
                  className: "ftp-mail",
                  children: [
                    T
                      ? t.jsx("a", {
                          className: "ftp-mail-a",
                          href: "mailto:" + T,
                          children: T,
                        })
                      : t.jsx("p", {
                          className: "ftp-mail-placeholder",
                          children: emptyEmailMessage,
                        }),
                    T &&
                      t.jsxs("div", {
                        className: "ftp-btns",
                        children: [
                          t.jsx("button", {
                            type: "button",
                            className: "ftp-btn",
                            onClick: $t,
                            children: copyLabel,
                          }),
                          t.jsxs("a", {
                            className: "ftp-btn",
                            "data-ghost": "true",
                            href: "mailto:" + T,
                            children: [
                              writeLabel + " ",
                              t.jsx(S, { dir: "ne" }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              }),
              K.length > 0 &&
                t.jsx(F, {
                  tone: "sheet",
                  tabAt: 0.3,
                  tab: t.jsxs(t.Fragment, {
                    children: [tabs[2] + " ", t.jsx(S, { size: 12 })],
                  }),
                  style: {
                    filter: "drop-shadow(0 -6px 14px rgba(27,34,52,.08))",
                  },
                  children: t.jsx("div", {
                    className: "ftp-else",
                    children: K.map((e) =>
                      t.jsxs(
                        e.href ? "a" : "span",
                        {
                          href: e.href,
                          target: e.href ? "_blank" : void 0,
                          rel: "noreferrer",
                          children: [
                            t.jsxs("span", {
                              children: [
                                t.jsx("small", { children: e.label }),
                                e.value,
                              ],
                            }),
                            t.jsx(S, { dir: "ne" }),
                          ],
                        },
                        e.label,
                      ),
                    ),
                  }),
                }),
            ],
          }),
        ],
      })}
      {status && (
        <div className="ftp-toast" role="status">
          {status}
        </div>
      )}
    </>
  );
}
