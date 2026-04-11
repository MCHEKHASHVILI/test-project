<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../shared/Icon.vue'

interface SortOption {
    value: string,
    label: string
}

const model = defineModel<string | null>()

const props = defineProps({
    options: { type: Array<SortOption>, default: () => [] }
})

const isOpen = ref(false)

const selectOption = (option: SortOption) => {
    model.value = option.value
    isOpen.value = false
}

const optionLabel = computed(() => (props.options && model.value) ? props.options.filter(option => option.value === model.value)[0].label : null)

</script>

<template>

    <div class="box-border relative inline-block text-sm min-w-62">

        <button type="button" @click="isOpen = !isOpen" @blur="isOpen = false"
            class="relative flex items-center justify-between gap-2 min-w-62 h-12.25 rounded-[10px] border border-grayscale-100 bg-grayscale-50 px-5 py-1.75 text-left focus:outline-none cursor-pointer">
            <div class="w-full flex flex-row items-center justify-start gap-2">
                <span class="text-[#8E8E8E] whitespace-nowrap">Sort By:</span>
                <span class="text-brand-yellow-500 font-medium leading-6 truncate">{{ optionLabel || 'Select...'
                }}</span>
            </div>
            <div class="">
                <Icon name="SelectArrow" />
            </div>
        </button>

        <transition name="fade">
            <ul v-if="isOpen"
                class="absolute z-50 top-full mt-1 w-full rounded-[10px] border border-grayscale-100 bg-grayscale-50 overflow-y-auto shadow-sm">
                <li v-for="option in options" :key="option.value" @mousedown="selectOption(option)"
                    class="px-5 py-2.5 hover:bg-grayscale-100 cursor-pointer "
                    :class="[(model === option.value) ? 'bg-brand-yellow-100 text-brand-yellow-500' : 'bg-grayscale-50 text-grayscale-500']">
                    {{ option.label }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>