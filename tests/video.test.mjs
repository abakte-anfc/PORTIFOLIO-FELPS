import { test } from "node:test";
import assert from "node:assert/strict";
import React, { act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
import { portfolio } from "../src/data/portfolio.js";

test("only the first two portfolio videos preload, without autoplay", async () => {
  const { VideoCard } = await import("../.test-build/VideoCard.js");
  const videos = [...portfolio.chapters.flatMap(chapter => chapter.videos), ...portfolio.universe.videos];
  for (const [index, video] of videos.entries()) {
    const html = renderToStaticMarkup(React.createElement(VideoCard, { video }));
    assert.ok(html.includes(`preload="${index < 2 ? "auto" : "none"}"`), video.title);
    assert.ok(!html.toLowerCase().includes("autoplay"));
  }
});

test("missing videos render a reserved slot, never a broken player", async () => {
  const module = await import("../.test-build/VideoCard.js").catch(() => null);
  assert.ok(module?.VideoCard, "The video component must exist");
  const html = renderToStaticMarkup(
    React.createElement(module.VideoCard, {
      video: { title: "Projeto", src: "" },
    }),
  );
  assert.ok(!html.includes("<video"));
  assert.ok(html.includes("Vídeo em breve"));
});

test("video playback is manual, lazy, and exposes an accessible description", async () => {
  const { VideoCard } = await import("../.test-build/VideoCard.js");
  const html = renderToStaticMarkup(
    React.createElement(VideoCard, {
      video: { title: "Meu projeto", src: "/videos/projeto.mp4" },
    }),
  );
  assert.ok(html.includes('controls=""'));
  assert.ok(html.includes('preload="none"'));
  assert.ok(html.includes('aria-label="Meu projeto"'));
  assert.ok(!html.toLowerCase().includes("autoplay"));
});

test("unsupported paths and missing files fall back to a reserved slot", async () => {
  const { VideoCard } = await import("../.test-build/VideoCard.js");
  const invalid = renderToStaticMarkup(
    React.createElement(VideoCard, {
      video: { title: "Projeto", src: "javascript:alert(1)" },
    }),
  );
  assert.ok(!invalid.includes("<video"));
  const dom = new JSDOM('<div id="root"></div>');
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(VideoCard, {
        video: { title: "Projeto", src: "/videos/ausente.mp4" },
      }),
    ),
  );
  await act(async () =>
    document.querySelector("video").dispatchEvent(new window.Event("error")),
  );
  assert.equal(document.querySelector("video"), null);
  assert.ok(document.body.textContent.includes("Vídeo em breve"));
  await act(async () => root.unmount());
});

test("closing a contents folder pauses its video", async () => {
  const { VideoCard } = await import("../.test-build/VideoCard.js");
  const dom = new JSDOM('<div id="root"></div>');
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  let pauses = 0;
  window.HTMLMediaElement.prototype.pause = () => {
    pauses++;
  };
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(
        "div",
        { className: "ftp-band-fold" },
        React.createElement(VideoCard, {
          video: { title: "Projeto", src: "/videos/video.mp4" },
        }),
      ),
    ),
  );
  await act(async () => {
    document.querySelector(".ftp-band-fold").hidden = true;
  });
  assert.equal(pauses, 1);
  await act(async () => root.unmount());
});

test("a folder paginates larger video collections with working boundaries", async () => {
  const { VideoCollection } = await import("../.test-build/VideoCard.js");
  const dom = new JSDOM('<div id="root"></div>');
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const videos = Array.from({ length: 7 }, (_, index) => ({
    id: String(index),
    title: `Projeto ${index + 1}`,
    src: "",
  }));
  const root = createRoot(document.getElementById("root"));
  await act(async () =>
    root.render(
      React.createElement(VideoCollection, { videos, title: "Projetos" }),
    ),
  );
  assert.equal(document.querySelectorAll(".video-card").length, 4);
  assert.equal(
    document.querySelector('[aria-label="Página anterior"]').disabled,
    true,
  );
  await act(async () =>
    document.querySelector('[aria-label="Próxima página"]').click(),
  );
  assert.equal(document.querySelectorAll(".video-card").length, 3);
  assert.ok(document.body.textContent.includes("Projeto 7"));
  assert.equal(
    document.querySelector('[aria-label="Próxima página"]').disabled,
    true,
  );
  await act(async () =>
    document.querySelector('[aria-label="Página anterior"]').click(),
  );
  assert.equal(document.querySelectorAll(".video-card").length, 4);
  await act(async () => root.unmount());
});
