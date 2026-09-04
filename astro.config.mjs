import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  base: "/thanon-portfolio",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
