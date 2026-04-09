<script setup lang="ts">
import NaviLink from './buttons/NaviLink.vue'
import StarsSVG from '@/assets/svg/Stars.svg?url'
</script>
<template>
  <header class="py-6 border-b-1 border-grayscale-200 drop-shadow-[4%]">
    <nav class="wrapper flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }">
        <img src="@/assets/svg/ApplicationLogo.svg" alt="Logo" class="logo" />
      </RouterLink>
      <section class="flex items-center gap-9">
        <ul class="flex">
          <li>
            <NaviLink routeName="courses" title="Browse Courses" :icon="StarsSVG" alt="Browse Courses" />
          </li>
        </ul>
        <ul class="flex gap-3.75">
          <li>
            <button
              class="w-28.5 h-15 py-3 px-4 bg-transparent text-xl font-medium text-brand-yellow-500 border-2 border-brand-yellow-300 rounded-lg cursor-pointer">
              Log In
            </button>
          </li>
          <li>
            <button
              class="w-31.25 h-15 py-3 px-4 text-grayscale-50 text-xl font-medium bg-brand-yellow-500 border-2 border-brand-yellow-300 rounded-lg cursor-pointer">
              Sign Up
            </button>
          </li>
        </ul>
      </section>
    </nav>
  </header>
</template>
