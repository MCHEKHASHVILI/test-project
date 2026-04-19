<script setup lang="ts">
import { CourseEnrolled } from '@/types';
import AppLink from '@/components/shared/AppLink.vue';
import BaseIcon from '@/components/shared/BaseIcon.vue';
defineProps<{ data: CourseEnrolled }>()
</script>
<template>
    <div v-if="data?.course" class="card card-progress">
        <div class="flex flex-row items-start justify-between gap-4">
            <div class="h-35 aspect-square rounded-[10px]">
                <img :src="data.course.image" alt="Course Image"
                    class="w-full h-full aspect-square object-cover rounded-[10px]" />
            </div>
            <div class="w-full flex flex-col justify-between gap-2">
                <div class="flex flex-row items-center justify-between">
                    <small class="text-grayscale-500 font-medium text-nowrap" v-text="data.course.instructor.name" />
                    <div class="flex items-center gap-1 w-full justify-end">
                        <BaseIcon name="Star" alt="Average Rating" class="w-4 h-4 text-helper-warning" />
                        <span class="text-sm font-medium text-grayscale-600">4.9</span>
                    </div>
                </div>
                <h4 class="text-xl font-semibold text-grayscale-900 leading-6" v-text="data.course.title" />
            </div>
        </div>
        <div class="flex flex-row items-center justify-between gap-5">
            <div class="flex flex-col w-full gap-1 items-start justify-between">
                <span class="text-normal font-medium text-grayscale-900 leading-6 capitalize"
                    v-text="`${data.progress}% Completed`" />
                <div class="w-full bg-purple-100 rounded-full h-3.75">
                    <div class="bg-purple-500 h-3.75 rounded-[30px] transform duration-300 transition-all"
                        :style="{ width: `${data.progress}%` }"></div>
                </div>
            </div>
            <AppLink :to="{ name: 'details', params: { id: data.course.id } }">
                <button class="btn-outline text-nowrap">
                    View
                </button>
            </AppLink>
        </div>
    </div>
</template>