<script setup lang="ts">
import BaseIcon from '../shared/BaseIcon.vue'
import { TimeSlot } from '@/types'
const props = defineProps<{ availableIds: number[]; options: TimeSlot[] }>()

const model = defineModel()

const available = (i: number) => props.availableIds.includes(i)

function parseTimeLable(label: string): string {
  if (!label) return ''
  return label.split(' ')[0]
}

function parseTimeSlotLabel(startTime: string, endTime: string) {
  return `${convertTo12Hour(startTime)} - ${convertTo12Hour(endTime)}`
}

function convertTo12Hour(time24: string): string {
  if (!time24) return ''
  const [hours, minutes, seconds] = time24.split(':')
  // Create a date object (using any date, e.g., today)
  const date = new Date()
  date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds))

  // Format to 12-hour h:mm AM/PM
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}
</script>
<template>
  <div class="w-full flex flex-row justify-between gap-1.5">
    <label v-for="option in options" :key="option.id" class="grow cursor-pointer">
      <input
        type="radio"
        :value="option.id"
        v-model="model"
        class="peer hidden"
        :disabled="!available(option.id)"
      />
      <div
        class="p-3.75 aspect-163/61 flex-1 flex items-center justify-center gap-1 border border-grayscale-200 bg-grayscale-50 rounded-xl text-grayscale-800 peer-checked:bg-purple-100 peer-checked:border-purple-300 peer-checked:text-purple-500 peer-enabled:hover:bg-purple-100 peer-enabled:hover:border-purple-300 peer-enabled:hover:text-purple-500 peer-disabled:border-grayscale-200 peer-disabled:bg-grayscale-100 peer-disabled:cursor-not-allowed transform duration-500 transition-all ease-in-out"
      >
        <BaseIcon v-if="option.icon" :name="option.icon" class="w-6.5 h-6.5" />
        <div class="flex flex-col gap-1 text-nowrap">
          <h5 class="block font-semibold" v-text="parseTimeLable(option.label)" />
          <small v-text="parseTimeSlotLabel(option.startTime, option.endTime)" />
        </div>
      </div>
    </label>
  </div>
</template>
