<script setup lang="ts">
import { NodeArticleTeaserSchema } from '~/schemas'

const { locale } = useI18n()
const { data: articles } = await useAsyncData(
  `${locale.value}:block:promoted-articles`,
  () => queryContent('node', 'article')
    .where({
      '_locale': locale.value,
      'attributes.status': { $eq: true },
      'attributes.promote': true,
    })
    .sort({
      'attributes.changed': 1,
      'attributes.drupal_internal__nid': 1,
    })
    .limit(3)
    .find(), {
    watch: [locale],
    transform: articles => articles.map(article => NodeArticleTeaserSchema.parse(article)),
  })

const first = computed(() => articles.value?.[0])
const rest = computed(() => articles.value?.slice(1))
</script>

<template>
  <div v-if="first" class="views-element-container block block-views block-views-blockpromoted-items-block-1">
    <div>
      <div class="container view-promoted-items--single view view-promoted-items view-id-promoted_items">
        <div class="view-content">
          <div class="views-row">
            <NodeArticleTeaser v-bind="first" :promote="true" />
          </div>
        </div>

        <div class="attachment attachment-after">
          <div class="views-element-container">
            <div class="view-promoted-items--double view view-promoted-items view-id-promoted_items">
              <div class="view-content">
                <div
                  v-for="article in rest"
                  :key="article.id"
                  class="views-row"
                >
                  <NodeArticleTeaser v-bind="article" :promote="true" view-mode="alt" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
