<script setup lang="ts">
import { TaxonomyTermShortSchema } from '~/schemas'

interface Props {
  id: string
  type: string
  locale: string
}

const props = defineProps<Props>()

const { data } = await useAsyncData(
  `${props.locale}:${props.id}`,
  () => queryContent(`/${useEntityKey(props)}`)
    .where({
      _locale: props.locale,
    })
    .findOne(), {
    transform: tag => TaxonomyTermShortSchema.parse(tag),
  },
)
</script>

<template>
  <div v-if="data" class="field__item">
    <NuxtLink :to="data.href">
      {{ data.name }}
    </NuxtLink>
  </div>
</template>
