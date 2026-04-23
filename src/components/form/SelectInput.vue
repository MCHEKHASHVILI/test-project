<script setup lang="ts">
import { ref } from 'vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import { SelectOption } from '@/types'
const props = withDefaults(
  defineProps<{
    options: Array<SelectOption>
    label?: string
    errors?: string[]
  }>(),
  {
    options: () => [],
  },
)
const model = defineModel<string | number | null>({ default: 1 })
const isOpen = ref(false)
// const options = [1, 2, 3, 4, 5]

const selectOption = (num: string | number | null) => {
  model.value = num
  isOpen.value = false
}
</script>

<template>
  <div class="relative w-full input-group">
    <!-- Label -->
    <label :class="{ 'text-helper-error!': errors && errors.length }" v-text="label" />
    <div class="text-input">
      <!-- Trigger Button -->
      <button @click="isOpen = !isOpen" type="button">
        <span>{{ model }}</span>
        <span class="suffix">
          <IconLoader name="arrow"
            :class="isOpen ? 'cursor-pointer -rotate-180 transition-transform duration-200 ease-out' : 'cursor-pointer  transition-transform duration-200 ease-out'" />
        </span>
      </button>
      <!--Dropdown Menu-->
      <Transition enter-active-class=" transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <ul v-if="isOpen"
          class="absolute z-20 mt-2 top-full w-full overflow-auto no-scrollbar max-h-[500%] rounded-[10px] border border-grayscale-100 bg-grayscale-50">
          <li v-for="num in options" :key="num.value as string" @click="selectOption(num.value)" :class="[
            'cursor-pointer px-3.25 py-3 text-body-xs hover:bg-grayscale-100 transition-colors',
            model === num.value ? 'bg-purple-100 text-purple-500' : 'bg-grayscale-50 text-grayscale-500'
          ]" v-text="num.label" />
        </ul>
      </Transition>

      <!-- Close overlay -->
      <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-10"></div>
    </div>
    <div v-if="errors && errors.length" class="flex flex-col">
      <p v-for="error in errors" class="text-helper-error text-xs font-normal" v-text="error" />
    </div>
  </div>
</template>