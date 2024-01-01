<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'two-columns',
  },
})
</script>

<template>
  <LayoutContainer>
    <main role="main" class="main container">
      <div class="layout-content">
        <div class="region region-content">
          <!-- <div class="block block-system block-system-main-block"> -->
          <slot />
          <!-- </div> -->
        </div>
      </div>
      <aside class="layout-sidebar" role="complementary">
        <div class="region region-sidebar">
          <div id="block-umami-views-block-articles-aside-block-1" class="views-element-container block block-views block-views-blockarticles-aside-block-1">
            <slot name="aside" />
          </div>
        </div>
      </aside>
    </main>
  </LayoutContainer>
</template>
