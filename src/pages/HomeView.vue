<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '@/api/apiClient';
import MainSlider from '@/components/sliders/MainSlider.vue'
import Icon from '@/components/shared/Icon.vue';
const featuredCourses = ref(null);

onMounted(async () => {
  try {
    const response = await apiClient.get('courses/featured');
    featuredCourses.value = response.data.data;
    console.log(response)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

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
      <div v-for="course in featuredCourses" :key="course.id"
        class="w-full bg-grayscale-50 rounded-lg border-b border-grayscale-100 p-5">
        <div class="flex flex-col justify-between gap-4 h-full">
          <img class="h-65.5 w-full object-cover rounded-[10px]" :src="course.image" :alt="course.title" />
          <div class="flex flex-row justify-between items-center">
            <small class="text-sm font-medium text-grayscale-500 w-full">Lecturer {{ course.instructor.name }}</small>
            <div class="flex items-center gap-1 w-full justify-end">
              <Icon name="Star" alt="Average Rating" class="w-4 h-4" />
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
            <button
              class="py-4.25 px-6.25 rounded-lg text-xl font-medium text-grayscale-50 bg-brand-yellow-500 cursor-pointer">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
