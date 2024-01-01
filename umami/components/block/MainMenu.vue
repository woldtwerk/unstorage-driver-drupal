<script setup lang="ts">
import type { Linkset, LinksetItem } from '~/types'

const route = useRoute()
const { locale, locales } = useI18n()
const links = ref<LinksetItem['item']>([])

/**
 * Fetch all languages' main links at once to avoid CORS issues.
 */
await callOnce(async () => {
  // eslint-disable-next-line n/prefer-global/process
  process.server && locales.value.forEach(async (localeObject) => {
    if (typeof localeObject === 'string')
      return
    const { code } = localeObject
    const { data } = await useFetch(
      `http://localhost:3001/${code}/system/menu/main/linkset`, {
        transform: data => (data as Linkset).linkset[0].item,
        key: `${code}:menu-main`,
        deep: false,
      })
    if (code === locale.value && data.value)
      links.value = data.value
  })
})

watch(locale, () => {
  const { data } = useNuxtData(`${locale.value}:menu-main`)
  links.value = data.value
}, { immediate: true })

const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <!-- Mobile Toggle -->
  <div class="menu-main-togglewrap">
    <button
      type="button"
      name="menu_toggle"
      class="menu-main-toggle"
      :class="{
        'menu-main-toggle--active': menuOpen,
      }"
      data-drupal-selector="menu-main-toggle"
      aria-label="Toggle the menu"
      @click="toggleMenu"
    >
      <svg
        width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <use xlink:href="#a" fill="#5F635D" />
        <use xlink:href="#a" transform="translate(0 18)" fill="#5F635D" />
        <use xlink:href="#a" transform="translate(0 9)" fill="#5F635D" />
        <defs>
          <path id="a" fill-rule="evenodd" d="M0 0h23v5H0V0z" />
        </defs>
      </svg>
    </button>
  </div>
  <!-- Desktop -->
  <nav
    id="block-umami-main-menu"
    role="navigation"
    aria-labelledby="block-umami-main-menu-menu"
    class="block block-menu navigation menu-main__wrapper"
  >
    <h2
      id="block-umami-main-menu-menu"
      class="block__title visually-hidden"
    >
      {{ $t('Main navigation') }}
    </h2>
    <ul
      class="menu-main"
      :class="{
        'menu-main--active': menuOpen,
      }"
    >
      <li
        v-for="link in links"
        :key="link.href"
        class="menu-main__item"
      >
        <NuxtLink
          :to="link.href"
          class="menu-main__link"
          :class="{ 'is-active': route.path === link.href }"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
