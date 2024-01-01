<script lang="ts">
interface ResultInterface {
  id: string
  score: string
  terms: string[]
  queryTerms: string[]
  match: Record<string, string[]>
  title: string
  content: string
  titles: string[]
}

declare module 'vue-router' {
  interface RouteMeta {
    results: ResultInterface[] | []
  }
}
</script>

<script setup lang="ts">
const localePath = useLocalePath()

function getUrl(id: string) {
  return localePath(id.replace(/#.*$/, ''))
}

definePageMeta({
  middleware: [
    async (to) => {
      const { $i18n: { t } } = useNuxtApp()
      const { query } = to
      const results = await searchContent(`${query.keys}`, {}) as ResultInterface[]
      to.meta.results = results
      to.meta.title = t('Search for @keywords', { keywords: query.keys })
      to.meta.breadcrumbs = [
        {
          text: t('Search for @keywords', { keywords: query.keys }),
        },
      ]
    },
  ],
})
const { meta: { results }, query: { keys } } = useRoute()
</script>

<template>
  <div>
    <form id="search-form" class="search-form" data-drupal-selector="search-form" method="GET" accept-charset="UTF-8">
      <div class="container-inline form-wrapper">
        <div class="form-item form-type-search form-item-keys">
          <label for="edit-keys" class="form-label">{{ $t('Enter your keywords') }}</label>
          <input id="edit-keys" type="search" :value="keys" name="keys" size="30" maxlength="255" class="form-search">
        </div>
        <input id="edit-submit" type="submit" :value="$t('Search')" class="button form-submit">
      </div>
      <NuxtLink id="edit-help-link" class="search-help-link">
        {{ $t('About searching') }}
      </NuxtLink>
    </form>
    <h2 v-if="results.length">
      {{ $t('Search results') }}
    </h2>
    <div class="item-list">
      <h3 v-if="results.length === 0">
        {{ $t('Your search yielded no results.') }}
      </h3>
      <ol v-else class="search-results node_search-results">
        <li v-for="result in results" :key="result.id">
          <h3 class="search-result__title">
            <NuxtLink :to="getUrl(result.id)">
              {{ result.title }}
            </NuxtLink>
          </h3>
          <div class="search-result__snippet-info">
            <p class="search-result__snippet">
              {{ result.content }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
