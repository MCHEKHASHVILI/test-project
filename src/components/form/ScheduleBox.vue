<script setup lang="ts">
import { ScheduleOption } from '@/types'
const props = defineProps<{ availableIds: number[], options: ScheduleOption[] }>()

const model = defineModel();

const available = (i: number) => props.availableIds.includes(i)

</script>

<template>
    <div class="flex-1 flex flex-row justify-between gap-1.5">
        <label v-for="option in options" :key="option.id" class="flex-1 cursor-pointer">
            <input type="radio" :value="option.id" v-model="model" class="peer hidden"
                :disabled="!available(option.id)" />
            <div
                class="p-2.5 w-full aspect-square flex items-center justify-center border border-grayscale-200 bg-grayscale-50 rounded-xl text-grayscale-800
                peer-checked:bg-brand-yellow-100 peer-checked:border-brand-yellow-300 peer-checked:text-brand-yellow-500
                 peer-enabled:hover:bg-brand-yellow-100 peer-enabled:hover:border-brand-yellow-300 peer-enabled:hover:text-brand-yellow-500
                 peer-disabled:border-grayscale-200 peer-disabled:bg-grayscale-100 peer-disabled:cursor-not-allowed transform duration-500 transition-all ease-in-out">
                <h5 class="block font-semibold">
                    {{ option.customLabel }}
                </h5>

            </div>
        </label>
    </div>
</template>
