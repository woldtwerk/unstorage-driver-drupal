<script setup lang="ts">
import { NodeArticleTeaserSchema } from '~/schemas'

interface Props {
  locale: string
  id: string
}

const props = defineProps<Props>()

const { data } = await useAsyncData(
  `${props.locale}:related-articles:${props.id}`,
  () => queryContent('node', 'article')
    .where({
      '_locale': props.locale,
      'id': { $ne: props.id },
      'attributes.status': { $eq: true },
    })
    .sort({ 'attributes.changed': -1 })
    .sort({ 'attributes.drupal_internal__nid': 1 })
    .limit(3)
    .find(), {
    transform: articles => articles.map(article => NodeArticleTeaserSchema.parse(article)),
  },
)
</script>

<template>
  <div v-if="data?.length">
    <h2 class="block__title">
      {{ $t('More featured articles', 1, { locale }) }}
    </h2>
    <div>
      <div class="view view-articles-aside">
        <div class="view-content">
          <div v-for="article in data" :key="article.id" class="views-row">
            <NodeArticleTeaser v-bind="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
