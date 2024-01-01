import en from '~/assets/translations/drupal-10.1.6.en.json'
import es from '~/assets//translations/drupal-10.1.6.es.json'

export default defineI18nConfig(() => ({
  locale: 'en',
  legacy: false,
  globalInjection: true,
  /**
   * json files are not tree-shakeable.
   */
  messages: {
    en,
    es,
  },
}))
