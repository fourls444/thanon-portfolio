# Midnight Cobalt Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the static portfolio with verified contact information, Thai-first bilingual content, a Midnight Cobalt visual system, locally hosted WebP technology icons, and a smaller client bundle.

**Architecture:** Keep Astro as the static rendering layer and Lenis as the only animation runtime that needs to ship. Store profile, bilingual copy, and technology metadata in focused TypeScript data modules; render both language strings into semantic Astro markup and use one small progressive-enhancement controller to select `TH` or `EN`. Replace the three React islands with Astro/CSS/vanilla JavaScript so the page retains its visual behavior without React, Motion, or Lucide client code.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Lenis, CSS animations, browser `localStorage`, local WebP assets, Node test runner

---

## File structure

- Create `src/data/content.ts`: typed Thai and English portfolio copy.
- Create `src/data/tech.ts`: technology groups, labels, and optional local icon paths.
- Create `src/components/HeroBackground.astro`: static aurora markup.
- Create `src/components/CursorGlow.astro`: decorative markup plus a requestAnimationFrame pointer controller.
- Create `public/icons/*.webp`: optimized transparent brand icons.
- Modify `src/data/profile.ts`: verified identity and contact links.
- Modify `src/layouts/Layout.astro`: exact metadata, Thai default, saved-language bootstrap, language controller, and cursor component.
- Modify all section components: bilingual semantic content and updated contact/stack rendering.
- Modify `src/styles/global.css`: Midnight Cobalt tokens, language visibility, stack icons, language control, and optimized motion.
- Modify `src/pages/index.astro`: unchanged section order; no Projects UI.
- Modify `README.md`: separate Thai and English documentation.
- Modify `astro.config.mjs`, `package.json`, and `package-lock.json`: remove unused React integrations and runtime packages.
- Delete `src/components/react/HeroBackground.tsx`, `src/components/react/TechMarquee.tsx`, and `src/components/react/CursorGlow.tsx` after their Astro replacements pass tests.
- Modify `tests/portfolio.test.mjs`: regression coverage for metadata, bilingual behavior, contacts, local icons, palette, and static-first architecture.

### Task 1: Lock the refreshed requirements into tests

**Files:**
- Modify: `tests/portfolio.test.mjs`

- [ ] **Step 1: Add failing metadata and public-profile tests**

Append tests that require the exact title and verified profile fields:

```js
test("portfolio metadata and public contact details are current", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const profile = await read("src/data/profile.ts");

  assert.match(layout, /title\s*=\s*["']Thanon Portfolio["']/);
  assert.match(layout, /<html\s+lang=["']th["']/);
  assert.match(profile, /name:\s*["']Thanon Macharoen["']/);
  assert.match(profile, /thanon\.macharoen@gmail\.com/);
  assert.match(profile, /github\.com\/fourls444/);
  assert.match(profile, /linkedin\.com\/in\/thanon-macharoen/);
});
```

- [ ] **Step 2: Add failing bilingual and icon tests**

```js
test("Thai-first bilingual content uses a persistent accessible switch", async () => {
  const layout = await read("src/layouts/Layout.astro");
  const navbar = await read("src/components/Navbar.astro");
  const content = await read("src/data/content.ts");

  assert.match(content, /th:\s*{/);
  assert.match(content, /en:\s*{/);
  assert.match(navbar, /data-language-switch/);
  assert.match(navbar, /data-language=["']th["']/);
  assert.match(navbar, /data-language=["']en["']/);
  assert.match(layout, /localStorage/);
  assert.match(layout, /document\.documentElement\.lang/);
});

test("technology cards use local WebP brand assets", async () => {
  const stack = await read("src/components/TechStack.astro");
  const tech = await read("src/data/tech.ts");

  assert.match(stack, /width=["']40["']/);
  assert.match(stack, /height=["']40["']/);
  assert.match(stack, /decoding=["']async["']/);
  assert.match(tech, /\/icons\/[a-z0-9-]+\.webp/);
  assert.doesNotMatch(stack, /https?:\/\//);
});
```

- [ ] **Step 3: Add failing static-first and palette tests**

