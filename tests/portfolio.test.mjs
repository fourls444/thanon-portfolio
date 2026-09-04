import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const readSourceFiles = async (directory) => {
  const entries = await readdir(new URL(`../${directory}/`, import.meta.url), { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return readSourceFiles(path);
      if (!/\.(?:astro|tsx|jsx)$/i.test(path)) return [];
      return [{ path, source: await read(path) }];
    }),
  );

  return files.flat();
};

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
  assert.match(profile, /\bgithub\s*:\s*["']https:\/\/github\.com\/fourls444["']/);
  assert.match(profile, /\blinkedin\s*:\s*["']https:\/\/www\.linkedin\.com\/in\/thanon-macharoen\/["']/);
});

test("Thai-first bilingual content uses a persistent accessible switch", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const navbar = await read("src/components/Navbar.astro");
  const content = await read("src/data/content.ts");
  const languageUi = `${layout}\n${navbar}`;
  const scripts = [...languageUi.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(
    ([, script]) => script,
  );
  const languageClickScripts = scripts.filter(
    (script) => /addEventListener\(\s*["']click["']/.test(script) && /data-language/.test(script),
  );
  const languageBehavior = languageClickScripts.join("\n");
  const startupBehavior = scripts.join("\n");

  assert.match(content, /\bth\s*:\s*\{/);
  assert.match(content, /\ben\s*:\s*\{/);
  assert.match(languageUi, /data-language-switch/);
  assert.match(navbar, /<button\b(?=[^>]*\bdata-language=["']th["'])[^>]*>[\s\S]*?<\/button>/i);
  assert.match(navbar, /<button\b(?=[^>]*\bdata-language=["']en["'])[^>]*>[\s\S]*?<\/button>/i);
  assert.ok(languageClickScripts.length > 0, "a click path should handle data-language controls");
  assert.match(
    languageBehavior,
    /(?:\.dataset\.language\b|getAttribute\(\s*["']data-language["']\s*\))/,
  );
  assert.match(languageBehavior, /document\.documentElement\.(?:lang|dataset\.language)\s*=/);
  assert.match(
    languageBehavior,
    /setAttribute\(\s*["']aria-pressed["']\s*,[^;]*(?:===|==)[^;]*\)/,
  );
  assert.match(languageBehavior, /localStorage\.setItem\(/);
  assert.match(startupBehavior, /localStorage\.getItem\(/);
});

test("technology cards use local WebP brand assets", async () => {
  const techStack = await read("src/components/TechStack.astro");
  const tech = await read("src/data/tech.ts");
  const technologySources = `${techStack}\n${tech}`;
  const iconFields = [...tech.matchAll(/(?:\bicon|["']icon["'])\s*:/g)];
  const iconDeclarations = [
    ...tech.matchAll(/(?:\bicon|["']icon["'])\s*:\s*(["'`])([^"'`]+)\1/g),
  ];

  assert.ok(iconFields.length > 0, "technology metadata should declare icon paths");
  assert.equal(iconDeclarations.length, iconFields.length, "every icon should be a static path literal");
  for (const [, , iconPath] of iconDeclarations) {
    assert.match(iconPath, /^\/icons\/[^/]+\.webp$/i);
    const iconFile = await stat(new URL(`../public${iconPath}`, import.meta.url));
    assert.ok(iconFile.isFile(), `${iconPath} should reference a file`);
    assert.ok(iconFile.size > 0, `${iconPath} should not be empty`);
  }

  const techIconImages = [...techStack.matchAll(/<img\b[^>]*>/gi)]
    .map(([image]) => image)
    .filter((image) =>
      /\bclass\s*=\s*(?:["'][^"']*\btech-icon\b[^"']*["']|\{\s*["'][^"']*\btech-icon\b[^"']*["']\s*\})/i.test(
        image,
      ),
    );
  assert.ok(techIconImages.length > 0, "technology images should use the tech-icon class");

  const itemMapping = techStack.match(
    /\bitems\s*\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)/,
  );
  assert.ok(itemMapping, "TechStack should map each technology item");
  const itemName = itemMapping[1];
  const derivedIcon = techStack.match(
    new RegExp(
      String.raw`\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=[^;\n]*\b${itemName}\.icon\b`,
      "i",
    ),
  )?.[1];
  const directIconSource = new RegExp(
    String.raw`\bsrc\s*=\s*\{\s*${itemName}\.icon\s*\}`,
    "i",
  );
  const derivedIconSource = derivedIcon
    ? new RegExp(String.raw`\bsrc\s*=\s*\{\s*${derivedIcon}\s*\}`, "i")
    : null;
  assert.ok(
    techIconImages.some(
      (image) => directIconSource.test(image) || derivedIconSource?.test(image),
    ),
    "a tech-icon image should bind its src to the mapped item's icon",
  );

  for (const image of techIconImages) {
    assert.match(image, /\bwidth\s*=\s*(?:["']40["']|\{\s*40\s*\})/i);
    assert.match(image, /\bheight\s*=\s*(?:["']40["']|\{\s*40\s*\})/i);
    assert.match(image, /\bdecoding\s*=\s*(?:["']async["']|\{\s*["']async["']\s*\})/i);
  }
  assert.doesNotMatch(
    technologySources,
    /\b(?:icon|image|src)\s*(?:=|:)\s*(?:["']|\{\s*["'])https?:\/\//i,
  );
});

test("decorative interactions do not require React islands", async () => {
  const config = await read("astro.config.mjs");
  const sourceFiles = await readSourceFiles("src");
  const hydratedFiles = sourceFiles
    .filter(({ source }) => /client:(?:load|visible|idle|media|only)\b/.test(source))
    .map(({ path }) => path);

  assert.doesNotMatch(config, /@astrojs\/react/);
  assert.deepEqual(hydratedFiles, [], `hydration directives found in: ${hydratedFiles.join(", ")}`);
});

test("Midnight Cobalt palette contains no violet accent", async () => {
  const css = await read("src/styles/global.css");

  assert.match(css, /--bg\s*:\s*oklch\(0\.145\s+0\.025\s+258\)\s*;/);
  assert.match(css, /--cobalt\s*:\s*oklch\(0\.65\s+0\.19\s+258\)\s*;/);
  assert.doesNotMatch(
    css,
    /(?:--violet\b|\bviolet\b|#(?:7c3aed|b8a5ff)\b|rgba?\(\s*124\s*,\s*58\s*,\s*237\b)/i,
  );
});

test("mobile navigation remains useful without JavaScript and enhances when JavaScript loads", async () => {
  const css = await read("src/styles/global.css");
  const navbar = await read("src/components/Navbar.astro");
  const mobileStart = css.search(/@media\s*\(\s*max-width\s*:\s*720px\s*\)/i);
  const nextMedia = css.indexOf("\n@media", mobileStart + 1);
  const mobileCss = css.slice(mobileStart, nextMedia === -1 ? undefined : nextMedia);
  const declarationsFor = (selector) => {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return mobileCss.match(new RegExp(`(?:^|})\\s*${escapedSelector}\\s*\\{([^}]*)\\}`, "m"))?.[1] ?? "";
  };

  assert.ok(mobileStart >= 0, "mobile navigation rules should exist at the 720px breakpoint");
  assert.match(css, /\.menu-toggle\s*\{[^}]*display\s*:\s*none\b[^}]*}/i);
  assert.match(declarationsFor(".nav-links"), /flex-wrap\s*:\s*wrap\b/i);
  assert.doesNotMatch(declarationsFor(".nav-links"), /position\s*:\s*absolute|visibility\s*:\s*hidden|opacity\s*:\s*0\b/i);
  assert.match(declarationsFor(".js .menu-toggle"), /display\s*:\s*block\b/i);
  assert.match(declarationsFor(".js .nav-links"), /position\s*:\s*absolute/i);
  assert.match(declarationsFor(".js .nav-links"), /visibility\s*:\s*hidden/i);
  assert.match(declarationsFor(".js .nav-links"), /opacity\s*:\s*0\b/i);
  assert.match(declarationsFor(".js .nav-links.is-open"), /visibility\s*:\s*visible/i);
  assert.match(declarationsFor(".js .nav-links.is-open"), /opacity\s*:\s*1\b/i);
  assert.match(navbar, /links\.map\([\s\S]*href=\{link\.href\}[\s\S]*data-lang-content=["']th["']/i);
});

test("favicon uses only the Midnight Cobalt palette", async () => {
  const favicon = await read("public/favicon.svg");

  assert.match(favicon, /#070b17\b/i);
  assert.doesNotMatch(favicon, /#(?:090a0f|a78bfa|7c3aed|b8a5ff)\b|\bviolet\b/i);
});
