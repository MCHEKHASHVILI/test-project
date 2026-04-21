<script setup lang="ts">
import IconLoader from './IconLoader.vue'
</script>

<template>
    <div class="custom-label flex flex-col items-center justify-between">
        <IconLoader name="Upload" height="34px" width="34px" class=" text-grayscale-300" />
        <p>Drag & Drop or <span
                class="text-purple-600 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%]">Upload
                File</span></p>
        <small class="text-xs">JPG, PNG or WebP</small>
    </div>
</template>