```js
test("decorative interactions do not require React islands", async () => {
  const config = await read("astro.config.mjs");
  const hero = await read("src/components/Hero.astro");
  const stack = await read("src/components/TechStack.astro");
  const layout = await read("src/layouts/Layout.astro");

  assert.doesNotMatch(config, /@astrojs\/react/);
  assert.doesNotMatch(`${hero}${stack}${layout}`, /client:(load|visible|idle)/);
});

test("Midnight Cobalt palette contains no violet accent", async () => {
  const css = await read("src/styles/global.css");
  assert.match(css, /--bg:\s*oklch\(/);
  assert.match(css, /--cobalt:\s*oklch\(/);
  assert.doesNotMatch(css, /--violet/);
});
```

- [ ] **Step 4: Run tests and verify the new tests fail for missing implementation**

Run: `npm test`

Expected: existing tests pass; new tests fail because `content.ts`, `tech.ts`, the updated title, language controller, WebP markup, and static-first architecture do not exist yet.

- [ ] **Step 5: Commit the regression tests**

```bash
git add tests/portfolio.test.mjs
git commit -m "test: cover bilingual portfolio refresh"
```

### Task 2: Add verified profile data and bilingual copy

**Files:**
- Create: `src/data/content.ts`
- Modify: `src/data/profile.ts`

- [ ] **Step 1: Update the public profile object**

Replace `src/data/profile.ts` with:

```ts
export const profile = {
  name: "Thanon Macharoen",
  shortName: "Thanon",
  email: "thanon.macharoen@gmail.com",
  github: "https://github.com/fourls444",
  linkedin: "https://www.linkedin.com/in/thanon-macharoen/",
  location: "Bangkok, Thailand",
} as const;
```

- [ ] **Step 2: Create the typed Thai-first content module**

Create `src/data/content.ts` with a `Language = "th" | "en"` type and matching `th` and `en` objects. Include complete strings for:

