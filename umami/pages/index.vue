<script setup lang="ts">
import { NodeRecipeTeaserSchema } from '~/schemas'

const { locale } = useI18n()
const { data: recipes } = await useAsyncData(
  `${locale.value}:frontpage-recipes`,
  () => queryContent('node', 'recipe')
    .where({
      '_locale': locale.value,
      'attributes.status': { $eq: true },
      'attributes.promote': true,
    })
    .sort({
      'attributes.changed': 1,
      'attributes.drupal_internal__nid': 1,
    })
    .limit(4)
    .find(), {
    watch: [locale],
    deep: false,
    transform: recipes => recipes.map(recipe => NodeRecipeTeaserSchema.parse(recipe)),
  })

useHead({
  bodyAttrs: {
    class: 'path-frontpage',
  },
})

definePageMeta({
  blockLayout: {
    bannerTop: markRaw([
      {
        id: '9aadf4a1-ded6-4017-a10d-a5e043396edf',
      },
      {
        component: resolveComponent('BlockPromoted'),
      },
    ]),
  },
})
</script>

<template>
  <div class="views-element-container">
    <div class="grid--2 view view-frontpage view-id-frontpage view-display-id-page_1">
      <div class="view-header">
        <p class="text-align-center">
          {{ $t('Explore recipes across every type of occasion, ingredient, and skill level') }}
        </p>
      </div>
      <div class="view-content">
        <div
          v-for="recipe in recipes"
          :key="recipe.id"
          class="views-row"
        >
          <NodeRecipeTeaser v-bind="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>
