<script setup lang="ts">
import IconLoader from './IconLoader.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-between">
    <span class="text-grayscale-300">
      <IconLoader name="Upload" width="34px" height="34px" />
    </span>
    <p>
      Drag & Drop or
      <span
        class="text-purple-600 text-underlined-s text-body-xs decoration-solid underline-offset-[25%] decoration-[0%]">Upload
        File</span>
    </p>
    <small class="text-xs">JPG, PNG or WebP</small>
  </div>
</template>
