<template>
  <div class="layout layout--oneplusfourgrid-section">
    <div v-if="$slots.first" class="layout__region layout__region--first">
      <slot name="first" />
    </div>
    <div class="layout__four-grid-group">
      <div v-if="$slots.second" class="layout__region layout__region--second">
        <slot name="second" />
      </div>
      <div v-if="$slots.third" class="layout__region layout__region--third">
        <slot name="third" />
      </div>
      <div v-if="$slots.fourth" class="layout__region layout__region--fourth">
        <slot name="fourth" />
      </div>
      <div v-if="$slots.fifth" class="layout__region layout__region--fifth">
        <slot name="fifth" />
      </div>
    </div>
  </div>
</template>
