<script setup lang="ts">
import { defineAsyncComponent, computed, type Component } from 'vue';

const props = defineProps({
    name: { type: String, required: true },
    width: { type: [String, Number], default: null },
    height: { type: [String, Number], default: null },
    viewBox: { type: String, default: null },
    fill: { type: String, default: null }
});

// ✅ Vite resolves this glob statically at build time
const modules = import.meta.glob('/src/assets/svg/*.svg', {
    query: '?component',
    import: 'default',
});

const icon = defineAsyncComponent(() => {
    const loader = modules[`/src/assets/svg/${props.name}.svg`];
    if (!loader) return Promise.reject(new Error(`SVG not found: ${props.name}`));
    return loader() as Promise<Component>;
});
</script>

<template>
    <component :is="icon" v-bind="$attrs" />
</template>