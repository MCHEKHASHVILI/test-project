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
</script>
<template>
    <BaseModal :isOpen="isOpen" :title="'Welcome Back'" :subtitle="'Log in to continue your learning'" @close="close">
        <form class="modal" @submit.prevent="authenticate">
            <TextInput type="text" label="email" v-model="email" />
            <TextInput type="password" label="password" icon="eye" v-model="password" />
            <button class="btn-primary" type="submit" v-text="'Log In'" />
        </form>
    </BaseModal>
</template>