<script setup lang="ts">
interface Props {
  type: string
  id: string
  width?: number
  height?: number
}

const props = defineProps<Props>()

const { data: file } = await useAsyncData(
  `media:${props.id}`,
  () => queryContent(`/${useEntityKey(props)}`)
    .where({
      _locale: 'en',
    })
    .findOne(), {
    transform: image => image.relationships.field_media_image.data,
  },
)
</script>

<template>
  <article class="media media--type-image media--view-mode-responsive-3x2">
    <div class="field field--name-field-media-image field--type-image field--label-hidden field__item">
      <FileImage v-bind="file" :width="width" :height="height" />
    </div>
  </article>
</template>
