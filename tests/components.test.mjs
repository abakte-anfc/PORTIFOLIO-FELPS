import { test } from "node:test";
import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import {
  PortfolioShell,
  PortfolioNav,
  ContentsSection,
  AboutSection,
  ContactSection,
} from "../dist/components/portfolio-parts.js";

const h = React.createElement;
const dom = new JSDOM('<!doctype html><div id="root"></div>', {
  url: "https://example.test",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: dom.window.navigator,
});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: false });

async function mount(component) {
  const element = document.getElementById("root");
  const root = createRoot(element);
  await act(async () => root.render(h(PortfolioShell, null, component)));
  return { element, close: () => act(async () => root.unmount()) };
}

test("exports only the selected sections; original SVG portrait and contact cards render", () => {
  const html = renderToStaticMarkup(
    h(
      PortfolioShell,
      null,
      h(PortfolioNav),
      h(ContentsSection, {
        chapters: [{ title: "Profile", content: "Details" }],
      }),
      h(AboutSection, {
        name: "Ana Silva",
        highlights: [{ label: "React", lines: ["Interfaces"], tone: "green" }],
        timeline: [
          { from: "2024", to: "2026", title: "Developer", place: "Studio" },
        ],
      }),
      h(ContactSection, {
        email: "ana@example.test",
        contacts: [{ label: "Location", value: "Bahia" }],
      }),
    ),
  );
  for (const id of ["contents", "about", "contact"])
    assert.ok(html.includes(`id="${id}"`));
  for (const id of ["cover", "work", "process", "words"])
    assert.ok(!html.includes(`id="${id}"`));
  assert.ok(html.includes("Ana Silva"));
  assert.ok(html.includes("mailto:ana@example.test"));
  assert.ok(html.includes("<svg"));
  assert.ok(!html.includes('href="#"'));
});

test("contents folders open arbitrary content and close accessibly", async () => {
  const { element, close } = await mount(
    h(ContentsSection, {
      defaultOpen: -1,
      chapters: [
        { title: "Profile", content: h("strong", null, "Custom content") },
      ],
    }),
  );
  const button = element.querySelector(".ftp-band-head");
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  assert.equal(button.getAttribute("aria-expanded"), "false");
  assert.equal(panel.hidden, true);
  await act(async () => button.click());
  assert.equal(button.getAttribute("aria-expanded"), "true");
  assert.equal(panel.hidden, false);
  assert.ok(panel.textContent.includes("Custom content"));
  await act(async () => button.click());
  assert.equal(panel.hidden, true);
  await close();
});

test("navigation preserves seven tabs, custom destinations, and theme toggle", async () => {
  let destination;
  const { element, close } = await mount(
    h(PortfolioNav, {
      activeId: "about",
      onNavigate: (id) => {
        destination = id;
      },
    }),
  );
  const tabs = [...element.querySelectorAll(".ftp-link")];
  assert.deepEqual(
    tabs.map((el) => el.textContent),
    ["Início", "Projetos", "Sobre", "Trabalhos", "Processo", "Palavras", "Contato"],
  );
  assert.equal(element.querySelector(".ftp-count").textContent, "03/07");
  assert.equal(tabs[2].getAttribute("aria-current"), "page");
  await act(async () => tabs[3].click());
  assert.equal(destination, "work");
  await act(async () => element.querySelector(".ftp-icon").click());
  assert.equal(element.querySelector(".ftp-root").dataset.theme, "dark");
  await close();
});

test("folder destination scrolls to an existing custom project section", async () => {
  let scrolled = false;
  const target = document.createElement("section");
  target.id = "my-work";
  target.scrollIntoView = () => {
    scrolled = true;
  };
  document.body.append(target);
  const { element, close } = await mount(
    h(ContentsSection, {
      pages: [
        { id: "contents", label: "Contents" },
        { id: "work", label: "Work", targetId: "my-work" },
      ],
      chapters: [{ title: "Projects", target: "work" }],
    }),
  );
  await act(async () => element.querySelector(".ftp-go").click());
  assert.equal(scrolled, true);
  await close();
  target.remove();
});

test("contact copies the supplied email and announces success", async () => {
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async (value) => {
        copied = value;
      },
    },
  });
  const { element, close } = await mount(
    h(ContactSection, { email: "ana@example.test" }),
  );
  await act(async () => element.querySelector("button.ftp-btn").click());
  assert.equal(copied, "ana@example.test");
  assert.equal(
    element.querySelector('[role="status"]').textContent,
    "Copiado: ana@example.test",
  );
  await close();
});

test("contact with no address keeps the folder design without fake email actions", () => {
  const html = renderToStaticMarkup(
    h(
      PortfolioShell,
      null,
      h(ContactSection, { email: "", emptyEmailMessage: "Contato em breve" }),
    ),
  );
  assert.ok(!html.includes("mailto:"));
  assert.ok(!html.includes('class="ftp-btn"'));
  assert.ok(html.includes("Contato em breve"));
  assert.ok(html.includes("ftp-folder"));
});
