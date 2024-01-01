declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const error = useError()

  if (error.value && 'statusCode' in error.value) {
    if (error.value.statusCode === 404) {
      to.meta.title = 'Page not found'
      to.meta.breadcrumbs.push({
        text: 'Page not found',
      })
    }
    else {
      to.meta.title = 'Internal server error'
      to.meta.breadcrumbs.push({
        text: error.value.message,
      })
    }
  }
})
