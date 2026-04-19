<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import BaseAvatar from '@/components/shared/BaseAvatar.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { logout } = authStore
const { isAuthenticated } = storeToRefs(authStore)
const { avatarUrl, ifProfileComplete } = storeToRefs(profileStore)
const details = ref()
</script>
<template>
  <header class="py-6 border-b border-grayscale-200 drop-shadow-[4%]">
    <nav class="wrapper flex justify-between items-center h-15">
      <RouterLink :to="{ name: 'home' }"
        class="flex items-center justify-center bg-purple-500 w-15 aspect-square rounded-[14px] p-4 pr-4.25 pb-4.25">
        <BaseIcon name="ApplicationLogo" class="scale-165" />
      </RouterLink>
      <section class="flex items-center gap-9">
        <ul class="flex flex-row gap-2">
          <li>
            <AppLink :to="{ name: 'courses' }" class="nav-link">
              <BaseIcon name="Stars" width="26" height="26" viewBox="0 0 26 26" />
              <span>Browse Courses</span>
            </AppLink>

          </li>
          <li v-if="isAuthenticated">
            <AppLink :to="{ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }" class="nav-link">
              <BaseIcon name="Note" width="26" height="26" viewBox="0 0 24 22" />
              <span>Enrolled Courses</span>
            </AppLink>
          </li>
        </ul>
        <!-- <details v-if="isAuthenticated" class="relative" ref="details">
          <summary class="list-none cursor-pointer">
            <BaseAvatar :status="ifProfileComplete ? 'active' : 'away'" :avatar="avatarUrl" />
          </summary>
          <div class="absolute right-0 mt-2 w-48 p-4 bg-grayscale-50 rounded-lg shadow-lg z-10">
            <AppLink :to="{ name: 'modal.profile' }"
              class="flex-1 text-grayscale-500 w-full cursor-pointer hover:bg-grayscale-100">
              Profile</AppLink>
            <hr class="my-1 border-gray-200">
            <AppLink :to="{ name: 'logout' }"
              class="flex-1 text-helper-error-light w-full cursor-pointer hover:bg-grayscale-100" @click="logout">Log
              Out</AppLink>
          </div>
        </details> -->
        <AppLink v-if="isAuthenticated" :to="{ name: 'action.modal', params: { name: 'ProfileModal' } }">
          <BaseAvatar :status="ifProfileComplete ? 'active' : 'away'" :avatar="avatarUrl" />
        </AppLink>
        <ul v-if="!isAuthenticated" class="flex gap-3.75">
          <li>
            <AppLink :to="{ name: 'action.modal', params: { name: 'LogInModal' } }">
              <button class="btn-outline w-28.5 h-15 py-3 px-4">Log In</button>
            </AppLink>
          </li>
          <li>
            <AppLink :to="{ name: 'action.modal', params: { name: 'RegisterModal' } }">
              <button class="btn-primary w-31.25 h-15 py-3 px-4">Sign Up</button>
            </AppLink>
          </li>
        </ul>
      </section>
    </nav>
  </header>
</template>
