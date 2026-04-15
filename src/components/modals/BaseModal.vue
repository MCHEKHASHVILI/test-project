<script setup>
import Icon from '../shared/Icon.vue';
defineProps({ isOpen: Boolean, title: String, subtitle: String });
defineEmits(['close']);
</script>
<template>
    <Teleport to="body">
        <Transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/25 ">
                <div class="bg-grayscale-50 rounded-lg max-w-115 p-12.5 w-full transform transition-all">
                    <div class="flex flex-col">
                        <div class="flex flex-row justify-between">
                            <div class="w-full">
                                <slot name="back" />
                            </div>
                            <div class="shrink">
                                <button class="cursor-pointer" @click="$emit('close')">
                                    <Icon name="XIcon" />
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col ">
                            <div v-if="title" class="flex flex-row items-center justify-around">
                                <h2 class="text-[32px] text-grayscale-900 font-semibold capitalize" v-text="title" />
                            </div>
                            <div v-if="subtitle" class="flex flex-row items-center justify-around">
                                <small class="text-[14px] text-grayscale-500 font-medium capitalize"
                                    v-text="subtitle" />
                            </div>
                        </div>
                        <div class="my-6">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>