```ts
export const content = {
  th: {
    nav: { about: "เกี่ยวกับ", skills: "ทักษะ", education: "การศึกษา", contact: "ติดต่อ" },
    hero: {
      kicker: "วิทยาการคอมพิวเตอร์ · การพัฒนาซอฟต์แวร์",
      greeting: "สวัสดี ผม Thanon",
      role: "นักพัฒนาซอฟต์แวร์",
      copy: "มุ่งเน้นการพัฒนาเว็บสมัยใหม่ และชอบสร้างประสบการณ์ดิจิทัลที่สะอาด รองรับทุกหน้าจอ และใช้งานได้อย่างลื่นไหล",
      aboutCta: "เกี่ยวกับผม",
      explore: "เลื่อนเพื่อสำรวจ",
    },
    about: {
      label: "01 / เกี่ยวกับ",
      title: "เรียนรู้ด้วยความสงสัย\nลงมือทำอย่างเป็นระบบ",
      lead: "ผมเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่มหาวิทยาลัยรังสิต และสนใจงานพัฒนาเว็บกับซอฟต์แวร์",
      body: "ผมชอบเปลี่ยนแนวคิดให้เป็นผลิตภัณฑ์ดิจิทัลที่ใช้งานได้จริง ตั้งแต่ส่วนติดต่อผู้ใช้ แอปมือถือ ระบบเบื้องหลัง ไปจนถึงข้อมูล",
    },
    skills: {
      label: "02 / เทคโนโลยี",
      title: "เครื่องมือที่ผมใช้สร้างงาน",
      copy: "ชุดเครื่องมือจากประสบการณ์ด้านเว็บ โมบาย แบ็กเอนด์ ข้อมูล และ Java",
    },
    education: {
      label: "03 / การศึกษาและกิจกรรม",
      title: "เรียนรู้ แล้วนำไปลงมือทำ",
      degree: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
      present: "ปัจจุบัน",
      education: "การศึกษา",
      achievement: "รางวัล",
      activity: "กิจกรรม",
      runnerUp: "รางวัลรองชนะเลิศอันดับ 2",
      workshop: "เวิร์กช็อป",
      participant: "เข้าร่วมเวิร์กช็อปสำหรับนักพัฒนา",
    },
    contact: {
      label: "04 / ติดต่อ",
      eyebrow: "มีไอเดียหรือโอกาสที่อยากพูดคุยไหม",
      title: "มาสร้างสิ่งที่\nมีความหมายไปด้วยกัน",
      copy: "ผมเปิดรับการเรียนรู้ การร่วมงาน และการพูดคุยเกี่ยวกับผลิตภัณฑ์ดิจิทัลที่เป็นประโยชน์เสมอ",
      cta: "ติดต่อผม",
    },
    footer: { built: "ออกแบบและพัฒนาด้วย Astro", top: "กลับด้านบน" },
    controls: { pause: "หยุดการเคลื่อนไหว", play: "เล่นการเคลื่อนไหว", menuOpen: "เปิดเมนู", menuClose: "ปิดเมนู" },
  },
  en: {
    nav: { about: "About", skills: "Skills", education: "Education", contact: "Contact" },
    hero: {
      kicker: "Computer Science · Software Development",
      greeting: "Hi, I'm Thanon",
      role: "Software Developer",
      copy: "Focused on modern web development. I enjoy building clean, responsive, and interactive digital experiences.",
      aboutCta: "About me",
      explore: "Scroll to explore",
    },
    about: {
      label: "01 / About",
      title: "Curious by nature\nPractical by design",
      lead: "I'm a Computer Science student at Rangsit University with a growing focus on web and software development.",
      body: "I like turning ideas into dependable digital products, from interfaces and mobile experiences to backend systems and data.",
    },
    skills: {
      label: "02 / Tech Stack",
      title: "Tools I build with",
      copy: "A practical toolkit shaped by web, mobile, backend, data, and Java projects.",
    },
    education: {
      label: "03 / Education & Activities",
      title: "Learning, then doing",
      degree: "Bachelor of Science in Computer Science",
      present: "Present",
      education: "Education",
      achievement: "Achievement",
      activity: "Activity",
      runnerUp: "Second runner-up",
      workshop: "Workshop",
      participant: "Developer workshop participant",
    },
    contact: {
      label: "04 / Contact",
      eyebrow: "Have an idea or opportunity?",
      title: "Let's build something\nmeaningful",
      copy: "I'm always open to learning, collaborating, and talking about useful digital products.",
      cta: "Get in touch",
    },
    footer: { built: "Designed and built with Astro", top: "Back to top" },
    controls: { pause: "Pause motion", play: "Play motion", menuOpen: "Open menu", menuClose: "Close menu" },
  },
} as const;

export type Language = keyof typeof content;
```

- [ ] **Step 3: Run focused tests**

Run: `npm test`

Expected: profile assertions and `content.ts` existence pass; UI assertions remain failing.

- [ ] **Step 4: Commit data changes**

```bash
git add src/data/profile.ts src/data/content.ts
git commit -m "feat: add verified bilingual portfolio content"
```

### Task 3: Implement Thai-first language switching and metadata

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Navbar.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Set static metadata and Thai default before paint**

In `Layout.astro`, use `title = "Thanon Portfolio"`, set `<html lang="th" data-language="th">`, update `theme-color`, and place an inline head script that accepts only `th` or `en` from `localStorage`:

```html
<script is:inline>
  try {
    const saved = localStorage.getItem("portfolio-language");
    const language = saved === "en" ? "en" : "th";
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
  } catch {}
</script>
```

Use a base-safe favicon URL by normalizing the slash rather than concatenating `thanon-portfoliofavicon.svg`.

- [ ] **Step 2: Render bilingual navigation and the language control**

Import `content` in `Navbar.astro`; render each label through a helper pattern:

```astro
<span data-lang-content="th">{content.th.nav.about}</span>
<span data-lang-content="en">{content.en.nav.about}</span>
```

Add:

```astro
<div class="language-switch" role="group" aria-label="เลือกภาษา / Choose language" data-language-switch>
  <button type="button" data-language="th" aria-pressed="true">TH</button>
  <span aria-hidden="true">/</span>
  <button type="button" data-language="en" aria-pressed="false">EN</button>
</div>
```

- [ ] **Step 3: Add one language controller in Layout**

