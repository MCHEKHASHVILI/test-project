<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])
const modalRef = ref(null)

watch(
  () => props.isOpen,
  (val) => {
    document.body.classList.toggle('overflow-hidden', val)
  },
)

onUnmounted(() => document.body.classList.remove('overflow-hidden'))

onClickOutside(modalRef, () => props.isOpen && emit('close'))
useEventListener('keydown', (e) => e.key === 'Escape' && props.isOpen && emit('close'))
</script>
<template>
  <Teleport to="body">
    <aside
      v-if="isOpen"
      :class="[
        'fixed inset-0 z-50 flex items-start justify-end bg-black/25 backdrop transform transition-transform duration-600 ease-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div
        ref="modalRef"
        class="overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-grayscale-100 max-w-198.5 p-12.5 w-full overflow-y-auto max-h-screen shadow-xl"
      >
        <div class="flex flex-col h-200 min-h-[calc(100vh-100px)]">
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-heading-1 leading-11 text-grayscale-900 capitalize">
              enrolled courses
            </h2>
            <small class="text-[14px] text-grayscale-500 font-medium capitalize">
              total enrollments
              <slot name="total" />
            </small>
          </div>
          <div class="flex-1 flex flex-col pt-7.5">
            <slot></slot>
          </div>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
/* Utility to hide scrollbar */
.sidebar-panel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.sidebar-panel::-webkit-scrollbar {
  display: none;
}
</style>
