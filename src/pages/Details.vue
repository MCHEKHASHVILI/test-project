<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import RouterBreadCrumbs from '@/components/shared/RouterBreadCrumbs.vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import Icon from '@/components/shared/Icon.vue'
import TogglePanel from '@/components/form/TogglePanel.vue'
import ScheduleBox from '@/components/form/ScheduleBox.vue'
import TimeBox from '@/components/form/TimeBox.vue'
import SessionBox from '@/components/form/SessionBox.vue'
import { useCoursesStore } from '@/stores/courses';
import { storeToRefs } from 'pinia';
const coursesStore = useCoursesStore()
const { courseDetailed, scheduleIds, scheduleId, timeSlotIds, timeSlotId, sessionTypeIds, sessionTypeId, scheduleOptions, timeSlotOptions, courseOrder, updatedSessionOptions } = storeToRefs(coursesStore)
const { fetchCourse, fetchSchedules, fetchTimeSlots, fetchSessionTypes, enrollCourse } = coursesStore

const panels = ref([
  { id: 1, title: 'Select Weekly Schedule', icons: ['up-circle', '1-circle'], opened: false },
  { id: 2, title: 'Time Slot', icons: ['2-circle', 's-circle'], opened: false },
  { id: 3, title: 'Session Type', icons: ['dollar-circle', '3-circle'], opened: false }
])

function togglePanel(id: number) {
  const panel = panels.value.find(p => p.id === id)
  if (!panel) return
  panel.opened = !panel.opened
}

function onSubmit() {
  const response = enrollCourse()
  console.log(response)
}

watch(scheduleId, () => {
  if (!scheduleId.value) return
  fetchTimeSlots()
})

watch(timeSlotId, () => {
  if (!timeSlotId.value) return
  fetchSessionTypes()
})

watch(scheduleIds, () => {
  if (!scheduleIds.value.length) {
    panels.value.map(panel => panel.opened = false)
    return
  }
  const panel = panels.value.find(p => p.id === 1)
  if (!panel) return
  togglePanel(panel.id)
})

watch(timeSlotIds, () => {
  if (!timeSlotIds.value.length) return
  panels.value.map(panel => panel.opened = (panel.id > 1) ? false : panel.opened)
  // force open time slots panel
  const panel = panels.value.find(p => p.id === 2)
  if (!panel) return
  panel.opened = true
})

watch(sessionTypeIds, () => {
  if (!sessionTypeIds.value.length) return
  panels.value.map(panel => panel.opened = (panel.id > 2) ? false : panel.opened)
  // force open time slots panel
  const panel = panels.value.find(p => p.id === 3)
  if (!panel) return
  panel.opened = true
})

onMounted(() => {
  fetchCourse()
  fetchSchedules()
})

</script>
<template>
  <div v-if="courseDetailed" class="flex flex-col gap-6">
    <RouterBreadCrumbs />
    <h1 class="text-[40px] font-semibold text-grayscale-900" v-text="courseDetailed.title" />
    <div class="flex flex-row items-start justify-between gap-28">
      <div class="w-full flex flex-col gap-4.5">
        <div class="w-full h-[474.15px] rounded-[10px]">
          <img :src="courseDetailed.image" alt="Course Image" class="w-full h-full object-cover rounded-[10px]" />
        </div>
        <div class="w-full flex flex-row items-center justify-start">
          <div class="w-full flex flex-row items-center justify-start space-x-4">
            <div class="flex flex-row items-center justify-start gap-1">
              <BaseIcon name="calendar" />
              <span class="text-sm font-medium text-grayscale-600">{{ courseDetailed.durationWeeks }} Weeks</span>
            </div>
            <div class="flex flex-row items-center justify-start gap-1">
              <BaseIcon name="clock" />
              <span class="text-sm font-medium text-grayscale-600">{{ courseDetailed.hours }} Hours</span>
            </div>
          </div>
          <div class="w-full flex flex-row items-center justify-end space-x-4">
            <div class="flex flex-row items-center justify-start gap-1">
              <Icon name="Star" />
              <span class="text-sm font-medium text-grayscale-600">4.9</span>
            </div>
            <div class="text-md font-medium text-grayscale-500">
              <div class="box-border items-center w-fit flex flex-row space-x-2.5 bg-grayscale-50 rounded-xl py-2 px-3">
                <Icon :name="courseDetailed?.category.icon" />
                <span>{{ courseDetailed?.category.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="box-border inline-flex items-center ">
            <div class="w-fit flex flex-row space-x-2.5 items-center bg-grayscale-50 rounded-xl py-2 px-3">
              <div class=" w-7.5 h-7.5 rounded-sm overflow-hidden">
                <img :src="courseDetailed.instructor.avatar" class="w-full h-full rounded-sm object-cover" />
              </div>
              <span>{{ courseDetailed.instructor.name }}</span>
            </div>
          </label>
        </div>
        <article class="flex flex-col gap-4">
          <h4 class="text-xl font-semibold text-grayscale-400 leading-6">Course Description</h4>
          <p class="text-md font-medium text-grayscale-600" v-text="courseDetailed.description" />
        </article>
      </div>
      <div class="w-140 flex flex-col">
        <div class="w-140  flex flex-col gap-2.75">
          <TogglePanel class="w-140" v-for="item in panels" :panel="item" :key="item.id" @toggle="togglePanel">
            <ScheduleBox v-if="item.id === 1 && scheduleIds" v-model="scheduleId" :available-ids="scheduleIds"
              :options="scheduleOptions" />
            <TimeBox v-if="item.id === 2 && timeSlotIds" v-model="timeSlotId" :available-ids="timeSlotIds"
              :options="timeSlotOptions" />
            <SessionBox v-if="item.id === 3 && sessionTypeIds" v-model="sessionTypeId" :available-ids="sessionTypeIds"
              :options="updatedSessionOptions" />
          </TogglePanel>
          <div class="w-full aspect-2/1 flex flex-col gap-7.75 border border-grayscale-100 rounded-xl bg-gray-50 p-10">
            <div class="flex items-center justify-between text-grayscale-400">
              <h1>Total Price</h1>
              <span class="text-grayscale-800" v-text="courseOrder.totalPrice.toFixed(2)" />
            </div>
            <div class="w-full flex flex-col gap-3 items-center justify-between text-grayscale-400">
              <div class="w-full flex items-center justify-between">
                <h1>Base Price</h1>
                <span class="text-grayscale-800" v-text="courseOrder.basePrice.toFixed(2)" />
              </div>
              <div class="w-full flex items-center justify-between">
                <h1>Session Type</h1>
                <span class="text-grayscale-800" v-text="courseOrder.additionalPrice.toFixed(2)" />
              </div>
            </div>
            <button class="btn-primary capitalize" :disabled="!courseOrder.bookingAuthorized"
              @click.prevent="onSubmit">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
