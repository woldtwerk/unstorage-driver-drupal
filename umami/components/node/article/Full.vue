<script setup lang="ts">
import type { NodeArticleFullInterface } from '~/schemas'

const { pageProps } = defineProps<{
  pageProps: NodeArticleFullInterface
}>()

definePageMeta({
  layout: false,
  hideTitle: true,
})

const date = new Date(pageProps.changed).toLocaleDateString(pageProps.locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <NuxtLayout name="two-column">
    <template #aside>
      <BlockRelatedArticles
        v-bind="{
          locale: pageProps.locale,
          id: pageProps.id,
        }"
      />
    </template>

    <article class="node node--type-article node--promoted node--view-mode-full">
      <header class="node__header">
        <h1 class="page-title">
          <span class="field field--name-title field--type-string field--label-hidden">{{ pageProps.title }}</span>
        </h1>
      </header>

      <footer class="node__meta">
        <div class="node__submitted">
          <span class="by-author">by <UserLabel v-if="pageProps.user" v-bind="pageProps.user" /></span>
          {{ date }}
        </div>
      </footer>

      <div class="node__content">
        <div class="layout layout--onecol">
          <div class="layout__region layout__region--content">
            <div class="block block-layout-builder block-field-blocknodearticlefield-tags">
              <div
                class="label-items field field--name-field-tags field--type-entity-reference field--label-inline clearfix"
              >
                <div class="field__label">
                  Tags
                </div>
                <div class="field__items">
                  <TaxonomyTermLabel
                    v-for="tag in pageProps.tags"
                    :key="tag.id"
                    v-bind="tag"
                    :locale="pageProps.locale"
                  />
                </div>
              </div>
            </div>
            <div v-if="pageProps.media" class="block block-layout-builder block-field-blocknodearticlefield-media-image">
              <div
                class="field field--name-field-media-image field--type-entity-reference field--label-hidden field__item"
              >
                <MediaImage v-bind="pageProps.media" />
              </div>
            </div>
            <div v-html="pageProps.body" />
          </div>
        </div>
      </div>
    </article>
  </NuxtLayout>
</template>
