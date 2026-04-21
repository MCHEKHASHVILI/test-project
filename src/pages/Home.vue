<script setup lang="ts">
import { onMounted, watch } from 'vue'
import MainSlider from '@/components/sliders/MainSlider.vue'
import FeaturedCourseCard from '@/components/cards/FeaturedCourseCard.vue'
import EnrolledCourseSmallCard from '@/components/cards/EnrolledCourseSmallCard.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useCoursesStore } from '@/stores/courses'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { CourseEnrolled } from '@/types'
import router from '@/router'
import IconLoader from '@/components/shared/IconLoader.vue'
const coursesStore = useCoursesStore()
const { getCoursesFeatured, getCoursesEnrolled } = storeToRefs(coursesStore)
const { fetchCoursesFeatured, fetchCoursesEnrolled } = coursesStore
const { isAuthenticated } = storeToRefs(useAuthStore())
watch(
  isAuthenticated,
  () => {
    if (isAuthenticated.value) fetchCoursesEnrolled()
  },
  { immediate: true },
)
onMounted(async () => {
  fetchCoursesFeatured()
})
</script>
<template>
  <MainSlider />
  <div class="relative flex flex-col">
    <section
      v-if="isAuthenticated && getCoursesEnrolled.slice(0, 3).length"
      name="continue-learning"
      class="wrapper mt-20 flex flex-col gap-8"
    >
      <div class="flex flex-col justify-between gap-1.5">
        <h1 class="text-heading-1 tracking-normal text-grayscale-950">Continue Learning</h1>
        <div class="flex flex-row w-full items-center justify-between">
          <h2 class="text-body-m text-grayscale-700" v-text="'Pick up where you left'" />
          <AppLink :to="{ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }">
            <span class="text-underlined-m text-purple-500 capitalize" v-text="'see all'" />
          </AppLink>
        </div>
      </div>
      <div class="grid grid-cols-3 justify-between gap-6">
        <EnrolledCourseSmallCard
          v-for="course in getCoursesEnrolled.slice(0, 3)"
          :key="course.id"
          :data="course"
        />
      </div>
    </section>
    <section
      v-if="getCoursesFeatured"
      name="featured-courses"
      class="wrapper mt-20 flex flex-col gap-8"
    >
      <div class="flex flex-col justify-between gap-1.5">
        <h1 class="text-heading-1 text-grayscale-950">Start Learning Today</h1>
        <h2 class="text-body-m font-normal leading-6.5 text-grayscale-700">
          Choose from our most popular courses and begin your journey
        </h2>
      </div>
      <div class="grid grid-cols-3 justify-between gap-6">
        <FeaturedCourseCard v-for="course in getCoursesFeatured" :key="course.id" :data="course" />
      </div>
    </section>
    <section
      v-if="!isAuthenticated"
      name="continue-learning-fallback"
      class="wrapper mt-20 flex flex-col gap-8"
    >
      <div class="flex flex-col justify-between gap-1.5">
        <h1 class="text-heading-1 tracking-normal text-grayscale-950">Continue Learning</h1>
        <div class="flex flex-row w-full items-center justify-between">
          <h2 class="text-body-m text-grayscale-700" v-text="'Pick up where you left'" />
          <AppLink :to="{ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }">
            <span class="text-underlined-m text-purple-500 capitalize" v-text="'see all'" />
          </AppLink>
        </div>
      </div>
      <div class="relative grid grid-cols-3 justify-between gap-6">
        <div
          class="absolute inset-0 flex flex-col items-center justify-center rounded-xl backdrop-blur-[20px]"
        >
          <div class="h-full w-full flex items-center justify-center">
            <div
              class="bg-grayscale-50 border border-grayscale-300 rounded-xl py-8 px-14 flex flex-col items-center justify-between gap-6 transform duration-300 transition-all ease-out"
            >
              <span
                class="rounded-[50px] p-5 gap-2.5 bg-purple-100 text-purple-500 text-[37px] flex items-center justify-center"
              >
                <IconLoader name="Lock" />
              </span>
              <p class="text-body-s text-purple-900">Sign in to track your learning progress</p>
              <AppLink
                :to="router.resolve({ name: 'action.modal', params: { name: 'LogInModal' } })"
              >
                <button class="btn-primary text-button-s capitalize" v-text="'log in'" />
              </AppLink>
            </div>
          </div>
        </div>
        <EnrolledCourseSmallCard
          v-for="course in 3"
          :key="course"
          :data="{} as CourseEnrolled"
          :fallback="true"
        />
      </div>
    </section>
  </div>
</template>
