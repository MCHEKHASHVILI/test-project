<script setup lang="ts">
defineProps<{
    active?: boolean
    disabled?: boolean
}>()
</script>
<template>
    <button :disabled="disabled" :class="[
        'w-10 h-10 rounded-lg border text-sm font-medium transition-colors duration-150 flex items-center justify-center select-none cursor-pointer',
        active
            ? 'bg-brand-yellow-600 border-brand-yellow-500 text-grayscale-50'
            : 'bg-grascale-50 border-grayscale-200 text-brand-yellow-500 hover:bg-gray-50 disabled:text-grayscale-200 disabled:bg-grayscale-50 disabled:border-grayscale-200 disabled:cursor-not-allowed disabled:hover:bg-white',
    ]">
        <slot />
    </button>
</template>
