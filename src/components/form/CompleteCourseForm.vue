<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon.vue';
import StarRating from '@/components/form/StarRating.vue';
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia';
const coursesStore = useCoursesStore()
const { courseRating } = storeToRefs(coursesStore)
const { getCourseDetailed, getAvgRating, completeCourse, rateCourse, retakeCourse } = coursesStore
</script>
<template>
    <div v-if="!!getCourseDetailed" class="w-full flex flex-col justify-between gap-5.5">
        <Transition name="fade" mode="out-in" enter-active-class="duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="getCourseDetailed.enrollment.progress < 100" class="w-fit p-4 bg-[#736BEA1A] rounded-full">
                <span class="text-purple-400 text-xl font-semibold capitalize" v-text="'enrolled'" />
            </div>
            <div v-else class="w-fit p-4 bg-helper-success-light rounded-full">
                <span class="text-helper-success text-xl font-semibold capitalize" v-text="'completed'" />
            </div>
        </Transition>
        <div class="flex flex-row items-center gap-2 justify-start">
            <BaseIcon name="calendar" class="w-4 h-4 text-grayscale-600" />
            <small class="text-xl font-medium text-grayscale-600"
                v-text="getCourseDetailed.enrollment.schedule.weeklySchedule.label" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
            <BaseIcon name="clock" class="w-4 h-4 text-grayscale-600" />
            <small class="text-xl font-medium text-grayscale-600"
                v-text="getCourseDetailed.enrollment.schedule.timeSlot.label" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
            <BaseIcon name="contacts" class="w-4 h-4 text-grayscale-600" />
            <small class="text-xl font-medium text-grayscale-600 capitalize"
                v-text="getCourseDetailed.enrollment.schedule.sessionType.name" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
            <BaseIcon name="location" class="w-4 h-4 text-grayscale-600" />
            <small class="text-xl font-medium text-grayscale-600"
                v-text="getCourseDetailed.enrollment.schedule.location || '-'" />
        </div>
        <div class="flex flex-col gap-12">
            <div class="flex flex-col w-full gap-3 items-start justify-between">
                <span class="text-xl font-medium text-grayscale-600 capitalize"
                    v-text="`${getCourseDetailed.enrollment.progress}% Completed`" />
                <div class="w-full bg-purple-100 rounded-full h-6">
                    <div class="bg-purple-500 h-6 rounded-[30px] transform duration-300 transition-all"
                        :style="{ width: `${getCourseDetailed.enrollment.progress}%` }"></div>
                </div>
            </div>
            <button v-if="getCourseDetailed.enrollment.progress < 100" class="btn-primary" @click="completeCourse">
                <div class="flex flex-row items-center justify-center space-x-2.5">
                    <span class="capitalize" v-text="'complete course'" />
                    <BaseIcon name="check" />
                </div>
            </button>
            <button v-else class="btn-primary" @click="retakeCourse">
                <div class="flex flex-row items-center justify-center space-x-2.5">
                    <span class="capitalize" v-text="'retake course'" />
                    <BaseIcon name="refresh" />
                </div>
            </button>
        </div>
        <div class="flex flex-col items-center gap-4.5 py-10 px-12.5 rounded-lg bg-grayscale-50 ">
            <span class="text-grayscale-600 text-[16px] font-medium leading-6 lowercase first-letter:capitalize"
                v-text="!getCourseDetailed.isRated ? 'rate your experience' : `you've already rated this course`" />
            <div v-if="!getCourseDetailed.isRated" class="flex flex-row items-center justify-between">
                <StarRating v-model="courseRating" :actualRating="getAvgRating" iconName="StarBlank"
                    color="var(--color-star-dark)" :maxRating="5" :width="50" :height="50" class="gap-4.5"
                    @change="rateCourse" />
            </div>
        </div>
    </div>
</template>