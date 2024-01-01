<template>
  <div v-if="$route.meta.breadcrumbs?.length" class="layout-breadcrumbs">
    <div class="container">
      <div class="region region-breadcrumbs">
        <BlockBreadCrumbs />
      </div>
    </div>
  </div>
</template>
