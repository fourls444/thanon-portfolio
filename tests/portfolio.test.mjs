import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("home page composes the current portfolio sections in order", async () => {
  const page = await read("src/pages/index.astro");
  const sections = ["About", "TechStack", "FeaturedProjects", "Contact"];
  let previousIndex = -1;
  for (const section of sections) {
    const currentIndex = page.indexOf(`<${section}`);
    assert.ok(currentIndex > previousIndex, `${section} should appear in page order`);
    previousIndex = currentIndex;
  }
  assert.doesNotMatch(page, /<(?:Hero|Education|Footer)\b/);
});

test("GitHub Pages deployment uses the repository base path and current actions", async () => {
  const config = await read("astro.config.mjs");
  const workflow = await read(".github/workflows/deploy.yml");
  assert.match(config, /base:\s*["']\/thanon-portfolio["']/);
  assert.match(config, /output:\s*["']static["']/);
  assert.match(workflow, /actions\/checkout@v6/);
  assert.match(workflow, /actions\/setup-node@v6/);
  assert.match(workflow, /node-version:\s*24/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages/);
});

test("the npm lockfile includes Linux WASM peer dependencies", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const lockfile = JSON.parse(await read("package-lock.json"));
  assert.equal(packageJson.devDependencies["@emnapi/core"], "^1.11.3");
  assert.equal(packageJson.devDependencies["@emnapi/runtime"], "^1.11.3");
  assert.equal(lockfile.packages["node_modules/@emnapi/core"].version, "1.11.3");
  assert.equal(lockfile.packages["node_modules/@emnapi/runtime"].version, "1.11.3");
});

test("unused Tailwind build dependencies are removed", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const config = await read("astro.config.mjs");
  const css = await read("src/styles/global.css");
  assert.equal(packageJson.dependencies.tailwindcss, undefined);
  assert.equal(packageJson.dependencies["@tailwindcss/vite"], undefined);
  assert.doesNotMatch(config, /tailwindcss/i);
  assert.doesNotMatch(css, /@import\s+["']tailwindcss["']/i);
});

test("page metadata and public contact details are current", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const profile = await read("src/data/profile.ts");
  assert.match(layout, /title\s*=\s*["']Portfolio Thanon["']/);
  assert.match(layout, /<html\s+[^>]*lang=["']en["']/i);
  assert.match(layout, /rel=["']preconnect["'][^>]*raw\.githubusercontent\.com/i);
  assert.match(profile, /thaiName\s*:\s*["']ธนนท์ มาเจริญ["']/);
  assert.match(profile, /email\s*:\s*["']thanon\.macharoen@gmail\.com["']/);
  assert.match(profile, /phone\s*:\s*["']0971592941["']/);
  assert.match(profile, /github\s*:\s*["']https:\/\/github\.com\/fourls444["']/);
});

test("social preview metadata points to the dedicated absolute cover image", async () => {
  const config = await read("astro.config.mjs");
  const layout = await read("src/layouts/Layout.astro");
  const coverUrl = new URL("../public/og-cover.jpg", import.meta.url);
  const cover = await stat(coverUrl).catch(() => null);

  assert.match(config, /site:\s*["']https:\/\/fourls444\.github\.io["']/);
  assert.match(layout, /property=["']og:url["']/);
  assert.match(layout, /property=["']og:image["']/);
  assert.match(layout, /property=["']og:image:width["']\s+content=["']1200["']/);
  assert.match(layout, /property=["']og:image:height["']\s+content=["']630["']/);
  assert.match(layout, /property=["']og:image:type["']\s+content=["']image\/jpeg["']/);
  assert.match(layout, /name=["']twitter:card["']\s+content=["']summary_large_image["']/);
  assert.match(layout, /name=["']twitter:image["']/);
  assert.ok(cover?.isFile(), "public/og-cover.jpg should exist");
  assert.ok(cover && cover.size > 0, "public/og-cover.jpg should not be empty");
});

test("main landmark is the skip-link target", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const page = await read("src/pages/index.astro");
  assert.match(layout, /href=["']#main-content["']/);
  assert.match(page, /<main\b[^>]*id=["']main-content["']/i);
  assert.doesNotMatch(page, /<main[^>]*>\s*<div\s+id=["']main-content["']/i);
});

test("profile image reserves its real aspect ratio and status copy is not a live region", async () => {
  const about = await read("src/components/About.astro");
  assert.match(about, /<img\b[^>]*width=["']449["'][^>]*height=["']591["']/i);
  assert.doesNotMatch(about, /availability-badge[^>]*role=["']status["']/i);
});

test("technology cards use local WebP brand assets", async () => {
  const techStack = await read("src/components/TechStack.astro");
  const tech = await read("src/data/tech.ts");
  const iconDeclarations = [...tech.matchAll(/\bicon\s*:\s*(["'`])([^"'`]+)\1/g)];
  assert.ok(iconDeclarations.length > 0);
  for (const [, , iconPath] of iconDeclarations) {
    assert.match(iconPath, /^\/icons\/[^/]+\.webp$/i);
    const iconFile = await stat(new URL(`../public${iconPath}`, import.meta.url));
    assert.ok(iconFile.isFile());
    assert.ok(iconFile.size > 0);
  }
  assert.match(techStack, /class=["']tech-icon["']/);
  assert.match(techStack, /loading=["']lazy["']/);
  assert.match(techStack, /decoding=["']async["']/);
});

test("featured project exposes GitHub, live demo, and responsive media", async () => {
  const component = await read("src/components/FeaturedProjects.astro");
  const projects = await read("src/data/projects.ts");
  assert.match(projects, /title:\s*["']TogetherSpace["']/);
  assert.match(projects, /github:\s*["']https:\/\/github\.com\/fourls444\/togetherspace["']/);
  assert.match(projects, /live:\s*["']https:\/\/togetherspace\.vercel\.app["']/);
  assert.match(component, /loading=["']lazy["']/);
  assert.match(component, /decoding=["']async["']/);
});

test("motion progressively enhances the page and respects reduced motion", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const css = await read("src/styles/global.css");
  const packageJson = JSON.parse(await read("package.json"));
  assert.match(layout, /classList\.add\(["']js["']\)/);
  assert.match(layout, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /import\s*\{[^}]*animate[^}]*inView[^}]*stagger[^}]*\}\s*from\s*["']motion["']/s);
  assert.match(layout, /return\s*\(\)\s*=>\s*\{/);
  assert.match(layout, /animation\.stop\(\)/);
  assert.match(layout, /resetRevealItems/);
  assert.match(packageJson.dependencies.motion, /^\^?\d+/);
  assert.match(css, /\.js\s+\.reveal/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

test("each portfolio section has its own motion choreography", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const about = await read("src/components/About.astro");
  const techStack = await read("src/components/TechStack.astro");
  const projects = await read("src/components/FeaturedProjects.astro");
  const contact = await read("src/components/Contact.astro");

  assert.match(layout, /motionVariants/);
  assert.match(layout, /data-motion/);
  assert.match(layout, /clipPath/);
  assert.match(layout, /const observerTarget/);
  assert.match(layout, /item\.dataset\.motion === "clip-left"\s*\?\s*item\.parentElement/s);
  assert.match(about, /data-motion=["']from-left-scale["']/);
  assert.match(about, /data-motion=["']from-right["']/);
  assert.match(techStack, /data-motion=\{index % 2 === 0 \? "from-left" : "from-right"\}/);
  assert.match(techStack, /data-motion=["']pop["']/);
  assert.match(projects, /data-motion=["']clip-left["']/);
  assert.match(projects, /data-motion=["']from-right["']/);
  assert.match(contact, /data-motion=["']scale-up["']/);
  assert.match(contact, /data-motion=["']pop["']/);
});

test("direct section links never leave reveal content hidden", async () => {
  const layout = await read("src/layouts/Layout.astro");

  assert.match(layout, /initialTarget/);
  assert.match(layout, /window\.location\.hash/);
  assert.match(layout, /showRevealItems/);
});

test("responsive layout covers tablet, mobile, and narrow mobile", async () => {
  const css = await read("src/styles/global.css");
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /@media\s*\(max-width:\s*420px\)/);
  assert.match(css, /\.project-feature\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.contact-links\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /\.about-profile\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

test("minimal depth effects remain motion-safe", async () => {
  const css = await read("src/styles/global.css");
  assert.match(css, /\.section::before/);
  assert.match(css, /\.tech-card::before/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /transition:\s*all\b/i);
});

test("decorative interactions do not require React islands", async () => {
  const config = await read("astro.config.mjs");
  const sources = await Promise.all([
    "src/layouts/Layout.astro",
    "src/components/Navbar.astro",
    "src/components/CursorGlow.astro",
  ].map(read));
  assert.doesNotMatch(config, /@astrojs\/react/);
  assert.doesNotMatch(sources.join("\n"), /client:(?:load|visible|idle|media|only)\b/);
});

test("favicon uses the selected code document symbol and midnight blue palette", async () => {
  const favicon = await read("public/favicon.svg");
  assert.match(favicon, /data-icon=["']code-document["']/i);
  assert.match(favicon, /data-part=["']folded-corner["']/i);
  assert.match(favicon, /data-part=["']code-mark["']/i);
  assert.match(favicon, /#0b1224\b/i);
  assert.doesNotMatch(favicon, /\bviolet\b|#(?:7c3aed|a78bfa|b8a5ff)\b/i);
});
