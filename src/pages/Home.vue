<script setup lang="ts">
import { onMounted } from 'vue'
import MainSlider from '@/components/sliders/MainSlider.vue'
import FeaturedCourseCard from '@/components/cards/FeaturedCourseCard.vue'
import EnrolledCourseSmallCard from '@/components/cards/EnrolledCourseSmallCard.vue'
import EnrolledCourseCard from '@/components/cards/EnrolledCourseCard.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'

const coursesStore = useCoursesStore()
const { getCoursesFeatured, getCoursesEnrolled } = storeToRefs(coursesStore)
const { fetchCoursesFeatured, fetchCoursesEnrolled } = coursesStore
onMounted(async () => {
  fetchCoursesFeatured()
  fetchCoursesEnrolled()
})

</script>
<template>
  <MainSlider />
  <div class="flex flex-col">
    <section v-if="getCoursesEnrolled.slice(0, 3).length" name="continue-learning"
      class="wrapper mt-20 flex flex-col gap-8">
      <div class="flex flex-col justify-between gap-1.5">
        <h1 class="text-[40px] font-semibold text-grayscale-950">Continue Learning</h1>
        <div class="flex flex-row w-full items-center justify-between">
          <h2 class="text-lg font-medium text-grayscale-700" v-text="'Pick up where you left'" />
          <AppLink :to="{ name: 'action.modal', params: { name: 'EnrolledCoursesModal' } }">
            <span class="text-purple-500 text-xl font-medium capitalize underline" v-text="'see all'" />
          </AppLink>
        </div>
      </div>
      <div class="grid grid-cols-3 justify-between gap-6">
        <EnrolledCourseSmallCard v-for="course in getCoursesEnrolled.slice(0, 3)" :key="course.id" :data="course" />
      </div>
    </section>
    <section v-if="getCoursesFeatured" name="featured-courses" class="wrapper mt-20 flex flex-col gap-8">
      <div class="flex flex-col justify-between gap-1.5">
        <h1 class="text-[40px] font-semibold text-grayscale-950">Start Learning Today</h1>
        <h2 class="text-lg font-medium text-grayscale-700">Choose from our most popular courses and begin your journey
        </h2>
      </div>
      <div class="grid grid-cols-3 justify-between gap-6">
        <FeaturedCourseCard v-for="course in getCoursesFeatured" :key="course.id" :course="course" />
      </div>
    </section>
  </div>
</template>
