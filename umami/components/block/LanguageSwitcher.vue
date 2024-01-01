<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const switcher = computed(() => {
  const languages = route.meta.languages as {
    code: string
    path: string
  }[] || []
  const availableLocales = locales.value as {
    code: string
    name: string
  }[]

  return availableLocales.map(l => ({
    ...l,
    ...(languages.find((language: any) => language.code === l.code) || {}),
    active: l.code === locale.value,
  }))
})

const uuid = useState('uuid')
</script>

<template>
  <div class="block-language">
    <ul class="links">
      <li
        v-for="l in switcher"
        :key="l.code"
        :class="{ 'is-active': l.active }"
      >
        <a
          v-if="l.path"
          class="language-link"
          :hrefLang="l.code"
          :class="{ 'is-active': l.active }"
          :href="`/${l.code}${l.path}`"
        >
          {{ l.name }}
        </a>
        <NuxtLink
          v-else
          class="language-link"
          :href-lang="l.code"
          :class="{ 'is-active': l.active }"
          :to="switchLocalePath(l.code)"
        >
          {{ l.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
