declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs: BreadcrumbInterface[]
    blockLayout: Record<string, {
      id: string
    } | {
      component: ReturnType<typeof resolveComponent>
    }>[]
  }
}

export interface BreadcrumbInterface {
  text: string
  attributes?: Record<string, string>
  to?: string
}

export interface LinksetItem {
  anchor: string
  item: {
    href: string
    title: string
    hierarchy: string[]
    'machine-name': string[]
  }[]
}

export interface Linkset {
  linkset: LinksetItem[]
}
