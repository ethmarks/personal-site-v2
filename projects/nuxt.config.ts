// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: true,
  nitro: {
    preset: "static",
  },

  app: {
    baseURL: "/projects/",
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("eth-"),
    },
  },

  experimental: {
    viewTransition: true,
  },

  css: ["~/assets/css/main.css", "~/assets/css/content.css"],
  modules: ["nuxt-shiki"],
  shiki: {
    bundledLangs: ["bash", "javascript", "dotenv"],
    defaultTheme: "github-dark",
  },
});
