<script setup lang="ts">
import NaviLink from './buttons/NaviLink.vue';
import StarsSVG from '@/assets/svg/Stars.svg?url';
</script>
<template>
    <header class="py-6 border-b-1 border-grayscale-200 drop-shadow-[4%]">
        <nav class="wrapper flex justify-between items-center">
            <RouterLink :to="{ name: 'home' }">
                <img src="@/assets/svg/ApplicationLogo.svg" alt="Logo" class="logo" />
            </RouterLink>
            <ul class="flex space-x-4">
                <li>
                    <NaviLink to="{ name: 'courses' }" title="Browse Courses" :icon="StarsSVG" alt="Browse Courses" />
                </li>
                <li>
                    Login
                </li>
                <li>
                    Browse Courses
                </li>
            </ul>
        </nav>
    </header>
</template>