<script setup lang="ts">
import Icon from './shared/Icon.vue';
import AppLink from './shared/AppLink.vue';
</script>
<template>
  <header class="py-6 border-b border-grayscale-200 drop-shadow-[4%]">
    <nav class="wrapper flex justify-between items-center">
      <RouterLink :to="{ name: 'home' }"
        class="flex items-center justify-center bg-brand-yellow-500 w-15 h-15 rounded-[14px]">
        <Icon name="ApplicationLogo" width="29" height="30" viewBox="0 0 32 33" />
      </RouterLink>
      <section class="flex items-center gap-9">
        <ul class="flex">
          <li>
            <AppLink :to="{ name: 'courses' }"
              class="w-full group flex items-center gap-2 p-3.75 rounded-lg text-xl font-medium text-grayscale-600 hover:text-brand-yellow-500 transition-colors">
              <Icon name="Stars" width="21" height="25" viewBox="0 0 26 26"
                class="[&_path]:stroke-grayscale-600! group-hover:[&_path]:stroke-brand-yellow-500!" />
              <span>Browse Courses</span>
            </AppLink>
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
              class="w-31.25 h-15 py-3 px-4 text-grayscale-50 text-xl font-medium bg-brand-yellow-500 rounded-lg cursor-pointer">
              Sign Up
            </button>
          </li>
        </ul>
      </section>
    </nav>
  </header>
</template>
