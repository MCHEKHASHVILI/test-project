<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
</script>

<template>
    <div class="custom-label flex flex-col items-center">
        <BaseIcon name="Upload" />
        <p>Drag & Drop or <span
                class="text-purple-600 font-medium text-center underline decoration-solid underline-offset-[25%] decoration-[0%]">Upload
                File</span></p>
        <small class="text-xs">JPG, PNG or WebP</small>
    </div>
</template>