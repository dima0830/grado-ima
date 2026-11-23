import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  // en GitHub Pages la tarjeta vive en /grado-ima/
  base: process.env.GITHUB_ACTIONS === "true" ? "/grado-ima/" : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
