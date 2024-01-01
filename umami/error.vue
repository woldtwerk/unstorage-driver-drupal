<script setup lang="ts">
const props = defineProps({
  error: Object,
})

const message = computed(() => {
  if (props.error?.statusCode === 404) {
    return {
      title: 'Page not found',
      body: 'The requested page could not be found.',
    }
  }
  return {
    title: 'Oops.. Something went wrong',
  }
})
</script>

<template>
  <NuxtLayout>
    {{ message.body }}
  </NuxtLayout>
</template>
