<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)
function completeProfile() {
  router.push({ name: 'action.modal', params: { name: 'ProfileModal' } })
}
</script>
<template>
  <BaseModal :isOpen="!!activeModal" :title="'complete your profile to continue'" @close="$emit('close')">
    <template #exit><span /></template>
    <template #icon>
      <div class="w-full flex flex-row items-center justify-center py-6">
        <IconLoader name="ModalUser" class="text-[94px] text-purple-500" />
      </div>
    </template>
    <div class="w-full flex flex-col space-y-6 items-center justify-center text-center text-grayscale-700">
      <p class="text-body-l lowercase first-letter:uppercase"
        v-text="'you need to complete your profile before enrolling in this course.'" />
      <div class="w-full flex flex-row items-center justify-between gap-2">
        <button class="w-full btn-outline flex items-center justify-center" @click.prevent="completeProfile">
          <span class="text-button-s capitalize text-nowrap">complete profile</span>
        </button>
        <button class="w-full btn-primary flex items-center justify-center" @click.prevent="$emit('close')">
          <span class="text-button-s capitalize text-nowrap">cancel</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>