<script setup lang="ts">
import { NodeRecipeTeaserSchema } from '~/schemas'

interface Props {
  locale: string
  id: string
}

const props = defineProps<Props>()

const { data } = await useAsyncData(
  `${props.locale}:related-articles:${props.id}`,
  () => queryContent('node', 'recipe')
    .where({
      '_locale': props.locale,
      'id': { $ne: props.id },
      'attributes.status': { $eq: true },
    })
    .sort({ 'attributes.changed': -1 })
    .sort({ 'attributes.drupal_internal__nid': 1 })
    .limit(4)
    .find(), {
    transform: recipes => recipes.map(recipe => NodeRecipeTeaserSchema.parse(recipe)),
  },
)
</script>

<template>
  <div
    v-if="data?.length"
    class="views-element-container block block-views block-views-blockrelated-recipes-related-recipes-block"
  >
    <h2 class="block__title">
      {{ $t('Related Recipes') }}
    </h2>
    <div class="grid--4 view view-related-recipes view-id-related_recipes view-display-id-related_recipes_block">
      <div class="view-content">
        <div v-for="recipe in data" :key="recipe.id" class="views-row">
          <NodeRecipeTeaser v-bind="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>