Implement `applyLanguage(language, persist)` to set `html.dataset.language`, `html.lang`, every switch button's `aria-pressed`, and translated `aria-label`/text values marked with `data-label-th` and `data-label-en`. Persist only explicit button choices with `localStorage.setItem("portfolio-language", language)`.

- [ ] **Step 4: Add no-JavaScript-safe visibility styles**

```css
[data-lang-content="en"] { display: none; }

html[data-language="en"] [data-lang-content="th"] { display: none; }
html[data-language="en"] [data-lang-content="en"] { display: contents; }
html[data-language="th"] [data-lang-content="th"] { display: contents; }
```

Style `.language-switch` as a compact rectangular control matching the navbar, with a visible `aria-pressed="true"` cobalt state and 44px minimum button targets on narrow screens.

- [ ] **Step 5: Run tests and Astro type checking**

Run: `npm test && npm run build`

Expected: bilingual controller and metadata tests pass; build completes without Astro or TypeScript errors.

- [ ] **Step 6: Commit language infrastructure**

```bash
git add src/layouts/Layout.astro src/components/Navbar.astro src/styles/global.css
git commit -m "feat: add Thai-first language switch"
```

### Task 4: Convert decorative React islands to static Astro

**Files:**
- Create: `src/components/HeroBackground.astro`
- Create: `src/components/CursorGlow.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/layouts/Layout.astro`
- Delete: `src/components/react/HeroBackground.tsx`
- Delete: `src/components/react/CursorGlow.tsx`

- [ ] **Step 1: Replace the static hero island**

Create `HeroBackground.astro` with static grid, three cobalt/blue aurora layers, and vignette markup. Import it from `Hero.astro` without a `client:*` directive.

- [ ] **Step 2: Replace Motion cursor tracking with requestAnimationFrame**

Create `CursorGlow.astro` containing `<div class="cursor-glow" aria-hidden="true" data-cursor-glow></div>` and a script that:

```ts
const glow = document.querySelector<HTMLElement>("[data-cursor-glow]");
const finePointer = matchMedia("(pointer: fine)");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let frame = 0;
let x = -400;
let y = -400;

const render = () => {
  frame = 0;
  glow?.style.setProperty("--cursor-x", `${x - 180}px`);
  glow?.style.setProperty("--cursor-y", `${y - 180}px`);
  glow?.classList.add("is-visible");
};

if (glow && finePointer.matches && !reduceMotion.matches) {
  addEventListener("pointermove", (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!frame) frame = requestAnimationFrame(render);
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => glow.classList.remove("is-visible"));
}
```

Use `transform: translate3d(var(--cursor-x), var(--cursor-y), 0)` and opacity transitions in CSS.

- [ ] **Step 3: Update imports and remove superseded React files**

Render `<CursorGlow />` directly from `Layout.astro`, then delete both old TSX components. Do not touch `projects.ts`.

- [ ] **Step 4: Run tests and production build**

Run: `npm test && npm run build`

Expected: static island assertions move toward passing; page builds and no TSX import errors remain.

- [ ] **Step 5: Commit the static conversion**

```bash
git add src/components/HeroBackground.astro src/components/CursorGlow.astro src/components/Hero.astro src/layouts/Layout.astro src/styles/global.css
git rm src/components/react/HeroBackground.tsx src/components/react/CursorGlow.tsx
git commit -m "perf: replace decorative React islands"
```

### Task 5: Add optimized local WebP technology assets and static cards

**Files:**
- Create: `src/data/tech.ts`
- Create: `public/icons/*.webp`
- Modify: `src/components/TechStack.astro`
- Modify: `src/styles/global.css`
- Delete: `src/components/react/TechMarquee.tsx`

- [ ] **Step 1: Define technology metadata**

Create six groups in `src/data/tech.ts`: Frontend, Backend & Database, Mobile, Data, Java, and Other. Each item has `name` and optional `icon`, for example:

