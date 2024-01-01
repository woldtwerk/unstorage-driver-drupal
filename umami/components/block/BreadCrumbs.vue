<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs: BreadcrumbInterface[] = [{
    text: t('Home'),
    attributes: {
      rel: 'home',
    },
    to: '/',
  }]

  if (route.meta.breadcrumbs)
    crumbs.push(...route.meta.breadcrumbs)

  return crumbs
})
</script>

<template>
  <div id="block-umami-breadcrumbs" class="block block-system block-system-breadcrumb-block">
    <nav class="breadcrumb" role="navigation" aria-labelledby="system-breadcrumb">
      <h2 id="system-breadcrumb" class="visually-hidden">
        Breadcrumb
      </h2>
      <ol>
        <li v-for="crumb, idx in breadcrumbs" :key="crumb.text">
          <NuxtLink v-if="crumb.to && (idx + 1) < breadcrumbs.length" :to="localePath(crumb.to)" v-bind="crumb.attributes">
            {{ crumb.text }}
          </NuxtLink>
          <template v-else>
            {{ crumb.text }}
          </template>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style>
.breadcrumb li::before {
  padding-inline: 0.25em;
}
</style>
