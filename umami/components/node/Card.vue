<script setup lang="ts">
export interface Props {
  id: string
  title: string
  cta: string
  media?: {
    type: string
    id: string
  }
  href: string
  promote?: boolean
  viewMode?: 'alt'
}

defineProps<Props>()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()
</script>

<template>
  <article
    class="node view-mode-card node--view-mode-card node--view-mode-card-common"
    :class="{
      'node--promoted': promote,
      'node--view-mode-card-common-alt': viewMode === 'alt',
    }"
  >
    <h2 class="node__title">
      <span class="field field--name-title field--type-string field--label-hidden">
        {{ title }}
      </span>
    </h2>

    <DefineTemplate>
      <div class="read-more">
        <slot name="cta" :cta="cta">
          <NuxtLink class="read-more__link" :href="href">
            {{ cta }}
            <span class="visually-hidden"> - <span
              class="field field--name-title field--type-string field--label-hidden"
            >{{ title }}</span>
            </span>
          </NuxtLink>
        </slot>
      </div>
    </DefineTemplate>

    <ReuseTemplate v-if="promote" />

    <div class="node__content">
      <slot name="content" :media="media">
        <div v-if="media" class="field field--name-field-media-image field--type-entity-reference field--label-hidden field__item">
          <MediaImage v-bind="media" />
        </div>
      </slot>
    </div>

    <ReuseTemplate v-if="!promote" />
  </article>
</template>
