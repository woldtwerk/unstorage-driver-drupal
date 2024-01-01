<script setup lang="ts">
const route = useRoute()
const title = computed(() => route.meta.title)
const showTitle = computed(() => route.meta.title && !route.meta.hideTitle)
</script>

<template>
  <div class="dialog-off-canvas-main-canvas">
    <div class="layout-container">
      <header class="layout-header" role="banner">
        <div class="container">
          <RegionPreHeader />
          <RegionHeader />
        </div>
      </header>

      <RegionBannerTop />

      <RegionBreadCrumbs />

      <div v-if="showTitle" class="layout-page-title">
        <div class="container">
          <div class="block block-core block-page-title-block">
            <h1 class="page-title">
              {{ title }}
            </h1>
          </div>
        </div>
      </div>

      <slot />

      <div class="layout-content-bottom">
        <RegionContentBottom />
      </div>

      <div class="layout-footer">
        <footer class="footer" role="contentinfo">
          <div class="container">
            <RegionFooter />
          </div>
        </footer>
      </div>

      <div class="layout-bottom">
        <div class="container">
          <RegionBottom />
        </div>
      </div>
    </div>
  </div>
</template>
