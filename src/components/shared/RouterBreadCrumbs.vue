<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import BaseIcon from './BaseIcon.vue';

const route = useRoute()

const breadcrumbs = computed(() => {
    return route.matched
        .filter(item => item.meta && item.meta.breadcrumb)
        .map(item => ({
            path: item.path,
            label: item.meta.breadcrumb
        }))
})
</script>
<template>
    <nav>
        <ul class="flex flex-row space-x-2">
            <li v-for="(crumb, index) in breadcrumbs" :key="index"
                class="flex justify-between space-x-2 items-center breadcrumb-item group">
                <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
                    {{ crumb.label }}
                </router-link>
                <span v-else class="text-purple-400">{{ crumb.label }}</span>
                <span v-if="index < breadcrumbs.length - 1">
                    <BaseIcon name="BreadCrumbArrow" width="12" height="24" />
                </span>
            </li>
        </ul>
    </nav>
</template>
