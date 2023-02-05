// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Trello - Nuxt 3',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    defaultProvider: 'Github',
    enableGlobalAppMiddleware: true,
  },
  runtimeConfig: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
});
