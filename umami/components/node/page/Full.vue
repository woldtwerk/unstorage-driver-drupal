<script setup lang="ts">
import type { NodePageFullInterface } from '~/schemas'

const { pageProps } = defineProps<{
  pageProps: NodePageFullInterface
}>()

definePageMeta({
  hideTitle: true,
})
</script>

<template>
  <article class="node node--type-page node--view-mode-full">
    <header class="node__header">
      <h1 class="page-title">
        <span class="field field--name-title field--type-string field--label-hidden">
          {{ pageProps.title }}
        </span>
      </h1>
    </header>

    <div class="node__content">
      <LayoutOneColumn>
        <div class="block block-layout-builder block-field-blocknodepagebody">
          <div class="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item" v-html="pageProps.body" />
        </div>
      </LayoutOneColumn>
    </div>
  </article>
</template>