```ts
export type TechItem = { name: string; icon?: `/icons/${string}.webp` };
export type TechGroup = { title: string; titleTh: string; items: TechItem[] };

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    titleTh: "ส่วนติดต่อผู้ใช้",
    items: [
      { name: "HTML5", icon: "/icons/html5.webp" },
      { name: "CSS3", icon: "/icons/css3.webp" },
      { name: "JavaScript", icon: "/icons/javascript.webp" },
      { name: "TypeScript", icon: "/icons/typescript.webp" },
      { name: "React", icon: "/icons/react.webp" },
      { name: "Next.js", icon: "/icons/nextjs.webp" },
      { name: "Astro", icon: "/icons/astro.webp" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.webp" },
    ],
  },
  {
    title: "Backend & Database",
    titleTh: "แบ็กเอนด์และฐานข้อมูล",
    items: [
      { name: "Node.js", icon: "/icons/nodejs.webp" },
      { name: "Express", icon: "/icons/express.webp" },
      { name: "REST API" },
      { name: "PostgreSQL", icon: "/icons/postgresql.webp" },
      { name: "MySQL", icon: "/icons/mysql.webp" },
      { name: "Supabase", icon: "/icons/supabase.webp" },
      { name: "Drizzle ORM", icon: "/icons/drizzle.webp" },
    ],
  },
  {
    title: "Mobile",
    titleTh: "โมบาย",
    items: [
      { name: "Flutter", icon: "/icons/flutter.webp" },
      { name: "Dart", icon: "/icons/dart.webp" },
      { name: "API Integration" },
    ],
  },
  {
    title: "Data",
    titleTh: "ข้อมูล",
    items: [
      { name: "Python", icon: "/icons/python.webp" },
      { name: "Jupyter Notebook", icon: "/icons/jupyter.webp" },
      { name: "Pandas", icon: "/icons/pandas.webp" },
      { name: "Seaborn", icon: "/icons/seaborn.webp" },
      { name: "CSV / Data Visualization" },
    ],
  },
  {
    title: "Java",
    titleTh: "Java",
    items: [
      { name: "Java", icon: "/icons/java.webp" },
      { name: "Object-Oriented Programming" },
      { name: "Algorithms" },
    ],
  },
  {
    title: "Other",
    titleTh: "อื่น ๆ",
    items: [
      { name: "LINE OA", icon: "/icons/line.webp" },
      { name: "LINE Messaging API", icon: "/icons/line.webp" },
      { name: "Firebase", icon: "/icons/firebase.webp" },
      { name: "Dialogflow", icon: "/icons/dialogflow.webp" },
      { name: "Solidity", icon: "/icons/solidity.webp" },
      { name: "Image Processing" },
      { name: "Git", icon: "/icons/git.webp" },
      { name: "GitHub", icon: "/icons/github.webp" },
      { name: "Vercel", icon: "/icons/vercel.webp" },
    ],
  },
];
```

Conceptual entries such as REST API, API Integration, OOP, Algorithms, CSV/Data Visualization, and Image Processing deliberately omit `icon` and use text chips.

- [ ] **Step 2: Produce local transparent WebP assets**

Use verified official project brand assets as source material, convert each to a transparent 96x96 WebP, and retain only final `.webp` files. Create icons for all concrete branded technologies in `tech.ts`; do not use guessed logos or remote image URLs. Confirm each file is non-empty and under 20 KB where practical.

Run verification:

```powershell
Get-ChildItem public/icons/*.webp | Select-Object Name, Length
```

Expected: every path referenced by `tech.ts` exists; no zero-byte files; no source SVGs or temporary conversion files remain under `public/`.

- [ ] **Step 3: Render static icon cards**

Rewrite `TechStack.astro` to map over `techGroups`. For items with an icon, normalize the Astro base path and render:

