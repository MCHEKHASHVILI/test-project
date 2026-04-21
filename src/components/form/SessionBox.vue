<script setup lang="ts">
import BaseIcon from '../shared/BaseIcon.vue'
import { SessionType } from '@/types'
const props = defineProps<{ availableIds: number[]; options: SessionType[] }>()
const model = defineModel()
function available(i: number): boolean {
  const option = props.options.find((option) => (option.id as number) === i)
  const availabelSeats = option ? option.availableSeats : 0
  return props.availableIds.includes(i) && availabelSeats > 0
}
</script>

<template>
  <fieldset>
    <label v-for="option in options" :key="option.id" class="flex-1 cursor-pointer">
      <input
        type="radio"
        :value="option.id"
        v-model="model"
        class="peer hidden"
        :disabled="!available(option.id)"
      />
      <div class="custom-radio">
        <div class="flex flex-col items-center justify-between gap-1 text-nowrap">
          <BaseIcon v-if="option.icon" :name="option.icon" width="26" height="26" />
          <h5 class="block font-semibold capitalize" v-text="option.name" />
          <div class="flex flex-row items-center justify-start gap-1">
            <BaseIcon v-if="option.location" name="location" />
            <small v-if="option.location" v-text="option.location" />
            <small v-else v-text="'Online'" />
          </div>
          <small v-text="option.priceModifier ? `+ $${option.priceModifier}` : 'Included'" />
        </div>
      </div>
      <div class="flex-1 flex justify-center items-center py-2">
        <small v-if="option.availableSeats === 0" v-text="'Fully Booked'" />
        <div
          v-if="option.availableSeats > 0 && option.availableSeats < 5"
          class="flex flex-row gap-1 justify-start items-center text-[#F4A316]"
        >
          <BaseIcon v-if="option.location" name="warning" class="text-[#F4A316]" />
          <small v-text="`Only ${option.availableSeats} seats left`" />
        </div>
        <small
          v-if="option.availableSeats > 0 && option.availableSeats > 4"
          v-text="`${option.availableSeats} Seats available`"
        />
      </div>
    </label>
  </fieldset>
</template>
