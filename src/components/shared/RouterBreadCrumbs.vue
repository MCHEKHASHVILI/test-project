<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconLoader from './IconLoader.vue'

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched
    .filter((item) => item.meta && item.meta.breadcrumb)
    .map((item) => ({
      path: item.path,
      label: item.meta.breadcrumb,
    }))
})
</script>
<template>
  <nav>
    <ul class="flex flex-row space-x-2">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex justify-between space-x-2 items-center breadcrumb-item group"
      >
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path" v-text="crumb.label" />
        <span v-else class="text-purple-400" v-text="crumb.label" />
        <IconLoader v-if="index < breadcrumbs.length - 1" name="BreadCrumbArrow" />
      </li>
    </ul>
  </nav>
</template>
