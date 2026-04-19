<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
const props = defineProps<{
    panel: { id: number, title: string, icons: string[], opened: boolean }
}>()
const iconName = computed(() => !props.panel.opened ? props.panel.icons[0] : props.panel.icons[1])

/**
 * Transition of Panels
 */
const onEnter = (el: Element) => {
    const htmlEl = el as HTMLElement;

    const fullMargin = getComputedStyle(htmlEl).marginTop;

    htmlEl.style.height = '0';
    htmlEl.style.marginTop = '0';
    htmlEl.style.opacity = '0';

    htmlEl.offsetHeight;

    htmlEl.style.height = htmlEl.scrollHeight + 'px';
    htmlEl.style.marginTop = fullMargin;
    htmlEl.style.opacity = '1';
};

const onAfterEnter = (el: Element) => {
    (el as HTMLElement).style.height = 'auto';
};

const onLeave = (el: Element) => {
    const htmlEl = el as HTMLElement;

    htmlEl.style.height = htmlEl.scrollHeight + 'px';
    htmlEl.style.marginTop = getComputedStyle(htmlEl).marginTop;

    htmlEl.offsetHeight;

    htmlEl.style.height = '0';
    htmlEl.style.marginTop = '0';
    htmlEl.style.opacity = '0';
};
</script>
<template>
    <div flex="w-full flex flex-col justify-between">
        <button class="w-full flex flex-row items-center justify-between cursor-pointer"
            @click="$emit('toggle', panel.id)">
            <div class="w-full flex flex-row items-center justify-start space-x-2">
                <div class="w-full flex flex-row items-center justify-start space-x-2">
                    <Transition enter-active-class="duration-300 ease-out overflow-hidden"
                        enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100"
                        leave-active-class="duration-300 ease-in overflow-hidden" leave-from-class="opacity-100"
                        leave-to-class="opacity-0 max-h-0">
                        <BaseIcon :name="iconName" class="transition-all duration-300 ease-in-out"
                            :class="[props.panel.opened ? '[&_path]:fill-grayscale-950 text-grayscale-50' : 'text-grayscale-400']" />
                    </Transition>
                    <h3 class="text-[24px] font-semibold text-purple-800 leading-6 transition-all duration-300 ease-in-out"
                        :class="{ 'text-grayscale-400!': !props.panel.opened }">
                        {{ panel.title }}</h3>
                </div>
                <BaseIcon name="SelectArrow" class="transform transition-all duration-300"
                    :class="{ '-rotate-180': !panel.opened }" />
            </div>
        </button>
        <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
            <div v-if="panel.opened"
                class="mt-4.5 overflow-hidden transition-[height,opacity] duration-300 ease-in-out">
                <slot />
            </div>
        </Transition>
    </div>
</template>