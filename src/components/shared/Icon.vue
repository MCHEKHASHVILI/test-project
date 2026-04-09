<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: false,
        default: null
    },
    width: {
        type: [String, Number],
        required: false,
        default: null
    },
    height: {
        type: [String, Number],
        required: false,
        default: null
    },

    viewBox: {
        type: String,
        required: false,
        default: null
    },
    fill: {
        type: String,
        required: false,
        default: null
    }
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

const icon = defineAsyncComponent(() =>
    import(`/src/assets/svg/${props.name}.svg`)
);
</script>

<template>
    <component :is="icon" v-bind="attributes" />
</template>