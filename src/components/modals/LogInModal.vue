<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import TextInput from '../form/TextInput.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const isOpen = ref<boolean>(false)

function close(): void {
    isOpen.value = false
}
function open(): void {
    isOpen.value = true
}

defineExpose({ open })
const emit = defineEmits(['toRegister'])

const authStore = useAuthStore()
const { email, password } = storeToRefs(authStore)
async function authenticate(): Promise<void> {
    const success = await authStore.login({
        email: email.value,
        password: password.value
    })

    if (success) {
        close()
    }
}

function openRegisterModal() {
    close()
    emit('toRegister')
}

</script>
<template>
    <BaseModal :isOpen="isOpen" :title="'Welcome Back'" :subtitle="'Log in to continue your learning'" @close="close">
        <div class="flex flex-col space-y-6">

            <form class="modal" @submit.prevent="authenticate">
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
                <span class="text-[12px] text-grayscale-500 lowercase first-letter:uppercase">don't have an
                    account?</span>
                <a class="text-[14px] text-grayscale-900 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%] cursor-pointer"
                    @click="openRegisterModal">
                    Sign Up</a>
            </div>
        </div>
    </BaseModal>
</template>