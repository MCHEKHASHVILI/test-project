<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import { onClickOutside } from '@vueuse/core'
const modalRef = ref(null)
const props = defineProps({ isOpen: Boolean, title: String, subtitle: String })
const emit = defineEmits(['close'])

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  },
)
onClickOutside(modalRef, () => {
  emit('close')
})
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
<template>
  <Teleport to="body">
    <Transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black-light">
        <div class="relative bg-grayscale-50 rounded-lg max-w-115 p-12.5 w-full transform transition-all"
          ref="modalRef">
          <div class="absolute top-6 left-0 px-5 w-full h-auto">
            <div class="flex flex-row justify-between">
              <div class="w-full">
                <slot name="back" />
              </div>
              <div class="shrink">
                <slot name="exit">
                  <button class="cursor-pointer text-[13.2px] text-grayscale-400" @click="$emit('close')">
                    <IconLoader name="XIcon" class="text-[14px]" />
                  </button>
                </slot>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-col gap-1.5">
              <div class="flex flex-row items-center-justify-around">
                <slot name="icon"></slot>
              </div>
              <div v-if="title" class="flex flex-row items-center justify-around text-center">
                <h2 class="text-heading-2 text-grayscale-900 capitalize" v-text="title" />
              </div>
              <div v-if="subtitle" class="flex flex-row items-center justify-around">
                <span class="text-body-xs text-grayscale-500 lowercase first-letter:uppercase" v-text="subtitle" />
              </div>
            </div>
            <div class="pt-6">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
