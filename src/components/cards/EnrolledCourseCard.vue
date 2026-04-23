<script setup lang="ts">
import { CourseEnrolled } from '@/types'
import IconLoader from '../shared/IconLoader.vue'
import AppLink from '@/components/shared/AppLink.vue'
import AvgRating from '@/components/shared/AvgRating.vue'
defineProps<{ data: CourseEnrolled }>()
</script>
<template>
  <div class="w-full card card-enrolled flex flex-col gap-4.5">
    <div class="flex flex-row items-start justify-between gap-4.5">
      <img :src="data.course.image" />
      <div class="flex flex-col justify-between grow gap-2">
        <div class="flex flex-row items-center justify-between">
          <small class="text-grayscale-500 text-body-xs text-nowrap capitalize"
            v-text="`instructor ${data.course.instructor.name}`" />
          <AvgRating :value="data.course.avgRating" />
        </div>
        <h4 class="text-heading-4 text-grayscale-900" v-text="data.course.title" />
        <div class="flex flex-row items-center gap-2 justify-start">
          <IconLoader name="calendar" class="text-[16px] text-grayscale-600" />
          <small class="text-helper-regular-m text-[14px] leading-6.5 text-grayscale-500 capitalize"
            v-text="data.schedule.weeklySchedule.label" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
          <IconLoader name="clock" class="text-[16px] text-grayscale-600" />
          <small class="text-helper-regular-m text-[14px] leading-6.5 text-grayscale-500 capitalize"
            v-text="data.schedule.timeSlot.label" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
          <IconLoader name="users" class="text-[16px] text-grayscale-600" />
          <small class="text-helper-regular-m text-[14px] leading-6.5 text-grayscale-500 capitalize"
            v-text="data.schedule.sessionType.name" />
        </div>
        <div class="flex flex-row items-center gap-2 justify-start">
          <IconLoader name="map_pin" class="text-[16px] text-grayscale-600" />
          <small class="text-helper-regular-m text-[14px] leading-6.5 text-grayscale-500 capitalize"
            v-text="data.schedule.location || '-'" />
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between gap-5">
      <div class="flex flex-col w-full gap-2 items-start justify-between pl-1">
        <span class="text-body-s leading-6 text-grayscale-900 capitalize" v-text="`${data.progress}% complete`" />
        <div class="w-full bg-purple-100 rounded-full h-3.75">
          <div class="bg-purple-500 h-3.75 rounded-[30px] transform duration-300 transition-all"
            :style="{ width: `${data.progress}%` }"></div>
        </div>
      </div>
      <AppLink :to="{ name: 'details', params: { id: data.course.id } }">
        <button class="btn-outline text-button-s text-nowrap">View Details</button>
      </AppLink>
    </div>
  </div>
</template>
