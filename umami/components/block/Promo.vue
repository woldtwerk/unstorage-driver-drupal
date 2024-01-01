<script setup lang="ts">
const { locale } = useI18n()
const { data } = await useAsyncData(
  `${locale.value}:block:promo`,
  () => queryContent('block_content', 'footer_promo_block')
    .where({
      _locale: locale.value,
    })
    .findOne(), {
    watch: [locale],
    transform: data => ({
      title: data.attributes.field_title,
      summary: data.attributes.field_summary,
      link: {
        href: data.attributes.field_content_link.uri.replace('internal:', ''),
        title: data.attributes.field_content_link.title,
      },
      media: {
        type: data.relationships.field_media_image.data.type,
        id: data.relationships.field_media_image.data.id,
      },
    }),
  })
</script>

<template>
  <div v-if="data" class="block-type-footer-promo-block">
    <div v-if="data?.media" class="field field--name-field-media-image field--type-entity-reference field--label-hidden field__item">
      <MediaImage v-bind="data.media" />
    </div>
    <h2 class="block__title">
      {{ data.title }}
    </h2>
    <div class="footer-promo-content">
      <div class="field field--name-field-summary field--type-string-long field--label-hidden field__item">
        {{ data.summary }}
      </div>
      <div class="field field--name-field-content-link field--type-link field--label-hidden field__item">
        <NuxtLink :to="data.link.href" class="footer-promo-block__link">
          {{ data.link.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
