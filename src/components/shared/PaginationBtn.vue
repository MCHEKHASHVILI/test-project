<script setup lang="ts">
defineProps<{
  active?: boolean
  disabled?: boolean
}>()
</script>
<template>
  <button :disabled="disabled" :class="[
    'w-10 h-10 bg-grayscale-50 hover:bg-purple-100 rounded-lg border border-solid border-grayscale-200 hover:border-purple-200 text-button-s transition-colors duration-500 ease-out flex items-center justify-center select-none cursor-pointer',
    active
      ? 'bg-purple-600 border-purple-500 text-grayscale-50'
      : 'bg-grascale-50 border-grayscale-200 text-purple-500 hover:bg-gray-50 disabled:text-grayscale-200 disabled:bg-grayscale-50 disabled:border-grayscale-200 disabled:cursor-not-allowed disabled:hover:bg-white',
  ]">
    <slot />
  </button>
</template>
