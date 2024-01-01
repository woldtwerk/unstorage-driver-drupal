<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div class="block block-system block-system-branding-block">
    <NuxtLink :to="localePath('/')" rel="Home" class="branding__site-logo">
      <img src="/core/profiles/demo_umami/themes/umami/logo.svg" alt="Home" width="205" height="60">
    </NuxtLink>
  </div>
</template>
