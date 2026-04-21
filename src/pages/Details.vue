<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import RouterBreadCrumbs from '@/components/shared/RouterBreadCrumbs.vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import EnrollCourseForm from '@/components/form/EnrollCourseForm.vue'
import CompleteCourseForm from '@/components/form/CompleteCourseForm.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'
const coursesStore = useCoursesStore()
const { getCourseDetailed, getAvgRating } = storeToRefs(coursesStore)
const { fetchCourse, fetchSchedules } = coursesStore
const route = useRoute()
onMounted(() => {
  fetchCourse()
  fetchSchedules()
})
watch(route, () => {
  fetchCourse()
  fetchSchedules()
})
</script>
<template>
  <div v-if="getCourseDetailed" class="flex flex-col gap-6">
    <RouterBreadCrumbs />
    <h1 class="text-[40px] font-semibold text-grayscale-900" v-text="getCourseDetailed.title" />
    <div class="flex flex-row items-start justify-between">
      <article class="w-225 flex flex-col gap-4.5">
        <div class="w-full h-120 rounded-[10px]">
          <img
            :src="getCourseDetailed.image"
            alt="Course Image"
            class="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <div class="w-full flex flex-row items-center justify-start">
          <div class="w-full flex flex-row items-center justify-start space-x-4">
            <div class="flex flex-row items-center text-grayscale-600 justify-start gap-1">
              <BaseIcon name="calendar" />
              <span class="text-sm font-medium">{{ getCourseDetailed.durationWeeks }} Weeks</span>
            </div>
            <div class="flex flex-row items-center justify-start text-grayscale-600 gap-1">
              <BaseIcon name="clock" />
              <span class="text-sm font-medium">{{ getCourseDetailed.hours }} Hours</span>
            </div>
          </div>
          <div class="w-full flex flex-row items-center justify-end space-x-4">
            <div class="flex flex-row items-center justify-start gap-1">
              <BaseIcon name="star" class="text-star-dark [&_path]:stroke-0.125" />
              <span class="text-sm font-medium text-grayscale-600" v-text="getAvgRating" />
            </div>
            <div class="text-md font-medium text-grayscale-500">
              <div
                class="items-center w-fit flex flex-row justify-start gap-2.5 bg-grayscale-50 text-grayscale-600 rounded-xl py-2 px-3"
              >
                <BaseIcon :name="getCourseDetailed?.category.icon" />
                <span>{{ getCourseDetailed?.category.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="box-border inline-flex items-center">
            <div
              class="w-fit flex flex-row space-x-2.5 items-center bg-grayscale-50 rounded-xl py-2 px-3"
            >
              <div class="w-7.5 h-7.5 rounded-sm overflow-hidden">
                <img
                  :src="getCourseDetailed.instructor.avatar"
                  class="w-full h-full rounded-sm object-cover"
                />
              </div>
              <span>{{ getCourseDetailed.instructor.name }}</span>
            </div>
          </label>
        </div>
        <article class="flex flex-col gap-4">
          <h4 class="text-xl font-semibold text-grayscale-400 leading-6">Course Description</h4>
          <p
            class="text-md font-medium text-grayscale-600"
            v-text="getCourseDetailed.description"
          />
        </article>
      </article>
      <section class="w-140">
        <Transition
          name="fade"
          mode="out-in"
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <EnrollCourseForm v-if="!getCourseDetailed.enrollment" />
          <CompleteCourseForm v-else />
        </Transition>
      </section>
    </div>
  </div>
</template>
