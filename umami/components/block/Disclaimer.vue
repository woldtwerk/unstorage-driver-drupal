<script setup lang="ts">
const { locale } = useI18n()
const { data } = await useAsyncData(
  `${locale.value}:block:disclaimer-block`,
  () => queryContent('block_content', 'disclaimer_block')
    .where({
      _locale: locale.value,
    })
    .findOne(), {
    deep: false,
    watch: [locale],
    transform: data => ({
      disclaimer: data.attributes.field_disclaimer.processed,
      copyright: data.attributes.field_copyright.processed,
    }),
  })
</script>

<template>
  <div class="block-type-disclaimer-block block block-block-content">
    <div class="disclaimer">
      <div class="disclaimer__disclaimer" v-html="data?.disclaimer" />
      <div class="disclaimer__copyright" v-html="data?.copyright" />
    </div>
  </div>
</template>
