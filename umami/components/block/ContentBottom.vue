<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: tags } = useAsyncData(
  `${locale.value}:block:content-bottom`,
  () => queryContent('taxonomy_term', 'tags')
    .where({
      '_locale': locale.value,
      'attributes.status': { $eq: true },
    })
    .sort({ 'attributes.name': 1 })
    .find(), {
    watch: [locale],
    transform: collections => collections.map(collection => ({
      id: collection.id,
      title: collection.attributes.name,
      href: localePath(collection.attributes.path.alias),
    })),
  },
)
</script>

<template>
  <div class="views-element-container block block-views block-views-blockrecipe-collections-block">
    <h2 class="block__title">
      {{ $t('Recipe collections') }}
    </h2>
    <div class="container">
      <div class="views-view-grid vertical cols-4 clearfix">
        <div v-for="(n, i) in 4" :key="n" class="views-col clearfix col-1">
          <div v-for="tag in tags?.slice(i, i + 4)" :key="tag.id" class="views-row row-1">
            <NuxtLink :to="tag.href">
              {{ tag.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
