<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import TextInput from '../form/TextInput.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { login } = authStore
const { email, password } = storeToRefs(authStore)
const modalStore = useModalStore()
// const { isOpen } = storeToRefs(modalStore)

const { activeModal } = storeToRefs(modalStore)

const isOpen = true
</script>
<template>
  <BaseModal
    :isOpen="!!activeModal"
    :title="'Welcome Back'"
    :subtitle="'Log in to continue your learning'"
    @close="$emit('close')"
  >
    <div class="flex flex-col space-y-6">
      <form class="modal" @submit.prevent="login">
        <TextInput type="text" label="email" v-model="email" />
        <TextInput type="password" label="password" icon="eye" v-model="password" />
        <button class="btn-primary" type="submit" v-text="'Log In'" />
      </form>
      <div class="flex items-center">
        <div class="grow border-t border-grayscale-200"></div>
        <span class="px-2.5 text-grayscale-400 font-medium">or</span>
        <div class="grow border-t border-grayscale-200"></div>
      </div>
      <div class="flex items-center space-x-2 justify-center">
        <span class="text-[12px] text-grayscale-500 lowercase first-letter:uppercase"
          >don't have an account?</span
        >
        <AppLink
          :to="{ name: 'action.modal', params: { name: 'RegisterModal' } }"
          class="text-[14px] text-grayscale-900 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%] cursor-pointer"
        >
          Sign Up
        </AppLink>
      </div>
    </div>
  </BaseModal>
</template>
