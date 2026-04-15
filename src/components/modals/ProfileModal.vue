<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseAvatar from '../shared/BaseAvatar.vue'
import TextInput from '../form/TextInput.vue'
import SelectInput from '../form/SelectInput.vue'
import FileInput from '../form/FileInput.vue'
import Icon from '../shared/Icon.vue'
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
const { avatar, fullName, mobileNumber, age, avatarUrl, ifProfileComplete } = storeToRefs(profileStore)

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
                <h4 v-text="fullName" />
                <small v-text="'Profile is Complete'" />
            </div>
        </div>
        <form class="modal" @submit.prevent="updateProfile" enctype="multipart/form-data">
            <TextInput type="text" label="Full Name" v-model="fullName" />
            <TextInput type="email" label="Email" icon="eye" disabled />
            <div class="flex flex-row gap-2">
                <TextInput type="text" label="Mobile Number" v-model="mobileNumber" class="w-full" />
                <SelectInput :options="ageOptions" label="Age" v-model="age" class="shrink-2" />
            </div>
            <FileInput label="Upload Avatar" v-model="avatar" accepted-file-types="image/jpeg, image/png, image/webp"
                :allow-multiple="false">
                <template #idle>
                    <div class="custom-label flex flex-col items-center">
                        <Icon name="Upload" />
                        <p>Drag & Drop or <span
                                class="text-brand-yellow-600 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%] ">Upload
                                File</span></p>
                        <small class="text-xs">JPG, PNG or WebP</small>
                    </div>
                </template>
            </FileInput>
            <button class="btn-primary" type="submit" v-text="'Update Profile'" />
        </form>
    </BaseModal>
</template>