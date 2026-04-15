<script setup lang="ts">
import { SelectOption } from '@/types'
import Icon from '../shared/Icon.vue'

const model = defineModel<SelectOption['value']>()

const props = withDefaults(defineProps<{
    options: Array<SelectOption>
    label?: string;
}>(), {
    options: () => []
})
</script>
<template>
    <div class="input-group">
        <label v-text="label" />
        <div class="relative">
            <select v-model="model"
                class="w-full pl-4 pr-10 py-2.5 text-base border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer">
                <option v-for="option in options" v-text="option.label" :value="option.value" />
            </select>
            <Icon name="SelectArrow"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
    </div>
</template>