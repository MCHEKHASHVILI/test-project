<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue'
withDefaults(
  defineProps<{
    value?: number
    iconName?: string
    iconClass?: string,
    labelClass?: string
  }>(),
  {
    value: 0,
    iconName: 'rating',
    iconClass: 'text-helper-warning text-[18px]',
    labelClass: 'text-body-xs leading-0 text-grayscale-600'
  },
)
</script>
<template>
  <div class="flex flex-row items-center justify-between gap-1">
    <IconLoader :name="iconName" :class="iconClass" />
    <span v-text="value.toFixed(1)" :class="labelClass" />
  </div>
</template>
