<script setup lang="ts">
interface Props {
  id: string
}

const props = defineProps<Props>()

const { locale } = useI18n()

const { data } = await useAsyncData(
  `${locale.value}:block:${props.id}`,
  () => queryContent('block_content', 'banner_block')
    .where({
      _locale: locale.value,
      id: props.id,
    })
    .findOne(), {
    watch: [locale],
    transform: data => ({
      title: data.attributes.field_title,
      summary: data.attributes.field_summary,
      cta: {
        href: data.attributes.field_content_link.uri.replace(/^internal:/, ''),
        text: data.attributes.field_content_link.title,
      },
      media: {
        type: data.relationships.field_media_image.data.type,
        id: data.relationships.field_media_image.data.id,
      },
    }),
  })
</script>

<template>
  <div
    v-if="data" class="block-type-banner-block block block-block-content cover-image" :style="{
      position: 'relative',
      backgroundColor: 'unset',
    }"
  >
    <div
      class="block-inner" :style="{
        isolation: 'isolate',
      }"
    >
      <div class="field field--name-field-media-image field--type-entity-reference field--label-hidden field__item">
        <MediaImage class="media--view-mode-scale-crop-7-3-large" v-bind="data.media" />
      </div>
      <div class="summary">
        <div class="field field--name-field-title field--type-string field--label-hidden field__item">
          {{ data.title }}
        </div>
        <div class="field field--name-field-summary field--type-string-long field--label-hidden field__item">
          {{ data.summary }}
        </div>
        <div class="field field--name-field-content-link field--type-link field--label-hidden field__item">
          <NuxtLink :to="data.cta.href">
            {{ data.cta.text }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media screen and (min-width: 48rem) {
  .block-type-banner-block .field--name-field-media-image {
    clip: unset;
    width: unset;
    height: unset;
    inset: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
