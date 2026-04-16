<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseAvatar from '../shared/BaseAvatar.vue'
import TextInput from '../form/TextInput.vue'
import SelectInput from '../form/SelectInput.vue'
import FileInput from '../form/FileInput.vue'
import FileUploadIdle from '../shared/FileUploadIdle.vue'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const isOpen = ref<boolean>(false)

function close(): void {
    isOpen.value = false
}
function open(): void {
    isOpen.value = true
}

defineExpose({ open })

const ageOptions = Array.from({ length: 120 }, (_, i) => {
    return { value: i, label: i }
}).filter(value => value.value > 18)

const profileStore = useProfileStore()
const { email, avatar, userName, fullName, mobileNumber, age, avatarUrl, ifProfileComplete } = storeToRefs(profileStore)

async function updateProfile(): Promise<void> {
    const success = await profileStore.updateProfile()
    if (success) {
        close()
    }
}

onMounted(() => {
    profileStore.fetchProfile()
})

</script>
<template>
    <BaseModal :isOpen="isOpen" :title="'Profile'" @close="close">
        <div class="flex flex-row space-x-2.5 items-center justify-start mb-6">
            <BaseAvatar :status="ifProfileComplete ? 'active' : 'away'" :avatar="avatarUrl" />
            <div class="flex flex-col">
                <h4 v-text="userName" />
                <small v-text="'Profile is Complete'" />
            </div>
        </div>
        <form class="modal" @submit.prevent="updateProfile" enctype="multipart/form-data">
            <TextInput type="text" label="Full Name" icon="edit" v-model="fullName" />
            <TextInput type="email" label="Email" icon="eye" :placeholder="email?.toString() || ''" disabled />
            <div class="flex flex-row gap-2">
                <TextInput type="text" label="Mobile Number" icon="check-sm" prefix="+995" v-model="mobileNumber"
                    class="w-full" />
                <SelectInput :options="ageOptions" label="Age" icon="eye" v-model="age" class="shrink-2" />
            </div>
            <FileInput label="Upload Avatar" v-model="avatar" :idle_component="FileUploadIdle"
                accepted-file-types="image/jpeg, image/png, image/webp" :allow-multiple="false" />
            <button class="btn-primary" type="submit" v-text="'Update Profile'" />
        </form>
    </BaseModal>
</template>