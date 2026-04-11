<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import Icon from './Icon.vue';

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
                class="flex justify-between space-x-2 items-center text-grayscale-500 text-lg font-medium leading-none">
                <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
                    {{ crumb.label }}
                </router-link>
                <span v-else class="text-brand-yellow-400">{{ crumb.label }}</span>
                <span v-if="index < breadcrumbs.length - 1">
                    <Icon name="BreadCrumbArrow" />
                </span>
            </li>
        </ul>
    </nav>
</template>
