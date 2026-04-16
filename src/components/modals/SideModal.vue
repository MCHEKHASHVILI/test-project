<script setup>
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'
const modalRef = ref(null);
const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);
watch(() => props.isOpen, (value) => {
    if (value) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
})
onClickOutside(modalRef, () => {
    emit('close')
})
</script>
<template>
    <Teleport to="body">
        <Transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-end bg-black/25">
                <div class="bg-grayscale-100 z-55 max-w-198.5 p-12.5 w-full h-screen  overflow-y-auto scrollbar-hide no-scrollbar transform transition-all"
                    ref="modalRef">
                    <div class="flex flex-col h-full">
                        <div class="flex flex-row justify-between items-center">
                            <h2 class="text-[32px] text-grayscale-900 font-semibold capitalize">
                                enrolled courses
                            </h2>
                            <small class="text-[14px] text-grayscale-500 font-medium capitalize">total
                                enrollments
                            </small>
                        </div>
                        <div class="my-6 flex grow items-center justify-center">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
<style scoped>
@layer components {
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .no-scrollbar {
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }
}
</style>