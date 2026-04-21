<script setup lang="ts">
import { ScheduleOption } from '@/types'
const props = defineProps<{ availableIds: number[]; options: ScheduleOption[] }>()

const model = defineModel()

const available = (i: number) => props.availableIds.includes(i)
function parseScheduleLable(label: string): string {
  if (!label) return ''
  if (!label.includes('-')) return label
  const trimed = label.replaceAll(' ', '')
  return `${trimed.split('-')[0].substring(0, 3)} - ${trimed.split('-')[1].substring(0, 3)}`
}
</script>

<template>
  <div class="flex-1 flex flex-row justify-between gap-1.5">
    <label v-for="option in options" :key="option.id" class="flex-1 cursor-pointer">
      <input
        type="radio"
        :value="option.id"
        v-model="model"
        class="peer hidden"
        :disabled="!available(option.id)"
      />
      <div
        class="p-2.5 w-full aspect-square flex items-center justify-center border border-grayscale-200 bg-grayscale-50 rounded-xl text-grayscale-800 peer-checked:bg-purple-100 peer-checked:border-purple-300 peer-checked:text-purple-500 peer-enabled:hover:bg-purple-100 peer-enabled:hover:border-purple-300 peer-enabled:hover:text-purple-500 peer-disabled:border-grayscale-200 peer-disabled:bg-grayscale-100 peer-disabled:cursor-not-allowed transform duration-500 transition-all ease-in-out"
      >
        <h5 class="block font-semibold">
          {{ parseScheduleLable(option.label) }}
        </h5>
      </div>
    </label>
  </div>
</template>
