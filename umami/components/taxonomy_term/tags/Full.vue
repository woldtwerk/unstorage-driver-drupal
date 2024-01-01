<script setup lang="ts">
import type { TaxonomyTermShortInterface } from '~/schemas'

const { pageProps } = defineProps<{
  pageProps: TaxonomyTermShortInterface
}>()

const localePath = useLocalePath()

const { data } = await useAsyncData(
  `${pageProps.locale}:term:${pageProps.id}`,
  () => queryContent('node')
    .where({
      '_locale': pageProps.locale,
      'attributes.status': { $eq: true },
    })
    .sort({ 'attributes.changed': 1 })
    .find(),
  {
    deep: false,
    transform: nodes => nodes
      .filter(node => node.relationships?.field_tags?.data?.some((tag: any) => tag.id === pageProps.id))
      .map(node => ({
        id: node.id,
        title: node.attributes.title,
        type: node.type,
        media: {
          type: node.relationships.field_media_image.data.type,
          id: node.relationships.field_media_image.data.id,
        },
        href: localePath(node.attributes.path.alias),
      })),
  },
)

function getComponent(type: string) {
  if (type === 'node--article')
    return resolveComponent('NodeArticleTeaser')
  if (type === 'node--recipe')
    return resolveComponent('NodeRecipeTeaser')
  return resolveComponent('NodeCard')
}
</script>

<template>
  <div class="views-element-container">
    <div class="grid--3">
      <div class="view-content">
        <div v-for="node in data" :key="node.id" class="views-row">
          <component v-bind="node" :is="getComponent(node.type)" />
        </div>
      </div>
    </div>
  </div>
</template>
