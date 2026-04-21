<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue'
withDefaults(
  defineProps<{
    value?: number
    iconName?: string
  }>(),
  {
    value: 0,
    iconName: 'Star',
  },
)
</script>
<template>
  <div class="flex flex-row items-center justify-between gap-1">
    <IconLoader :name="iconName" class="text-helper-warning text-[18px]" />
    <span v-text="value.toFixed(1)" class="text-body-xs leading-0 text-grayscale-600" />
  </div>
</template>
