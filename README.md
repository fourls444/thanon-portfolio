# Thanon Portfolio

[View the live site](https://fourls444.github.io/thanon-portfolio/)

A static personal portfolio for Thanon, built with a midnight blue theme and English content.

## V1 content

V1 includes Navbar, About Me, Tech Stack, Featured Projects, and Contact. The current featured project is TogetherSpace.

## Site stack

The site runs on Astro, TypeScript, Lenis, and custom CSS/vanilla JavaScript. Technology icons are stored locally as WebP assets, and the site deploys to GitHub Pages through GitHub Actions.

The local technology marks are derived from verified Devicon and Simple Icons sources. All trademarks remain with their respective owners. Technologies shown in the portfolio represent Thanon's skills and are not runtime dependencies of this site.

## Development

Prerequisites: Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Preview the production output:

```sh
npm run preview
```

## Updating content

- `src/data/profile.ts` for profile, education, and contact details
- `src/data/tech.ts` for the technology list
- `src/data/projects.ts` for featured project data
- `public/icons/` for local WebP technology icons

## Deployment

Set the repository's `Settings > Pages` source to `GitHub Actions`. Every push or merge to `main` runs `.github/workflows/deploy.yml`, builds the static site, and deploys `dist` automatically.

The repository base path is `/thanon-portfolio`, so the expected URL is `https://<github-username>.github.io/thanon-portfolio/`. Contact links use `mailto:` and `tel:`; no server runtime is required.

## V2 roadmap

V2 may add Other Projects, richer project animation, and project detail pages.
