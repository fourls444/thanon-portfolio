# Thanon Portfolio

A static personal portfolio built with Astro, React islands, TypeScript, Tailwind CSS, Motion, Lenis, and Lucide icons.

## Before publishing

Update the GitHub URL and email address in `src/data/profile.ts`:

```ts
export const profile = {
  name: "Thanon",
  email: "you@example.com",
  github: "https://github.com/your-username",
} as const;
```

The project is configured for the repository name `thanon-portfolio` through Astro's `/thanon-portfolio` base path.

## Development

```sh
npm install
npm run dev
```

## Verify a production build

```sh
npm test
npm run build
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `thanon-portfolio`.
2. Add it as the `origin` remote and push the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. The included workflow builds and publishes the static `dist` output after each push to `main`.

The published URL will use this format:

```text
https://<github-username>.github.io/thanon-portfolio/
```

Project data is intentionally empty in V1. The `src/data/projects.ts` file is ready for the future Projects section.
