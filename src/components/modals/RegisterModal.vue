<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import CreateAccountForm from '../form/CreateAccountForm.vue'
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia'
import Icon from '../shared/Icon.vue'

const isOpen = ref<boolean>(false)

function close(): void {
    isOpen.value = false
}
function open(): void {
    isOpen.value = true
}

defineExpose({ open })
const emit = defineEmits(['toLogIn'])

function openLoginModal() {
    close()
    emit('toLogIn')
}

const registrationStore = useRegistrationStore()
const { currentStep } = storeToRefs(registrationStore)
async function createAccount(): Promise<void> {
    const success = await registrationStore.register()

    if (success) {
        close()
    }
}

</script>
<template>
    <BaseModal :isOpen="isOpen" :title="'Create Account'" :subtitle="'Join and start learning today'" @close="close">
        <template #back>
            <button v-if="currentStep > 1" class="cursor-pointer" @click="registrationStore.prevStep">
                <Icon name="BackIcon" class="rotate-180" />
            </button>
        </template>
        <CreateAccountForm @submit="createAccount" @toLogIn="openLoginModal" />
    </BaseModal>
</template>