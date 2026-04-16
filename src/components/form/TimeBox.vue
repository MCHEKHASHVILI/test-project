<script setup lang="ts">
import BaseIcon from '../shared/BaseIcon.vue';
import { TimeSlotOption } from '@/types';
const props = defineProps<{ availableIds: number[], options: TimeSlotOption[] }>()

const model = defineModel()

const available = (i: number) => props.availableIds.includes(i)

</script>

<template>
    <div class="flex-1 flex flex-row justify-between gap-1.5">
        <label v-for="option in options" :key="option.id" class="flex-1 cursor-pointer">
            <input type="radio" :value="option.id" v-model="model" class="peer hidden"
                :disabled="!available(option.id)" />
            <div
                class="p-3.75 w-full aspect-3/1 flex items-center justify-center  gap-1 border border-grayscale-200 bg-grayscale-50 rounded-xl text-grayscale-800
                peer-checked:bg-brand-yellow-100 peer-checked:border-brand-yellow-300 peer-checked:text-brand-yellow-500
                 peer-enabled:hover:bg-brand-yellow-100 peer-enabled:hover:border-brand-yellow-300 peer-enabled:hover:text-brand-yellow-500
                 peer-disabled:border-grayscale-200 peer-disabled:bg-grayscale-100 peer-disabled:cursor-not-allowed transform duration-500 transition-all ease-in-out">
                <BaseIcon :name="option.icon" class="w-6.5 h-6.5" />
                <div class="flex flex-col gap-1 text-nowrap">
                    <h5 class="block font-semibold" v-text="option.label" />
                    <small v-text="option.time" />
                </div>

            </div>
        </label>
    </div>
</template>
