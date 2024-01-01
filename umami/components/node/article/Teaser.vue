<script setup lang="ts">
export interface Props {
  id: string
  title: string
  media?: {
    type: string
    id: string
  }
  href: string
  promote?: boolean
  viewMode?: 'alt'
  locale: string
}

const props = defineProps<Props>()
</script>

<template>
  <NodeCard v-bind="props" :cta="`${$t('view', 1, { locale })} ${$t('Article', 1, { locale })}`" class="node--type-article" />
</template>
