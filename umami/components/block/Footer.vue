<script setup lang="ts">
import type { Linkset, LinksetItem } from '~/types'

const { locale, locales } = useI18n()
const links = ref<LinksetItem['item']>([])

/**
 * Fetch all languages' footer links at once to avoid CORS issues.
 */
await callOnce(async () => {
  // eslint-disable-next-line n/prefer-global/process
  process.server && locales.value.forEach(async (localeObject) => {
    if (typeof localeObject === 'string')
      return
    const { code } = localeObject
    const { data } = await useFetch(
      `http://localhost:3001/${code}/system/menu/footer/linkset`, {
        transform: data => (data as Linkset).linkset[0].item,
        key: `${code}:menu-footer`,
        deep: false,
      })
    if (code === locale.value && data.value)
      links.value = data.value
  })
})

watch(locale, () => {
  const { data } = useNuxtData(`${locale.value}:menu-footer`)
  links.value = data.value
}, { immediate: true })
</script>

<template>
  <div class="block block-system block-system-menu-blockfooter menu-footer-wrapper">
    <h2 class="block__title menu-footer__title">
      {{ $t('Tell us what you think') }}
    </h2>
    <ul class="menu-footer">
      <li
        v-for="link in links"
        :key="link.href"
        class="menu-footer__item"
      >
        <NuxtLink
          :to="link.href"
          class="menu-footer__link"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
