<script setup lang="ts">
interface Props {
  type: string
  id: string
  meta: {
    title: string
    alt: string
    width: number
    height: number
  }
  width?: number
  height?: number
}

const props = defineProps<Props>()

const { data: file } = await useAsyncData(
  `file:${props.id}`,
  () => queryContent(useEntityKey(props))
    .findOne(), {
    transform: image => image.attributes.uri.url,
  },
)
</script>

<template>
  <NuxtImg
    :src="file"
    :alt="props.meta.alt"
    :width="props?.width || props.meta.width"
    :height="props?.height || props.meta.height"
  />
</template>
