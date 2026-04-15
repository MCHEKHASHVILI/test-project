<script setup lang="ts">
import { ref } from 'vue'
import Icon from './shared/Icon.vue'
import AppLink from './shared/AppLink.vue'
import BaseAvatar from './shared/BaseAvatar.vue'
import LogInModal from './modals/LogInModal.vue'
import ProfileModal from './modals/ProfileModal.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const loginModalRef = ref<InstanceType<typeof LogInModal> | null>(null)
const profileModalRef = ref<InstanceType<typeof ProfileModal> | null>(null)
const authStore = useAuthStore()
const { logout } = authStore
const { isAuthenticated } = storeToRefs(authStore)
const details = ref()
function openLoginModal() {
  if (loginModalRef.value) {
    loginModalRef.value.open();
  }
}

function openProfileModal() {
  if (profileModalRef.value) {
    profileModalRef.value.open();
    details.value.removeAttribute('open')
  }
}

</script>
<template>
  <header class="py-6 border-b border-grayscale-200 drop-shadow-[4%]">
    <nav class="wrapper flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }"
        class="flex items-center justify-center bg-brand-yellow-500 w-15 h-15 rounded-[14px]">
        <Icon name="ApplicationLogo" width="29" height="30" viewBox="0 0 32 33" />
      </RouterLink>
      <section class="flex items-center gap-9">
        <ul class="flex flex-row gap-2">
          <li>
            <AppLink :to="{ name: 'courses' }"
              class="w-full group flex items-center justify-between gap-2 p-3.75 rounded-lg text-xl font-medium text-grayscale-600 hover:text-brand-yellow-500 transition-colors">
              <Icon name="Stars" width="26" height="26" viewBox="0 0 26 26"
                class="[&_path]:stroke-grayscale-600! group-hover:[&_path]:stroke-brand-yellow-500!" />
              <span>Browse Courses</span>
            </AppLink>

          </li>
          <li v-if="isAuthenticated">
            <AppLink :to="{ name: 'courses' }"
              class="w-full group flex items-center justify-between gap-2 p-3.75 rounded-lg text-xl font-medium text-grayscale-600 hover:text-brand-yellow-500 transition-colors">
              <Icon name="Note" width="26" height="26" viewBox="0 0 24 22"
                class="[&_path]:stroke-grayscale-600! group-hover:[&_path]:stroke-brand-yellow-500!" />
              <span>Enrolled Courses</span>
            </AppLink>
          </li>
        </ul>
        <details v-if="isAuthenticated" class="relative" ref="details">
          <summary class="list-none cursor-pointer">
            <BaseAvatar :status="authStore.userProfile.profileComplete ? 'active' : 'away'"
              :avatar="authStore.userProfile.avatar" />
          </summary>
          <div class="absolute right-0 mt-2 w-48 p-4 bg-grayscale-50 rounded-lg shadow-lg z-10">
            <button class="text-grayscale-500 w-full cursor-pointer hover:bg-grayscale-100"
              @click="openProfileModal">Profile</button>
            <hr class="my-1 border-gray-200">
            <button class="text-helper-error-light w-full cursor-pointer hover:bg-grayscale-100" @click="logout">Log
              Out</button>
          </div>
        </details>
        <ul v-if="!isAuthenticated" class="flex gap-3.75">
          <li>
            <button
              class="w-28.5 h-15 py-3 px-4 bg-transparent text-xl font-medium text-brand-yellow-500 border-2 border-brand-yellow-300 rounded-lg cursor-pointer"
              @click="openLoginModal">
              Log In
            </button>
          </li>
          <li>
            <button
              class="w-31.25 h-15 py-3 px-4 text-grayscale-50 text-xl font-medium bg-brand-yellow-500 rounded-lg cursor-pointer">
              Sign Up
            </button>
          </li>
        </ul>
      </section>
    </nav>
  </header>
  <LogInModal ref="loginModalRef" />
  <ProfileModal ref="profileModalRef" />
</template>
