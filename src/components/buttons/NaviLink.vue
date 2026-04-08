<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps<{
    routeName: string;
    title: string;
    icon: string;
    alt: string;
}>();
const iconUrl = new URL(props.icon).href;
</script>

<template>
    <RouterLink :to="{ name: routeName }"
        class="group flex items-center gap-2 p-3.75 rounded-lg text-xl font-medium text-grayscale-600 hover:text-brand-yellow-500 transition-colors">
        <div class="w-[21px] h-[25px] bg-grayscale-600 group-hover:bg-brand-yellow-500 transition-colors" :style="{
            'mask-image': `url(&quot;${iconUrl}&quot;)`,
            '-webkit-mask-image': `url(&quot;${iconUrl}&quot;)`,
            'mask-repeat': 'no-repeat',
            'mask-position': 'center',
            'mask-size': 'contain',
            '-webkit-mask-repeat': 'no-repeat',
            '-webkit-mask-position': 'center',
            '-webkit-mask-size': 'contain'
        }"></div>
        <span>{{ title }}</span>
    </RouterLink>
</template>