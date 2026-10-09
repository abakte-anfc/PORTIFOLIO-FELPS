import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH, headless: true } : { channel: "chrome", headless: true });
const artifacts = new URL("../artifacts/", import.meta.url);
await fs.mkdir(artifacts, { recursive: true });
const errors = [];
try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url);
    await page.locator("#hero-title").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".split-char").first().waitFor();
    if (width === 1440)
      assert.equal(
        await page.locator(".hero-title-line").count(),
        3,
        "The loaded heading font must preserve the three desktop lines",
      );
    assert.deepEqual(await page.locator(".ftp-link").allTextContents(), [
      "Início",
      "Projetos",
      "Nosso universo",
      "Sobre",
      "Contato",
    ]);
    assert.deepEqual(
      await page
        .locator("main section[id]")
        .evaluateAll((els) => els.map((el) => el.id)),
      ["cover", "contents", "work", "about", "contact"],
    );
    assert.equal(await page.locator("#work .video-card").count(), 3);
    assert.equal(await page.locator(".ftp-count").isVisible(), true);
    assert.equal(await page.locator("#work video").count(), 3);
    assert.equal(await page.locator('a[href^="mailto:"]').count(), 0);

    await page.getByRole("button", { name: "Projetos", exact: true }).click();
    const folders = page.locator(".ftp-band-head");
    await folders.nth(1).click();
    assert.equal(await folders.nth(1).getAttribute("aria-expanded"), "true");
    assert.equal(await folders.nth(0).getAttribute("aria-expanded"), "false");
    await page
      .locator("#contents .ftp-band")
      .nth(1)
      .locator(".video-card")
      .first()
      .waitFor({ state: "visible" });
    await folders.nth(0).click();

    for (const id of ["work", "about", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        true,
        `Horizontal overflow at ${width}px in ${id}`,
      );
    }
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    assert.equal(
      await page.locator(".portfolio-site").getAttribute("data-theme"),
      "dark",
    );
    await page.getByRole("button", { name: "Ativar tema claro" }).click();
    await page.getByRole("button", { name: "Início", exact: true }).click();
    await page.waitForTimeout(1000);
    if (width === 1440 || width === 390) {
      // Full-page screenshots also show sections outside the current scroll animation range.
      await page.addStyleTag({
        content:
          "[data-motion-item]{opacity:1!important;transform:none!important}",
      });
      await page.screenshot({
        path: new URL(`portfolio-${width}.png`, artifacts).pathname.replace(
          /^\/(?=[A-Za-z]:)/,
          "",
        ),
        fullPage: true,
      });
      await page.screenshot({
        path: new URL(`hero-${width}.png`, artifacts).pathname.replace(
          /^\/(?=[A-Za-z]:)/,
          "",
        ),
      });
    }
    console.log(
      `${width}px: sections, folders, 3 vídeos, themes and no horizontal overflow OK`,
    );
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await page.goto(url);
  await page.locator("#hero-title").waitFor();
  assert.equal(
    await page.locator(".split-char").count(),
    0,
    "Reduced motion should leave hero text intact",
  );
  await page.close();
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log("Reduced motion and runtime errors: OK");
} finally {
  await browser.close();
}
