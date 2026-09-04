# Midnight Cobalt Portfolio Refresh

## Goal

Refresh the V1 portfolio so its public information matches Thanon Macharoen's current GitHub profile README, while giving the site a blue-black nighttime identity and keeping it fast and suitable for GitHub Pages.

## Confirmed public information

- Name: Thanon Macharoen
- GitHub: https://github.com/fourls444
- Email: thanon.macharoen@gmail.com
- LinkedIn: https://www.linkedin.com/in/thanon-macharoen/
- Location: Bangkok, Thailand
- Areas of interest: full-stack, backend, mobile, data analysis, and Java development

Only public information confirmed on the GitHub profile and its README will be added. Repository counts, followers, and other frequently changing GitHub statistics will not be copied into the portfolio.

## Metadata and project README

- Set the browser tab title and Open Graph title to `Thanon Portfolio`.
- Keep the existing concise portfolio description for search and link previews, updating it only where needed to match the confirmed profile information.
- Rewrite the repository `README.md` with clearly separated Thai and English sections describing the current portfolio, its stack, local development commands, production verification, GitHub Pages deployment, content update locations, and V2 project roadmap.
- Replace placeholder GitHub and email values in the site data with the confirmed links above, and add LinkedIn as a first-class contact link.

## Language experience

- Provide a compact `TH / EN` language switch in the navigation.
- Thai is the default language on a visitor's first visit.
- Display one language at a time rather than placing duplicate Thai and English paragraphs beside each other.
- Translate the navigation, hero, about, tech-stack supporting copy, education and activities, contact section, footer, motion controls, and accessibility labels.
- Keep technology names, proper nouns, email addresses, and URLs unchanged where translation would reduce clarity.
- Store the visitor's explicit language choice in `localStorage` and restore it on later visits.
- Update the document `lang` attribute whenever the language changes.
- Ensure the default Thai content remains visible without JavaScript. The switch enhances the page but must not leave the page blank if scripting is unavailable.
- Keep all bilingual content in a small local data structure or semantic HTML attributes. Do not add an internationalization dependency or server-side locale routing.

## Visual direction

The selected direction is **Midnight Cobalt**: a quiet blue-black night scene with cobalt illumination rather than a neon cyberpunk look.

- Use blue-tinted near-black backgrounds instead of pure black.
- Use cobalt blue as the primary accent and pale ice blue for high-contrast highlights.
- Remove the current violet accent from the aurora, text emphasis, marquee markers, and contact treatment.
- Keep text slightly blue-tinted rather than pure white.
- Preserve the current page structure, spacing rhythm, subtle grid, aurora movement, reveal animation, and accessible reduced-motion behavior.
- Keep accent use controlled so the content remains readable and professional.
- Update the browser theme color to match the new background.

## Tech stack content

The visible stack will be updated from the current GitHub profile README while retaining Astro because it is the framework used by this portfolio.

- Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Astro, Tailwind CSS
- Backend and database: Node.js, Express, REST API, PostgreSQL, MySQL, Supabase, Drizzle ORM
- Mobile: Flutter, Dart, API Integration
- Data: Python, Jupyter Notebook, Pandas, Seaborn, CSV/Data Visualization
- Java: Java, Object-Oriented Programming, Algorithms
- Other: LINE OA, LINE Messaging API, Firebase, Dialogflow, Solidity, Image Processing, Git, GitHub, Vercel

The section may use compact category groupings to prevent the longer list from becoming visually dense. No Projects section will be introduced in V1.

## Stack icon treatment

- Use local transparent WebP assets, not SVG files, remote badges, or an icon-font library.
- Display each technology in its recognizable official brand color.
- Store the optimized assets under `public/icons/` with predictable lowercase filenames.
- Use a consistent source canvas, approximately 96 by 96 pixels, and display icons at approximately 32 to 40 CSS pixels.
- Set explicit image width and height to prevent layout shift.
- Lazy-load icons below the initial viewport and decode them asynchronously.
- Use an accessible text label for every icon. If a reliable brand asset is unavailable for a conceptual item such as OOP or API Integration, use a lightweight text treatment instead of inventing a misleading logo.
- Do not add a runtime dependency for icons and do not depend on an external image service when visitors load the page.

## Contact section

- Keep email as the primary `mailto:` call to action.
- Show GitHub and LinkedIn as external links with safe link attributes.
- Retain the simple static implementation with no form or server runtime.

## Performance and accessibility constraints

- Do not add new runtime dependencies.
- Optimize all WebP icon assets before committing them.
- Preserve keyboard focus styles, semantic headings, descriptive links, and reduced-motion support.
- Make the language switch keyboard accessible, expose its current state to assistive technology, and avoid a flash of the wrong language when restoring a saved preference.
- Keep the site fully static and compatible with the existing GitHub Pages base path.
- Avoid changes to the planned but intentionally empty `src/data/projects.ts` file.
- Verify with the existing test suite and a production Astro build.

## Acceptance criteria

1. The browser tab reads `Thanon Portfolio`.
2. README documentation matches the current project and deployment flow.
3. GitHub, email, and LinkedIn links use the confirmed public values.
4. The site consistently uses a blue-black Midnight Cobalt palette with no remaining purple accent.
5. Tech categories reflect the current GitHub profile README and show locally hosted WebP brand icons where an appropriate logo exists.
6. Thai content is shown by default, and the `TH / EN` control switches all interface content without navigating away.
7. A visitor's explicit language selection persists locally, while the page remains usable without JavaScript.
8. The page remains responsive, accessible, static, and deployable through the existing GitHub Pages workflow.
9. Tests and the production build pass without adding runtime dependencies.
