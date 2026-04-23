<script setup lang="ts">
import { ref } from 'vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import StarRating from '@/components/form/StarRating.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'
const coursesStore = useCoursesStore()
const { courseRating } = storeToRefs(coursesStore)
const { getCourseDetailed, getAvgRating, completeCourse, rateCourse, retakeCourse } = coursesStore
const isRatingVisible = ref<boolean>(true)
</script>
<template>
  <div v-if="!!getCourseDetailed" class="w-full flex flex-col justify-between gap-12">
    <div class="flex flex-col gap-5.5">
      <Transition name="fade" mode="out-in" enter-active-class="duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="getCourseDetailed.enrollment.progress < 100" class="w-fit p-4 bg-[#736BEA1A] rounded-full">
          <span class="text-purple-400 text-heading-4 leading-6 capitalize" v-text="'enrolled'" />
        </div>
        <div v-else class="w-fit p-4 bg-helper-success-light rounded-full">
          <span class="text-helper-success text-heading-4 leading-6 capitalize" v-text="'completed'" />
        </div>
      </Transition>
      <div class="flex flex-row items-center gap-2 justify-start">
        <IconLoader name="calendar" class="text-[24px] text-grayscale-600" />
        <small class="text-body-l text-grayscale-600"
          v-text="getCourseDetailed.enrollment.schedule.weeklySchedule.label" />
      </div>
      <div class="flex flex-row items-center gap-2 justify-start">
        <IconLoader name="clock" class="text-[24px] text-grayscale-600" />
        <small class="text-body-l text-grayscale-600" v-text="getCourseDetailed.enrollment.schedule.timeSlot.label" />
      </div>
      <div class="flex flex-row items-center gap-2 justify-start">
        <IconLoader name="users" class="text-[24px] text-grayscale-600" />
        <small class="text-body-l text-grayscale-600 capitalize"
          v-text="getCourseDetailed.enrollment.schedule.sessionType.name" />
      </div>
      <div class="flex flex-row items-center gap-2 justify-start">
        <IconLoader name="map_pin" class="text-[24px] text-grayscale-600" />
        <small class="text-body-l text-grayscale-600" v-text="getCourseDetailed.enrollment.schedule.location || '-'" />
      </div>
    </div>
    <div class="flex flex-col gap-10">
      <div class="flex flex-col w-full gap-3 items-start justify-between">
        <span class="text-heading-4 leading-6 text-grayscale-600 capitalize"
          v-text="`${getCourseDetailed.enrollment.progress}% Completed`" />
        <div class="w-full bg-purple-100 rounded-full h-6">
          <div class="bg-purple-500 h-6 rounded-[30px] transform duration-300 transition-all"
            :style="{ width: `${getCourseDetailed.enrollment.progress}%` }"></div>
        </div>
      </div>
      <button v-if="getCourseDetailed.enrollment.progress < 100" class="btn-primary text-button-m"
        @click="completeCourse">
        <div class="flex flex-row items-center justify-center space-x-2.5">
          <span class="capitalize" v-text="'complete course'" />
          <IconLoader name="check_2" class="text[24px]" />
        </div>
      </button>
      <button v-else class="btn-primary" @click="retakeCourse">
        <div class="flex flex-row items-center justify-center space-x-2.5">
          <span class="capitalize" v-text="'retake course'" />
          <IconLoader name="retake" class="text[24px]" />
        </div>
      </button>
    </div>
    <Transition leave-active-class="transition-opacity duration-300 ease-out" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isRatingVisible"
        class="relative flex flex-col items-center gap-4.5 py-10 px-12.5 -mt-2 rounded-lg bg-grayscale-50">
        <div class="absolute inset-0 top-3 text-end px-3 w-full h-auto">
          <button class="cursor-pointer text-[13.2px] text-grayscale-400" @click="isRatingVisible = false">
            <IconLoader name="XIcon" class="text-[14px]" />
          </button>
        </div>
        <span class="text-grayscale-600 text-body-s leading-6 lowercase first-letter:capitalize" v-text="!getCourseDetailed.isRated ? 'rate your experience' : `you've already rated this course`
          " />
        <div v-if="!getCourseDetailed.isRated" class="flex flex-row items-center justify-between">
          <StarRating v-model="courseRating" :actualRating="getAvgRating" iconName="StarBlank"
            color="var(--color-star-dark)" :maxRating="5" :width="50" :height="50" class="gap-4.5"
            @change="rateCourse" />
        </div>
      </div>
    </Transition>
  </div>
</template>
