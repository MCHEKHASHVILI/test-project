<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue'
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
      <input type="radio" :value="option.id" v-model="model" class="peer hidden" :disabled="!available(option.id)" />
      <div class="custom-radio px-5">
        <div class="flex flex-col items-center justify-between gap-1.5 text-nowrap">
          <IconLoader v-if="option.icon" :name="option.icon" class="text-[26px]" />
          <div class="flex flex-col items-center justify-between gap-3">
            <h5 class="block text-heading-5 capitalize" v-text="option.name" />
            <div class="flex text-helper-regular-s flex-row items-center justify-start gap-1.5">
              <IconLoader v-if="option.location" name="map_pin" />
              <span v-text="option.location ? option.location : 'Online'" />
            </div>
            <span class="price-label text-body-xs"
              v-text="option.priceModifier ? `+ $${option.priceModifier}` : 'Included'" />
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-center items-center py-2 text-helper-medium text-grayscale-700 leading-4">
        <span v-if="option.availableSeats === 0" v-text="'Fully Booked'" />
        <div v-if="option.availableSeats > 0 && option.availableSeats < 5"
          class="flex flex-row gap-1 justify-start items-center text-helper-warning">
          <IconLoader name="warning" class="text-[16px] text-helper-warning" />
          <span v-text="`Only ${option.availableSeats} seats left`" />
        </div>
        <span v-if="option.availableSeats > 0 && option.availableSeats > 4"
          v-text="`${option.availableSeats} Seats available`" />
      </div>
    </label>
  </fieldset>
</template>
