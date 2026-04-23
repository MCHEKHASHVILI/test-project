<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import RouterBreadCrumbs from '@/components/shared/RouterBreadCrumbs.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import EnrollCourseForm from '@/components/form/EnrollCourseForm.vue'
import CompleteCourseForm from '@/components/form/CompleteCourseForm.vue'
import AvgRating from '@/components/shared/AvgRating.vue'
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
    <h1 class="text-heading-1 text-grayscale-900" v-text="getCourseDetailed.title" />
    <div class="flex flex-row items-start justify-between">
      <article class="w-225 flex flex-col gap-4.5">
        <img :src="getCourseDetailed.image" class="h-[474.15px] w- object-cover rounded-[10px]" />
        <div class="w-full flex flex-row items-center justify-start">
          <div class="w-full flex flex-row items-center justify-start space-x-4 text-grayscale-600">
            <div class="flex flex-row items-center  justify-start gap-1">
              <IconLoader name="calendar" class="text-[20px]" />
              <span class="text-body-xs">{{ getCourseDetailed.durationWeeks }} Weeks</span>
            </div>
            <div class="flex flex-row items-center justify-start gap-1">
              <IconLoader name="clock" class="text-[20px]" />
              <span class="text-body-xs">{{ getCourseDetailed.hours }} Hours</span>
            </div>
          </div>
          <div class="w-full flex flex-row items-center justify-end space-x-4">
            <AvgRating :value="getAvgRating" iconClass="text-helper-warning text-[26px]"
              labelclass="text-[14px] font-medium leading-[1.5]!" />
            <div class="text-md font-medium text-grayscale-500">
              <div class="chips-label bg-grayscale-50">
                <IconLoader :name="getCourseDetailed?.category.icon" class="text-[24px]! text-grayscale-600" />
                <span class="text-body-s leading-6! text-grayscale-500" v-text="getCourseDetailed?.category.name" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="box-border inline-flex items-center">
            <div class="chips-label bg-grayscale-50">
              <img :src="getCourseDetailed.instructor.avatar" class="w-7.5 h-7.5 rounded-sm object-cover" />
              <span v-text="getCourseDetailed.instructor.name" />
            </div>
          </label>
        </div>
        <article class="flex flex-col gap-4">
          <h4 class="text-heading-4 text-grayscale-400 leading-6!">Course Description</h4>
          <p class="text-body-s text-grayscale-600 leading-6!" v-text="getCourseDetailed.description" />
        </article>
      </article>
      <section class="w-132.5">
        <Transition name="fade" mode="out-in" enter-active-class="duration-300 ease-out" enter-from-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <EnrollCourseForm v-if="!getCourseDetailed.enrollment" />
          <CompleteCourseForm v-else />
        </Transition>
      </section>
    </div>
  </div>
</template>
