<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseModal from '@/layouts/modals/BaseModal.vue'
import BaseAvatar from '../shared/BaseAvatar.vue'
import TextInput from '../form/TextInput.vue'
import SelectInput from '../form/SelectInput.vue'
import FileInput from '../form/FileInput.vue'
import FileUploadIdle from '../shared/FileUploadIdle.vue'
import { useProfileStore } from '@/stores/profile'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useRouter } from 'vue-router'
const router = useRouter()
const modalStore = useModalStore()
const { activeModal } = storeToRefs(modalStore)
const apiStore = useApiStore()
const { getErrors } = storeToRefs(apiStore)

const profileStore = useProfileStore()

const {
  email,
  avatar,
  userName,
  fullName,
  mobileNumber,
  age,
  avatarUrl,
  ifProfileComplete,
  ageOptions,
} = storeToRefs(profileStore)
const { updateProfile } = profileStore

function onClose() {
  if (ifProfileComplete.value) return modalStore.closeModal()
  router.push({ name: 'action.modal', params: { name: "ProfileAlertModal" } })
}

onMounted(() => {
  profileStore.fetchProfile()
})
</script>
<template>
  <BaseModal :isOpen="!!activeModal" :title="'Profile'" @close="onClose">
    <div class="flex flex-row gap-3 items-center justify-start mb-6">
      <BaseAvatar :status="ifProfileComplete ? 'active' : 'away'" :avatar="avatarUrl" />
      <div class="flex flex-col gap-1 justify-between text-grayscale-950">
        <h4 class="text-heading-4 leading-6" v-text="userName" />
        <span
          :class="['text-helper-regular-xs capitalize', ifProfileComplete ? 'text-helper-success' : 'text-helper-warning']"
          v-text="ifProfileComplete ? 'profile Complete ✓' : 'profile incomplete'" />
      </div>
    </div>
    <form class="modal" @submit.prevent="updateProfile" enctype="multipart/form-data">
      <TextInput type="text" label="Full Name" icon="pencil_simple" v-model="fullName" :errors="getErrors?.full_name"
        placeholder="Full name" />
      <TextInput type="email" label="Email" icon="check" :placeholder="email?.toString() || ''" disabled />
      <div class="flex flex-row gap-2">
        <TextInput type="text" label="Mobile Number" icon="check" prefix="+995" v-model="mobileNumber" class="grow"
          :errors="getErrors?.mobile_number" />
        <SelectInput :options="ageOptions" label="Age" icon="arrow" v-model="age" :errors="getErrors?.age" />
      </div>
      <FileInput label="Upload Avatar" v-model="avatar" :idle_component="FileUploadIdle"
        accepted-file-types="image/jpeg, image/png, image/webp" :allow-multiple="false" />
      <button class="btn-primary text-button-s" type="submit" v-text="'Update Profile'" />
    </form>
  </BaseModal>
</template>
