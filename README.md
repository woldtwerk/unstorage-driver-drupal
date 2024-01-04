# Unstorage Driver Drupal

## Umami Demo

There is a [Nuxt 3 Umami Demo](https://umami.unstorage-driver-drupal.github.woldtwerk.de/en/recipes/vegan-chocolate-and-nut-brownies) in /umami.

## Setup

Make sure to install the dependencies:

```bash
pnpm add @woldtwerk/unstorage-driver-drupal
```

## Nuxt Content Usage

```ts
export default defineNuxtConfig({
  content: {
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
        localePrefix: false,
      },
    },
  },
})
```

## Usage

### Published Nodes

```ts
const { data: nodes } = await useAsyncData(
  () => queryContent('node')
    .where({
      'attributes.status': { $eq: true },
    })
    .find())
```

### Views Like Query

```ts
const { data } = await useAsyncData(
  () => queryContent('node', 'article')
    .where({
      '_locale': 'en',
      'id': { $ne: '568227cc-412a-407c-8651-1a43ebad260e' },
      'attributes.status': { $eq: true },
    })
    .sort({ 'attributes.changed': -1 })
    .sort({ 'attributes.drupal_internal__nid': 1 })
    .limit(3)
    .find(),
)
```

The [JSON:API Views](https://www.drupal.org/project/jsonapi_views) Module is not required. Nuxt Content queries are sufficient.

### Query by Path Alias and resolve Entity Reference Fields

```ts
// pages/recipes/[slug].vue
const route = useRoute()

const { data: recipe } = await useAsyncData(
  async () => {
    // Get the recipe node by path alias.
    const recipe = await queryContent('node', 'recipe')
      .where({
        'attributes.path.alias': { $eq: `/recipes/${route.params.slug}` },
        '_locale': 'en',
      })
      .findOne()

    // Get the referenced tags.
    const tags = (await queryContent('taxonomy_term', 'tags')
      .where({
        id: {
          $in: recipe.relationships.field_tags.data.map(tag => tag.id),
        },
      })
      .find())
      .map(tag => ({
        id: tag.id,
        title: tag.attributes.name,
        href: tag.attributes.path.alias,
      }))

    // Get the referenced categories.
    const categories = (await queryContent('taxonomy_term')
      .where({
        id: {
          $in: recipe.relationships.field_recipe_category.data.map(tag => tag.id),
        },
      })
      .find())
      .map(tag => ({
        id: tag.id,
        title: tag.attributes.name,
        href: tag.attributes.path.alias,
      }))

    return {
      id: recipe.id,
      title: recipe.attributes.title,
      categories,
      tags,
    }
  },
)
```
