import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE_PATH || "",
  build: {
    outDir: "dist" + (process.env.BASE_PATH || ""),
  },
});
