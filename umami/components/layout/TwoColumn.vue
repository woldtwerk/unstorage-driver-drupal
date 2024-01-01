<script setup lang="ts">
interface Props {
  cols: '33-67' | '50-50' | '67-33'
}

const props = defineProps<Props>()

const columnClasses = computed(() => {
  return `layout--twocol-section--${props.cols}`
})
</script>

<template>
  <div
    class="layout layout--twocol-section"
    :class="columnClasses"
  >
    <div class="layout__region layout__region--first">
      <slot name="first" />
    </div>
    <div class="layout__region layout__region--second">
      <slot name="second" />
    </div>
  </div>
</template>
