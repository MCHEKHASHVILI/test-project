<script setup lang="ts">
import { CourseEnrolled } from '@/types'
import AppLink from '@/components/shared/AppLink.vue'
import AvgRating from '@/components/shared/AvgRating.vue'
import FallBackImage from '@/assets/img/progressCardFallbackImage.png'
withDefaults(defineProps<{ data: CourseEnrolled; fallback?: boolean }>(), {
  fallback: false,
})
</script>
<template>
  <div v-if="data?.course || !fallback" class="card card-progress flex flex-col gap-2">
    <div class="flex flex-row items-start justify-between gap-4">
      <img :src="data.course.image" />
      <div class="w-full flex flex-col justify-between gap-2.25">
        <div class="flex flex-row items-center justify-between">
          <small
            class="text-body-xs text-grayscale-500 capitalize text-nowrap"
            v-text="`lecturer ${data.course.instructor.name}`"
          />
          <AvgRating :value="data.course.avgRating" />
        </div>
        <h4 class="text-heading-4 leading-6 text-grayscale-900" v-text="data.course.title" />
      </div>
    </div>
    <div class="flex flex-row items-end justify-between">
      <div class="w-84 flex flex-col gap-1 items-start justify-between pb-1">
        <span
          class="text-helper-medium tracking-normal text-grayscale-900 capitalize"
          v-text="`${data.progress}% Completed`"
        />
        <div class="w-full bg-purple-100 rounded-full h-3.75">
          <div
            class="bg-purple-500 h-3.75 rounded-[30px] transform duration-300 transition-all ease-out"
            :style="{ width: `${data.progress}%` }"
          ></div>
        </div>
      </div>
      <AppLink :to="{ name: 'details', params: { id: data.course.id } }">
        <button class="btn-outline text-button-s text-nowrap">View</button>
      </AppLink>
    </div>
  </div>
  <div v-else class="card card-progress flex flex-col gap-2">
    <div class="flex flex-row items-start justify-between gap-4">
      <img :src="FallBackImage" />
      <div class="w-full flex flex-col justify-between gap-2.25">
        <div class="flex flex-row items-center justify-between">
          <small
            class="text-body-xs text-grayscale-500 capitalize text-nowrap"
            v-text="`lecturer Morgan Freeman`"
          />
          <AvgRating :value="5" />
        </div>
        <h4
          class="text-heading-4 leading-6 text-grayscale-900"
          v-text="'Poor mother and shit-stained children'"
        />
      </div>
    </div>
    <div class="flex flex-row items-end justify-between">
      <div class="w-84 flex flex-col gap-1 items-start justify-between pb-1">
        <span
          class="text-helper-medium tracking-normal text-grayscale-900 capitalize"
          v-text="`${38}% Completed`"
        />
        <div class="w-full bg-purple-100 rounded-full h-3.75">
          <div
            class="bg-purple-500 h-3.75 rounded-[30px] transform duration-300 transition-all ease-out"
            :style="{ width: `${38}%` }"
          ></div>
        </div>
      </div>
      <AppLink to="#">
        <button class="btn-outline text-button-s text-nowrap">View</button>
      </AppLink>
    </div>
  </div>
</template>