```astro
<img
  src={`${import.meta.env.BASE_URL}${item.icon.replace(/^\//, "")}`}
  alt=""
  width="40"
  height="40"
  loading="lazy"
  decoding="async"
/>
<span>{item.name}</span>
```

Use an ordinary `<article>` and CSS `transform: translateY(-5px)` hover instead of Motion. Preserve the infinite marquee with CSS only and render its repeated labels from `techGroups`.

- [ ] **Step 4: Delete the React marquee**

Delete `src/components/react/TechMarquee.tsx` after `TechStack.astro` has no import from it.

- [ ] **Step 5: Run tests and production build**

Run: `npm test && npm run build`

Expected: local WebP, dimensions, and no-remote-image assertions pass; Astro emits the stack without a hydrated island.

- [ ] **Step 6: Commit stack assets and rendering**

```bash
git add public/icons src/data/tech.ts src/components/TechStack.astro src/styles/global.css
git rm src/components/react/TechMarquee.tsx
git commit -m "feat: add local WebP technology icons"
```

### Task 6: Apply bilingual copy across all sections

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/About.astro`
- Modify: `src/components/TechStack.astro`
- Modify: `src/components/Education.astro`
- Modify: `src/components/Contact.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Render Thai and English hero copy**

Import `content` and `profile`; use paired `data-lang-content` spans for kicker, greeting, role, paragraph, CTA, and scroll label. Keep `GitHub` unchanged. Use `profile.shortName` in both greetings.

- [ ] **Step 2: Render bilingual About and Tech supporting copy**

Use the same paired-span pattern for labels, headings, paragraphs, and group titles. Keep technology names untranslated.

- [ ] **Step 3: Render bilingual Education and Activities**

Translate category labels, degree, present state, achievement title, and workshop description. Keep `Rangsit University`, `Thai AI Ethics Awareness`, and `LINE Dev Camp` as proper nouns.

- [ ] **Step 4: Render bilingual Contact and add LinkedIn**

Use `profile.email`, `profile.github`, and `profile.linkedin`. Keep email as the main CTA and render GitHub and LinkedIn as separate external links with `target="_blank" rel="noreferrer"`.

- [ ] **Step 5: Render bilingual Footer and motion controls**

Translate footer copy, back-to-top text, motion button state, menu labels, skip link, and meaningful accessibility labels via the language controller's `data-label-th`/`data-label-en` hooks.

- [ ] **Step 6: Run tests and production build**

Run: `npm test && npm run build`

Expected: all content compiles; Thai is present by default; link assertions and existing V1 section-order assertions pass.

- [ ] **Step 7: Commit bilingual component copy**

```bash
git add src/components src/layouts/Layout.astro src/styles/global.css
git commit -m "feat: localize portfolio content in Thai and English"
```

### Task 7: Apply the Midnight Cobalt visual system

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Replace color tokens with OKLCH Midnight Cobalt values**

Use a restrained committed-blue palette:

```css
:root {
  color-scheme: dark;
  --bg: oklch(0.145 0.025 258);
  --bg-deep: oklch(0.105 0.02 258);
  --bg-soft: oklch(0.19 0.03 258);
  --surface: oklch(0.225 0.035 258 / 0.72);
  --surface-solid: oklch(0.225 0.035 258);
  --text: oklch(0.965 0.012 245);
  --muted: oklch(0.75 0.03 248);
  --faint: oklch(0.57 0.035 250);
  --line: oklch(0.75 0.05 250 / 0.13);
  --line-strong: oklch(0.8 0.06 248 / 0.24);
  --cobalt: oklch(0.65 0.19 258);
  --ice: oklch(0.86 0.09 233);
  --blue: oklch(0.72 0.14 244);
}
```

Replace all `--cyan` uses with the role-appropriate `--ice` or `--cobalt`, replace purple aurora/contact/marquee treatments with cobalt and deep blue, and remove every `--violet` reference.

- [ ] **Step 2: Remove expensive blur from text entrance animation**

Animate only `opacity` and `transform` in `hero-enter`; preserve the existing stagger timings. Keep aurora blur but reduce mobile layer size/opacity and hide the least important third layer below 720px.

- [ ] **Step 3: Reduce scroll handler work**

Wrap navbar scrolled-state updates in one requestAnimationFrame guard so rapid scroll events do not write classes repeatedly.

- [ ] **Step 4: Verify contrast and reduced motion manually**

Run: `npm run dev`

Check desktop and a 390px viewport: body copy remains readable; focus rings are visible; TH/EN controls do not shift navigation; reduced motion disables smooth scrolling and decorative motion; brand-color icons remain legible against surfaces.

- [ ] **Step 5: Run automated verification**

Run: `npm test && npm run build`

Expected: all tests pass; production CSS contains Midnight Cobalt tokens and no violet variable.

- [ ] **Step 6: Commit visual and motion updates**

```bash
git add src/styles/global.css src/layouts/Layout.astro src/components/Navbar.astro
git commit -m "style: apply Midnight Cobalt visual system"
```

### Task 8: Remove unused runtime dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Confirm no React, Motion, or Lucide source imports remain**

Run:

```powershell
rg -n "react|motion/react|lucide-react|client:(load|visible|idle)" src astro.config.mjs
```

Expected: no matches requiring these packages.

- [ ] **Step 2: Remove the Astro React integration and packages**

Remove `react()` and its import from `astro.config.mjs`. Run:

```powershell
npm uninstall @astrojs/react react react-dom motion lucide-react @types/react @types/react-dom
```

This updates both `package.json` and `package-lock.json`; keep Astro, TypeScript, Tailwind CSS, Lenis, and the existing Linux WASM peer dependencies.

- [ ] **Step 3: Verify a clean dependency install and build**

Run: `npm ci && npm test && npm run build`

Expected: installation succeeds; all tests pass; Astro check and static build pass.

- [ ] **Step 4: Compare emitted JavaScript**

Run:

```powershell
Get-ChildItem dist/_astro/*.js | Sort-Object Length -Descending | Select-Object Name, Length
```

Expected: no React/Motion proxy or island chunks; remaining JavaScript is limited to Lenis and small site controllers.

- [ ] **Step 5: Commit dependency cleanup**

```bash
git add package.json package-lock.json astro.config.mjs
git commit -m "perf: remove unused React and Motion runtime"
```

### Task 9: Rewrite bilingual repository documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README with separated Thai and English sections**

Document:

- `Thanon Portfolio` and the deployed URL `https://fourls444.github.io/thanon-portfolio/`
- V1 sections and TH/EN language behavior
- Astro, TypeScript, Tailwind CSS, Lenis, local WebP icons, and GitHub Pages
- `npm ci`, `npm run dev`, `npm test`, `npm run build`, and `npm run preview`
- Automatic deployment after pushes to `main`
- Content sources: `src/data/profile.ts`, `src/data/content.ts`, and `src/data/tech.ts`
- V2 plans for Featured Projects, Other Projects, project data, and richer project animations

The Thai section appears first; the English section repeats the same operational information rather than mixing languages line by line.

- [ ] **Step 2: Check README for stale placeholders and obsolete dependencies**

Run:

```powershell
rg -n "your-|<github-username>|React islands|Motion|Lucide" README.md
```

Expected: no matches.

- [ ] **Step 3: Commit documentation**

```bash
git add README.md
git commit -m "docs: refresh bilingual portfolio README"
```

### Task 10: Final verification and cleanup

**Files:**
- Verify all changed files
- Preserve: `src/data/projects.ts`

- [ ] **Step 1: Run the complete verification suite**

Run: `npm ci && npm test && npm run build`

Expected: clean install succeeds, all Node tests pass, `astro check` reports no errors, and Astro emits a static `dist/` site.

- [ ] **Step 2: Inspect generated HTML for GitHub Pages paths**

Run:

```powershell
rg -n "thanon-portfolio/(favicon|icons)|Thanon Portfolio|data-language-switch" dist/index.html
```

Expected: favicon and icons contain `/thanon-portfolio/`; title is exact; language control is rendered.

- [ ] **Step 3: Verify no placeholder content, remote icon URLs, or React islands remain**

Run:

```powershell
rg -n "your-email|your-github|client:(load|visible|idle)|https?://.*(svg|png|webp)" src README.md
```

Expected: no placeholder, island, or remote-image matches. GitHub and LinkedIn links are allowed external links but must not be image sources.

- [ ] **Step 4: Check worktree scope**

Run: `git status --short && git diff --check`

Expected: only intentional implementation changes are present and no whitespace errors are reported.

- [ ] **Step 5: Perform a final browser smoke test**

Run: `npm run preview`

Verify Thai first render, persisted EN selection after reload, mobile menu and language control, all contact links, icon loading, reduced motion, keyboard navigation, and the exact browser tab title.

- [ ] **Step 6: Commit any final test-only corrections**

If verification required a scoped correction, commit only those files with a message describing the correction. If no correction was needed, do not create an empty commit.
