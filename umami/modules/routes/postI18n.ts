import { createResolver, defineNuxtModule } from 'nuxt/kit'
import type { NuxtPage } from 'nuxt/schema'
import {
  NodeArticleFullSchema,
  NodePageFullSchema,
  NodeRecipeFullSchema,
  TaxonomyTermShortSchema,
} from '../../schemas'
import { normalizePath } from '../../utils/string'

export interface DrupalStorageFileInterface {
  id: string
  type: string
  attributes: {
    path?: {
      alias: string
    }
    langcode: string
  } & Record<string, unknown>
}

/**
 * Seems to be easier to add routes manually for i18n language switching.
 */
export default defineNuxtModule({
  meta: {
    name: 'postI18n',
  },
  setup(options, nuxt) {
    const drupalRoutes: NuxtPage[] = []
    const { resolve } = createResolver(import.meta.url)

    nuxt.hooks.hook('nitro:init', async (nitro) => {
      const storage = nitro.storage.getMount('content:source:drupal')
      const keys = await storage.driver.getKeys('', {})
      for (const key of keys) {
        const file = await storage.driver.getItem(key) as DrupalStorageFileInterface

        if (!file)
          continue

        const [type] = file.type.split('--')

        // only nodes and taxonomy terms
        if ([
          'node',
          'taxonomy_term',
        ].includes(type) === false)
          continue

        const langcode = file.attributes?.langcode || 'en'

        drupalRoutes.push(
          ...(langcode === 'en' ? [generatePage(file, true)] : []),
          generatePage(file),
        )
      }
    })

    function generatePage(file: DrupalStorageFileInterface, isDefault = false): NuxtPage & {
      props?: {
        pageProps: Record<string, unknown>
      }
    } {
      const [type, bundle] = file.type.split('--')
      const id = file.attributes.drupal_internal__nid || file.attributes.drupal_internal__tid
      const langcode = file.attributes?.langcode || 'en'
      const alias = file.attributes.path?.alias && `${isDefault ? '' : `/${langcode}`}${normalizePath(file.attributes.path.alias)}`
      const path = `${isDefault ? '' : `/${langcode}`}/${type.replaceAll('_', '/')}/${id}`
      const pathUuid = `${isDefault ? '' : `/${langcode}`}/${type.replaceAll('_', '/')}/${bundle}/${file.id}`

      /**
       * Putting everything in props will bloat your entry bundle.
       * Would be better to fetch the data in the component.
       * But for now, this is the easiest way to get it working.
       */
      const props = {
        ...(bundle === 'article' && NodeArticleFullSchema.parse(file)),
        ...(bundle === 'recipe' && NodeRecipeFullSchema.parse(file)),
        ...(bundle === 'page' && NodePageFullSchema.parse(file)),
        ...(type === 'taxonomy_term' && TaxonomyTermShortSchema.parse(file)),
      }

      return isDefault
        ? {
            name: `${type}-${id}___${langcode}___default`,
            path: alias || path,
            redirect: `/${langcode}${alias || path}`,
          }
        : {
            name: `${type}-${id}___${langcode}`,
            path: alias || path,
            file: resolve(`../../components/${type}/${bundle}/Full.vue`),
            alias: [
              ...(alias ? [path, pathUuid] : []),
            ],
            meta: {
              title: file.attributes.title || file.attributes.name,
            },
            props: {
              pageProps: props,
            },
          }
    }

    nuxt.hook('pages:extend', (routes) => {
      routes.push(...drupalRoutes)
    })
  },
})
