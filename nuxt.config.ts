// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'initial-scale=1',
      title: 'Trello - Nuxt 3',
      meta: [{ name: 'description', content: 'Trello with Nuxt 3' }],
      link: [{ rel: 'icon', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  typescript: {
    strict: true,
  },
  // @ts-ignore
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    manifest: {
      name: 'Trello Clone',
      short_name: 'trello_clone',
      theme_color: '#000000',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },
});
