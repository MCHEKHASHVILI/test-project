<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon.vue'
import AppLink from '../shared/AppLink.vue';
import { Course } from '@/types'
defineProps<{ course: Course }>()
</script>
<template>
    <div class="card card-dashboard">
        <div class="flex flex-col justify-between gap-4 h-full">
            <img class="h-65.5 w-full object-cover rounded-[10px]" :src="course.image" :alt="course.title" />
            <div class="flex flex-row justify-between items-center">
                <small class="text-sm font-medium text-grayscale-500 w-full">Lecturer {{ course.instructor.name
                    }}</small>
                <div class="flex items-center gap-1 w-full justify-end">
                    <BaseIcon name="Star" alt="Average Rating" width="16" height="16" class="text-star-dark" />
                    <span class="text-sm font-medium text-grayscale-600">{{ course.avgRating }}</span>
                </div>
            </div>
            <h3 class="text-2xl font-semibold text-grayscale-900">{{ course.title }}</h3>
            <p class="text-md font-medium text-grayscale-500">{{ course.description }}</p>
            <div class="flex flex-row items-center justify-between">
                <div class="flex flex-row items-center justify-between gap-2">
                    <span class="text-xs font-medium text-grayscale-400 capitalize">starting from</span>
                    <h2 class="text-[32px] font-semibold text-grayscale-900">${{ course.basePrice }}</h2>
                </div>
                <AppLink :to="{ name: 'details', params: { id: course.id } }"
                    class="btn-primary first-letter:capitalize " v-text="'details'" />
            </div>
        </div>
    </div>
</template>