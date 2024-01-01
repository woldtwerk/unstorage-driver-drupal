<script setup lang="ts">
import { NodeRecipeTeaserSchema } from '~/schemas'

const { locale } = useI18n()
const { data: recipes } = await useAsyncData(
  `${locale.value}:recipes`,
  () => queryContent('node', 'recipe')
    .where({
      '_locale': locale.value,
      'attributes.status': { $eq: true },
    })
    .sort({
      'attributes.changed': 1,
      'attributes.drupal_internal__nid': 1,
    })
    .limit(12)
    .find(), {
    deep: false,
    watch: [locale],
    transform: recipes => recipes.map(recipe => NodeRecipeTeaserSchema.parse(recipe)),
  })

definePageMeta({
  blockLayout: {
    bannerTop: [
      {
        id: '4c7d58a3-a45d-412d-9068-259c57e40541',
      },
    ],
  },
})
</script>

<template>
  <div>
    <div class="grid--3">
      <div class="view-content">
        <div v-for="recipe in recipes" :key="recipe.id" class="views-row">
          <NodeRecipeTeaser v-bind="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>
