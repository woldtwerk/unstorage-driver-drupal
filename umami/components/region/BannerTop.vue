<template>
  <div v-if="$route.meta.blockLayout?.bannerTop?.length" class="region region-banner-top">
    <div class="layout-banner-top">
      <template
        v-for="block in $route.meta.blockLayout.bannerTop"
        :key="block.id"
      >
        <BlockBanner
          v-if="block.id"
          v-bind="block"
        />
        <Component
          :is="block.component"
          v-if="block.component"
          v-bind="block.props"
        />
      </template>
    </div>
  </div>
</template>
