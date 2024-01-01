// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: '/unstorage-driver-drupal/',
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    './modules/routes/postI18n',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  i18n: {
    strategy: 'prefix_and_default',
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
      },
      {
        code: 'es',
        name: 'Español',
        iso: 'es-ES',
      },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },
  image: {
    format: ['webp'],
  },
  css: [
    'assets/css/drupal.css',
    'assets/css/umami.css',
  ],
  experimental: {
    asyncEntry: true,
    componentIslands: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  ssr: true,
  content: {
    experimental: {
      clientDB: true,
      search: {
        indexed: true,
        options: {
          idField: 'id',
          fields: [
            'title', 'content', 'titles',
          ],
          storeFields: [
            'title', 'content', 'titles',
          ],
          searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: {
              title: 4,
              titles: 2,
            },
          },
        },
      },
    },
    locales: [
      'en',
      'es',
    ],
    defaultLocale: 'en',
    sources: {
      drupal: {
        driver: '@woldtwerk/unstorage-driver-drupal',
        drupalUrl: 'http://localhost:3001',
        locales: ['es', 'en'],
      },
    },
  },
})
