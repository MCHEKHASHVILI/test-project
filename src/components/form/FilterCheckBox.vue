<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../shared/Icon.vue'

import { Category, Topic, Instructor } from "@types"

const props = defineProps<{
    data: Category | Topic | Instructor,
    modelValue: Array<number>,
    value: number
}>()

const isChecked = computed<boolean>(() => props.modelValue.includes(props.value));

const emit = defineEmits(['update:modelValue'])

const toggleCheckbox = (event: any) => {
    let updatedArray = [...props.modelValue]
    if (event.target.checked) {
        updatedArray.push(props.value)
    } else {
        updatedArray = updatedArray.filter(item => item !== props.value)
    }
    emit('update:modelValue', updatedArray)
}

</script>
<template>
    <label class="box-border inline-flex items-center cursor-pointer">

        <input type="checkbox" class="sr-only peer" :value="value" :checked="isChecked" @change="toggleCheckbox" />

        <div class="w-fit flex flex-row space-x-2.5 items-center bg-grayscale-50 rounded-xl py-2 px-3 border "
            :class="[isChecked ? 'border-brand-yellow-400' : 'border-transparent']">
            <Icon v-if="'icon' in data" :name="data.icon" />
            <div v-if="'avatar' in data" class="w-7.5 h-7.5 rounded-sm overflow-hidden">
                <img :src="data.avatar" class="w-full h-full rounded-sm object-cover" />
            </div>
            <span>{{ data.name }}</span>
        </div>
    </label>
</template>