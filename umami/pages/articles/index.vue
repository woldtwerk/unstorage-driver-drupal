<script setup lang="ts">
import { NodeArticleTeaserSchema } from '~/schemas'

const { locale } = useI18n()

const { data: articles } = await useAsyncData(
  `${locale.value}:articles`,
  () => queryContent('node', 'article')
    .where({
      '_locale': locale.value,
      'attributes.status': { $eq: true },
    })
    .sort({
      'attributes.changed': 1,
      'attributes.drupal_internal__nid': 1,
    })
    .limit(9)
    .find(), {
    deep: false,
    watch: [locale],
    transform: articles => articles.map(article => NodeArticleTeaserSchema.parse(article)),
  })
</script>

<template>
  <div class="views-element-container">
    <div class="grid--3">
      <div class="view-content">
        <div v-for="article in articles" :key="article.id" class="views-row">
          <NodeArticleTeaser v-bind="article" />
        </div>
      </div>
    </div>
  </div>
</template>
