<script setup lang="ts">
import { SelectOption } from '@/types'
import IconLoader from '../shared/IconLoader.vue'

const model = defineModel<SelectOption['value']>()

const props = withDefaults(defineProps<{
    options: Array<SelectOption>
    label?: string;
    errors?: string[]
}>(), {
    options: () => []
})
</script>
<template>
    <div class="input-group">
        <label :class="{ 'text-helper-error!': errors && errors.length }" v-text="label" />
        <div class="relative">
            <select v-model="model"
                class="w-full pl-4 pr-10 py-2.5 text-base border border-gray-300 rounded-lg appearance-none  placeholder-grayscale-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                :class="{ 'border-helper-error text-helper-error': errors && errors.length }">
                <option class="text-gray-500" v-for="option in options" v-text="option.label" :value="option.value" />
            </select>
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                :class="{ 'text-helper-error': errors && errors.length }">
                <IconLoader name="SelectArrow" />
            </span>
        </div>
    </div>
    <div v-if="errors && errors.length" class="flex flex-col">
        <p v-for="error in errors" class="text-helper-error text-xs font-normal" v-text="error" />
    </div>
</template>