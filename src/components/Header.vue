<script setup lang="ts">
import { ref } from 'vue'
import Icon from './shared/Icon.vue'
import AppLink from './shared/AppLink.vue'
import BaseAvatar from './shared/BaseAvatar.vue'
import LogInModal from './modals/LogInModal.vue'
import RegisterModal from './modals/RegisterModal.vue'
import ProfileModal from './modals/ProfileModal.vue'
import EnrolledCoursesModal from './modals/EnrolledCoursesModal.vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'

const loginModalRef = ref<InstanceType<typeof LogInModal> | null>(null)
const registerModalRef = ref<InstanceType<typeof RegisterModal> | null>(null)
const profileModalRef = ref<InstanceType<typeof ProfileModal> | null>(null)
const enrolledCoursesModalRef = ref<InstanceType<typeof EnrolledCoursesModal> | null>(null)
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { logout } = authStore
const { isAuthenticated } = storeToRefs(authStore)
const { avatarUrl, ifProfileComplete } = storeToRefs(profileStore)
const details = ref()

function openLoginModal() {
  if (loginModalRef.value) {
    loginModalRef.value.open();
  }
}
function openEnrolledCoursesModal() {
  if (enrolledCoursesModalRef.value) {
    enrolledCoursesModalRef.value.open();
  }
}

function openProfileModal() {
  if (profileModalRef.value) {
    profileModalRef.value.open();
    details.value.removeAttribute('open')
  }
}
function openRegisterModal() {
  if (registerModalRef.value) {
    registerModalRef.value.open();
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
            <AppLink to="#"
              class="w-full group flex items-center justify-between gap-2 p-3.75 rounded-lg text-xl font-medium text-grayscale-600 hover:text-brand-yellow-500 transition-colors"
              @click.prevent="openEnrolledCoursesModal">
              <Icon name="Note" width="26" height="26" viewBox="0 0 24 22"
                class="[&_path]:stroke-grayscale-600! group-hover:[&_path]:stroke-brand-yellow-500!" />
              <span>Enrolled Courses</span>
            </AppLink>
          </li>
        </ul>
        <details v-if="isAuthenticated" class="relative" ref="details">
          <summary class="list-none cursor-pointer">
            <BaseAvatar :status="ifProfileComplete ? 'active' : 'away'" :avatar="avatarUrl" />
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
            <button class="btn-outline w-28.5 h-15 py-3 px-4" @click="openLoginModal">
              Log In
            </button>
          </li>
          <li>
            <button class="btn-primary w-31.25 h-15 py-3 px-4" @click="openRegisterModal">
              Sign Up
            </button>
          </li>
        </ul>
      </section>
    </nav>
  </header>
  <LogInModal v-if="!isAuthenticated" ref="loginModalRef" @toRegister="openRegisterModal" />
  <RegisterModal v-if="!isAuthenticated" ref="registerModalRef" @toLogIn="openLoginModal" />
  <ProfileModal v-if="isAuthenticated" ref="profileModalRef" />
  <EnrolledCoursesModal v-if="isAuthenticated" ref="enrolledCoursesModalRef" />
</template>
