<script setup lang="ts">
import { ref, computed } from 'vue'
import { SelectOption } from '@/types'
import IconLoader from '../shared/IconLoader.vue'

const model = defineModel<SelectOption['value']>()

const props = withDefaults(defineProps<{ options: Array<SelectOption> }>(), {
  options: () => [],
})

const isOpen = ref(false)

const selectOption = (option: SelectOption) => {
  model.value = option.value
  isOpen.value = false
}

const optionLabel = computed(() => {
  const option = props.options.find((option) => option.value === model.value)
  return option ? option.label : 'Select ...'
})

const isActive = computed(() => {
  return (option: SelectOption): boolean => {
    return option.value === model.value
  }
})
</script>
<template>
  <div class="box-border relative inline-block text-sm min-w-62">
    <button type="button" @click="isOpen = !isOpen" @blur="isOpen = false"
      class="relative flex items-center justify-between gap-2 min-w-62 h-12.25 rounded-[10px] border border-grayscale-100 bg-grayscale-50 px-5 py-1.75 text-left focus:outline-none cursor-pointer">
      <div class="w-full flex flex-row items-center justify-start gap-2">
        <span class="text-[#8E8E8E] whitespace-nowrap">Sort By:</span>
        <span class="text-purple-500 font-medium leading-6 truncate">{{ optionLabel }}</span>
      </div>
      <IconLoader name="arrow"
        :class="isOpen ? 'text-[20px] text-grayscale-500 transform duration-300 transition-all ease-out' : '-rotate-180 text-[20px] text-grayscale-500 transform duration-300 transition-all ease-out'" />
    </button>
    <transition name="fade">
      <ul v-if="isOpen"
        class="absolute z-50 top-full mt-1 w-full rounded-[10px] border border-grayscale-100 bg-grayscale-50 overflow-y-auto shadow-sm">
        <li v-for="option in options" :key="option.value as PropertyKey" @mousedown="selectOption(option)"
          class="px-5 py-2.5 hover:bg-grayscale-100 cursor-pointer" :class="[
            isActive(option)
              ? 'bg-purple-100 text-purple-500'
              : 'bg-grayscale-50 text-grayscale-500',
          ]">
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
