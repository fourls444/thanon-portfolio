import type { APIRoute } from "astro";
import { projects } from "../data/projects";

export const GET: APIRoute = ({ site }) => {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const root = new URL(baseUrl, site ?? "https://fourls444.github.io");
  const urls = ["", ...projects.map((project) => `projects/${project.slug}/`)];
  const entries = urls.map((path) => `<url><loc>${new URL(path, root).href}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
