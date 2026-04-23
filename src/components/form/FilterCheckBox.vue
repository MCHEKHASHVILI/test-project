<script setup lang="ts">
import { computed } from 'vue'
import IconLoader from '../shared/IconLoader.vue'

import { Category, Topic, Instructor } from '@types'

const props = defineProps<{
  data: Category | Topic | Instructor
  modelValue: Array<number>
  value: number
}>()

const isChecked = computed<boolean>(() => props.modelValue.includes(props.value))

const emit = defineEmits(['update:modelValue'])

const toggleCheckbox = (event: any) => {
  let updatedArray = [...props.modelValue]
  if (event.target.checked) {
    updatedArray.push(props.value)
  } else {
    updatedArray = updatedArray.filter((item) => item !== props.value)
  }
  emit('update:modelValue', updatedArray)
}
</script>
<template>
  <label>
    <input type="checkbox" class="sr-only" :value="value" :checked="isChecked" @change="toggleCheckbox" />
    <!-- <BaseIcon v-if="'icon' in data" :name="data.icon" /> -->
    <IconLoader v-if="'icon' in data" :name="data.icon" />
    <img v-if="'avatar' in data" :src="data.avatar" />
    <span v-text="data.name" />
  </label>
</template>
