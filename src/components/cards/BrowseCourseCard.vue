<script setup lang="ts">
import Icon from '@/components/shared/Icon.vue'
import { Course } from '@types'
defineProps<{ course: Course }>();
</script>
<template>
    <div class="w-full bg-grayscale-50 rounded-lg border-b border-grayscale-100 p-5">
        <div class="flex flex-col justify-between gap-4 h-full">
            <img class="h-65.5 w-full object-cover rounded-[10px]" :src="course.image" :alt="course.title" />
            <div class="flex flex-row justify-between items-center">
                <div class="text-sm font-medium text-grayscale-500 w-full flex flex-row justify-start space-x-1">
                    <small>{{ course.instructor.name }}</small>
                    <small>|</small>
                    <small>{{ course.durationWeeks }}</small>
                    <small>Weeks</small>
                </div>
                <div class="flex items-center gap-1 w-full justify-end">
                    <Icon name="Star" alt="Average Rating" class="w-4 h-4" />
                    <span class="text-sm font-medium text-grayscale-600">{{ course.avgRating }}</span>
                </div>
            </div>
            <h3 class="text-2xl font-semibold text-grayscale-900">{{ course.title }}</h3>
            <div class="text-md font-medium text-grayscale-500">
                <div
                    class="box-border items-center w-fit flex flex-row space-x-2.5 bg-grayscale-100 rounded-xl py-2 px-3">
                    <Icon v-if="'icon' in course.category" :name="course.category.icon" />
                    <span>{{ course.category.name }}</span>
                </div>
            </div>
            <div class="flex flex-row items-center justify-between">
                <div class="flex flex-col items-start justify-around">
                    <span class="text-xs font-medium text-grayscale-300 capitalize">starting from</span>
                    <h2 class="text-[24px] font-semibold text-grayscale-700">${{ course.basePrice }}</h2>
                </div>
                <button
                    class="py-4.25 px-6.25 rounded-lg leading-6 font-medium text-grayscale-50 bg-brand-yellow-500 cursor-pointer capitalize">
                    details
                </button>
            </div>
        </div>
    </div>
</template>