<script setup lang="ts">
import { defineAsyncComponent, computed, type Component } from 'vue';

const props = defineProps({
    name: { type: String, required: true },
    class: { type: String, default: null },
    width: { type: [String, Number], default: null },
    height: { type: [String, Number], default: null },
    viewBox: { type: String, default: null },
    fill: { type: String, default: null }
});

const attributes = computed(() => {
    const attrs: Record<string, string | number> = {};
    if (props.class) attrs.class = props.class;
    if (props.width) attrs.width = props.width;
    if (props.height) attrs.height = props.height;
    if (props.viewBox) attrs.viewBox = props.viewBox;
    if (props.fill) attrs.fill = props.fill;
    return attrs;
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
    <component :is="icon" v-bind="attributes" />
</template>