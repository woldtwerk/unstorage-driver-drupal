export default defineNuxtRouteMiddleware((to) => {
  const { $i18n: { t, defaultLocale } } = useNuxtApp()
  const toLocale = to.fullPath.match(/^\/(\w\w)\//)?.[1] || defaultLocale

  to.meta.breadcrumbs ??= []

  if (to.fullPath.match(/\/recipes($|\/)/)) {
    to.meta.title = t('Recipes', 1, { locale: toLocale })
    to.meta.breadcrumbs.push({
      text: t('Recipes', 1, { locale: toLocale }),
      to: '/recipes',
    })
  }

  if (to.fullPath.match(/\/articles($|\/)/)) {
    to.meta.title = t('Articles', 1, { locale: toLocale })
    to.meta.breadcrumbs.push({
      text: t('Articles', 1, { locale: toLocale }),
      to: '/articles',
    })
  }

  const matched = to.matched.at(0)

  const props = matched?.props?.default?.pageProps
  if (props) {
    to.meta.breadcrumbs.push({
      text: props.title,
    })
  }
})
