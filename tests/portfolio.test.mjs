import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("home page composes every V1 portfolio section in order", async () => {
  const page = await read("src/pages/index.astro");
  const sections = ["Hero", "About", "TechStack", "Education", "Contact"];

  let previousIndex = -1;
  for (const section of sections) {
    const currentIndex = page.indexOf(`<${section}`);
    assert.ok(currentIndex > previousIndex, `${section} should appear in page order`);
    previousIndex = currentIndex;
  }
});

test("GitHub Pages deployment uses the repository base path", async () => {
  const config = await read("astro.config.mjs");
  const workflow = await read(".github/workflows/deploy.yml");

  assert.match(config, /base:\s*["']\/thanon-portfolio["']/);
  assert.match(workflow, /actions\/deploy-pages/);
});

test("the V1 build keeps project data ready without rendering a projects section", async () => {
  const projects = await read("src/data/projects.ts");
  const page = await read("src/pages/index.astro");

  assert.match(projects, /export const projects\s*=\s*\[\]/);
  assert.doesNotMatch(page, /<Projects/);
});

test("global styles include reduced-motion and visible keyboard focus support", async () => {
  const css = await read("src/styles/global.css");

  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

test("reveals use progressive enhancement and autoplay motion can be paused", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const css = await read("src/styles/global.css");

  assert.match(layout, /classList\.add\(["']js["']\)/);
  assert.match(layout, /data-motion-toggle/);
  assert.match(css, /\.js\s+\.reveal/);
  assert.match(css, /\.motion-paused\s+\.aurora/);
});
