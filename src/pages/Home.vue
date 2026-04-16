<script setup lang="ts">
import { onMounted } from 'vue'
import MainSlider from '@/components/sliders/MainSlider.vue'
import FeaturedCourseCard from '@/components/cards/FeaturedCourseCard.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'

const coursesStore = useCoursesStore()
const { featuredCourses } = storeToRefs(coursesStore)
const { fetchFeaturedCourses } = coursesStore
onMounted(async () => {
  fetchFeaturedCourses()
})

</script>
<template>
  <MainSlider />
  <section name="featured-courses" class="wrapper mt-20 flex flex-col gap-8">
    <div class="flex flex-col justify-between gap-1.5">
      <h1 class="text-[40px] font-semibold text-grayscale-950">Start Learning Today</h1>
      <h2 class="text-lg font-medium text-grayscale-700">Choose from our most popular courses and begin your journey
      </h2>
    </div>
    <div class="flex flex-row justify-between gap-6">
      <FeaturedCourseCard v-for="course in featuredCourses" :key="course.id" :course="course" />
    </div>
  </section>
</template>
