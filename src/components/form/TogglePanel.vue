<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import Icon from '@/components/shared/Icon.vue'
const props = defineProps<{
    panel: { id: number, title: string, icons: string[], opened: boolean }
}>()

const iconName = computed(() => !props.panel.opened ? props.panel.icons[0] : props.panel.icons[1])
</script>
<template>
    <div flex="w-full flex flex-col justify-between">
        <button class="w-full flex flex-row items-center justify-between cursor-pointer"
            @click="$emit('toggle', panel.id)">
            <div class="w-full flex flex-row items-center justify-start space-x-2">
                <div class="w-full flex flex-row items-center justify-start space-x-2">
                    <BaseIcon :name="iconName" class="transform-gpu origin-center transition-transform duration-300" />
                    <h3 class="text-[24px] font-semibold text-brand-yellow-800 leading-6">{{ panel.title }}</h3>
                </div>
                <Icon name="SelectArrow" class="transform transition-all duration-300"
                    :class="{ '-rotate-180': !panel.opened }" />
            </div>
        </button>
        <div v-show="panel.opened" class="mt-4.5 transform transition-all duration-300">
            <slot />
        </div>
    </div>
</template>