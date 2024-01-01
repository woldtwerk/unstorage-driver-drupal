<script setup lang="ts">
import { UserShortSchema } from '~/schemas'

interface Props {
  id: string
  type: string
}

const props = defineProps<Props>()
const { locale } = useI18n()

const { data } = await useAsyncData(
  props.id,
  () => queryContent(`/${useEntityKey(props)}`)
    .findOne(), {
    transform: user => UserShortSchema.parse(user),
  },
)
</script>

<template>
  <span class="field field--name-uid">
    <NuxtLink title="View user profile." to="/" class="username">
      {{ data.name }}
    </NuxtLink>
  </span>
</template>
