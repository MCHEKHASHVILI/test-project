<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue'
import BaseAvatar from '@/components/shared/BaseAvatar.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { isAuthenticated } = storeToRefs(authStore)
const { avatarUrl, ifProfileComplete } = storeToRefs(profileStore)
</script>
<template>
  <header class="py-6 border-b border-grayscale-200 drop-shadow-[4%]">
    <nav class="wrapper flex justify-between items-center h-15">
      <RouterLink :to="{ name: 'home' }"
        class="flex items-center justify-center bg-purple-500 w-15 aspect-square rounded-[14px] p-4 pr-4.25 pb-4.25">
        <IconLoader name="ApplicationLogo" class="text-grayscale-50 text-[30px]" />
      </RouterLink>
      <section class="flex items-center gap-9">
        <ul class="flex flex-row gap-2">
          <li>
            <AppLink :to="{ name: 'courses' }" class="nav-link">
              <IconLoader name="Stars" />
              <span>Browse Courses</span>
            </AppLink>
          </li>
          <li v-if="isAuthenticated">
            <AppLink :to="{ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }" class="nav-link">
              <IconLoader name="Note" />
              <span>Enrolled Courses</span>
            </AppLink>
          </li>
        </ul>
        <AppLink v-if="isAuthenticated" :to="{ name: 'action.modal', params: { name: 'ProfileModal' } }"
          class="flex items-center justify-around aspect-square rounded-full outline-offset-2">
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
