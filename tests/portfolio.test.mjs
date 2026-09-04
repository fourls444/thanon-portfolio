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

test("GitHub Pages workflow uses the current Node runtime action versions", async () => {
  const workflow = await read(".github/workflows/deploy.yml");

  assert.match(workflow, /actions\/checkout@v6/);
  assert.match(workflow, /actions\/setup-node@v6/);
  assert.match(workflow, /node-version:\s*24/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
});

test("the npm lockfile includes Linux WASM peer dependencies", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const lockfile = JSON.parse(await read("package-lock.json"));

  assert.equal(packageJson.devDependencies["@emnapi/core"], "^1.11.3");
  assert.equal(packageJson.devDependencies["@emnapi/runtime"], "^1.11.3");
  assert.equal(lockfile.packages["node_modules/@emnapi/core"].version, "1.11.3");
  assert.equal(lockfile.packages["node_modules/@emnapi/runtime"].version, "1.11.3");
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

test("portfolio metadata and public contact details are current", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const profile = await read("src/data/profile.ts");

  assert.match(layout, /\btitle\s*=\s*["']Thanon Portfolio["']/);
  assert.match(layout, /<html\s+[^>]*lang=["']th["']/i);
  assert.match(profile, /\bname\s*:\s*["']Thanon Macharoen["']/);
  assert.match(profile, /\bemail\s*:\s*["']thanon\.macharoen@gmail\.com["']/);
  assert.match(profile, /\bgithub\s*:\s*["']https?:\/\/github\.com\/fourls444\/?["']/);
  assert.match(
    profile,
    /\blinkedin\s*:\s*["']https?:\/\/(?:www\.)?linkedin\.com\/in\/thanon-macharoen\/?["']/,
  );
});

test("Thai-first bilingual content uses a persistent accessible switch", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const navbar = await read("src/components/Navbar.astro");
  const content = await read("src/data/content.ts");
  const languageUi = `${layout}\n${navbar}`;

  assert.match(content, /\bth\s*:\s*\{/);
  assert.match(content, /\ben\s*:\s*\{/);
  assert.match(languageUi, /data-language-switch/);
  assert.match(navbar, /<button\b(?=[^>]*\bdata-language=["']th["'])[^>]*>[\s\S]*?<\/button>/i);
  assert.match(navbar, /<button\b(?=[^>]*\bdata-language=["']en["'])[^>]*>[\s\S]*?<\/button>/i);
  assert.match(navbar, /aria-pressed/);
  assert.match(languageUi, /localStorage/);
  assert.match(languageUi, /document\.documentElement\.lang/);
});

test("technology cards use local WebP brand assets", async () => {
  const techStack = await read("src/components/TechStack.astro");
  const tech = await read("src/data/tech.ts");
  const technologySources = `${techStack}\n${tech}`;

  assert.match(techStack, /\bwidth\s*=\s*(?:["']40["']|\{40\})/);
  assert.match(techStack, /\bheight\s*=\s*(?:["']40["']|\{40\})/);
  assert.match(techStack, /\bdecoding\s*=\s*["']async["']/);
  assert.match(tech, /\b(?:icon|image|src)\s*:\s*["']\/icons\/[^"']+\.webp["']/i);
  assert.doesNotMatch(
    technologySources,
    /\b(?:icon|image|src)\s*(?:=|:)\s*(?:["']|\{\s*["'])https?:\/\//i,
  );
});

test("decorative interactions do not require React islands", async () => {
  const config = await read("astro.config.mjs");
  const hero = await read("src/components/Hero.astro");
  const techStack = await read("src/components/TechStack.astro");
  const layout = await read("src/layouts/Layout.astro");
  const implementation = `${config}\n${hero}\n${techStack}\n${layout}`;

  assert.doesNotMatch(config, /@astrojs\/react/);
  assert.doesNotMatch(implementation, /client:(?:load|visible|idle)\b/);
});

test("Midnight Cobalt palette contains no violet accent", async () => {
  const css = await read("src/styles/global.css");

  assert.match(css, /--bg\s*:\s*oklch\(/);
  assert.match(css, /--cobalt\s*:\s*oklch\(/);
  assert.doesNotMatch(css, /--violet\b/);
});
