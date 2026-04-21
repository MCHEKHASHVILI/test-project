<script setup lang="ts">
import IconLoader from '@/components/shared/IconLoader.vue'
import AppLink from '@/components/shared/AppLink.vue';
import AvgRating from '@/components/shared/AvgRating.vue';
import { Course } from '@types'
defineProps<{ course: Course }>();
</script>
<template>
    <div class="card card-listing flex flex-col justify-between gap-6">
        <div class="flex flex-col justify-between gap-4.5">
            <img :src="course.image" :alt="course.title" />
            <div class="flex flex-col justify-between gap-3">
                <div class="flex flex-row justify-between items-center">
                    <div
                        class="text-body-xs text-grayscale-500 w-full flex flex-row justify-start space-x-1 text-nowrap">
                        <small v-text="course.instructor.name" />
                        <small>|</small>
                        <small v-text="course.durationWeeks" />
                        <small>Weeks</small>
                    </div>
                    <AvgRating :value="course.avgRating" />
                </div>
                <h3 class="text-heading-3 text-grayscale-950" v-text="course.title" />
            </div>
            <div class="text-body-xs text-grayscale-600">
                <div class="chips-label">
                    <IconLoader v-if="'icon' in course.category" :name="course.category.icon" />
                    <span v-text="course.category.name" />
                </div>
            </div>
            <div class="flex flex-row items-center justify-between">
                <div class="flex flex-col items-start justify-around">
                    <span class="text-helper-medium text-grayscale-400 capitalize">starting from</span>
                    <h2 class="text-heading-3 text-grayscale-800" v-text="`$${course.basePrice}`" />
                </div>
                <AppLink :to="{ name: 'details', params: { id: course.id } }"
                    class="btn-primary text-button-s first-letter:capitalize" v-text="'details'" />
            </div>
        </div>
    </div>
</template>