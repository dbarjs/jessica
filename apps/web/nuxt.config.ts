// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
  ],
  colorMode: {
    preference: 'dark',
  },
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },
  components: [{
    path: '~/components',
  }, {
    path: '~/components/common',
    pathPrefix: false,
  }],
  // PWA
  pwa: {

  },
  // Fonts
  fontMetrics: {
    fonts: ['DM Sans'],
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [300, 400, 500, 600, 700],
    },
  },
  devtools: {
    enabled: true,
  },
})
