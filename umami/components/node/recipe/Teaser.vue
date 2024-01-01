<script setup lang="ts">
export interface Props {
  id: string
  title: string
  media?: {
    type: string
    id: string
  }
  href: string
  difficulty?: string
  promote?: boolean
  viewMode?: 'alt'
  locale: string
}

const props = defineProps<Props>()
</script>

<template>
  <NodeCard v-bind="props" :cta="`${$t('view', 1, { locale })} ${$t('Recipe', 1, { locale })}`" class="node--type-recipe">
    <template #content>
      <div v-if="difficulty" class="label-items field field--name-field-difficulty field--type-list-string field--label-inline clearfix">
        <div class="field__label">
          {{ $t('Difficulty') }}
        </div>
        <div class="field__item">
          {{ $t(capitalizeFirstLetter(difficulty)) }}
        </div>
      </div>
      <div v-if="media" class="field field--name-field-media-image field--type-entity-reference field--label-hidden field__item">
        <MediaImage v-bind="media" />
      </div>
    </template>
  </NodeCard>
</template>
