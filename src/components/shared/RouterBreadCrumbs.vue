<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconLoader from './IconLoader.vue'
import { useCoursesStore } from '@/stores/courses'

const route = useRoute()

const stores: Record<string, any> = {
  coursesStore: useCoursesStore(),
}

const resolvePath = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const breadcrumbs = computed(() => {
  return route.matched
    .filter((item) => item.meta && item.meta.breadcrumb)
    .map(record => {
      const metaValue = record.meta.breadcrumb;

      // 1. Handle standard functions (for route params)
      if (typeof metaValue === 'function') {
        return { label: metaValue(route), path: record.path };
      }

      // 2. Handle dynamic store strings (e.g., 'userStore.currentUser.name')
      if (typeof metaValue === 'string' && metaValue.includes('.')) {
        const [storeKey, ...pathParts] = metaValue.split('.');
        const targetStore = stores[storeKey];

        if (targetStore) {
          const resolvedLabel = resolvePath(targetStore, pathParts.join('.'))
          return {
            label: resolvedLabel || 'Loading...', // Fallback while data fetches
            path: record.path
          };
        }
      }

      // 3. Fallback to static string
      return { label: metaValue, path: record.path }
    })
})
</script>
<template>
  <nav>
    <ul class="flex flex-row space-x-2">
      <li v-for="(crumb, index) in breadcrumbs" :key="index"
        class="flex justify-between space-x-2 items-center breadcrumb-item group">
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path" v-text="crumb.label" />
        <span v-else class="text-purple-400" v-text="crumb.label" />
        <IconLoader v-if="index < breadcrumbs.length - 1" name="BreadCrumbArrow" />
      </li>
    </ul>
  </nav>
</template>
