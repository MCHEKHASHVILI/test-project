<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main class="wrapper py-16 gap-16">
    <slot />
  </main>
</template>
