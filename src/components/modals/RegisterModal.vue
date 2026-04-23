<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import CreateAccountForm from '../form/CreateAccountForm.vue'
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia'
import IconLoader from '@/components/shared/IconLoader.vue'
import { useModalStore } from '@/stores/modals'

const modalStore = useModalStore()
// const { isOpen } = storeToRefs(modalStore)

const { activeModal } = storeToRefs(modalStore)
const registrationStore = useRegistrationStore()
const { register } = registrationStore
const { currentStep } = storeToRefs(registrationStore)
</script>
<template>
  <BaseModal :isOpen="!!activeModal" :title="'Create Account'" :subtitle="'Join and start learning today'"
    @close="$emit('close')">
    <template #back>
      <button v-if="currentStep > 1" class="cursor-pointer" @click="registrationStore.prevStep">
        <IconLoader name="BackIcon" class="rotate-180 text-[18px] text-grayscale-400" />
      </button>
    </template>
    <CreateAccountForm @submit="register" />
  </BaseModal>
</template>
