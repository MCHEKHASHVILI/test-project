<script setup lang="ts">
import TogglePanel from './TogglePanel.vue'
import ScheduleBox from './ScheduleBox.vue'
import TimeBox from './TimeBox.vue'
import SessionBox from './SessionBox.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import AppLink from '@/components/shared/AppLink.vue'
import Warning from '@/components/shared/Warning.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const { isAuthenticated, isAuthorized } = storeToRefs(authStore)
const coursesStore = useCoursesStore()
const {
  scheduleId,
  timeSlotId,
  sessionTypeId,
  scheduleIds,
  timeSlotIds,
  sessionTypeIds,
  updatedScheduleOptions,
  updatedTimeSlotOptions,
  updatedSessionOptions,
  courseOrder,
} = storeToRefs(coursesStore)
const { enrollCourse, fetchTimeSlots, fetchSessionTypes } = coursesStore
function onSubmit() {
  enrollCourse()
}
const panels = ref([
  { id: 1, title: 'Select Weekly Schedule', icons: ['one', 'one_fill'], opened: false },
  { id: 2, title: 'Time Slot', icons: ['two', 'two_fill'], opened: false },
  { id: 3, title: 'Session Type', icons: ['three', 'three_fill'], opened: false },
])
function optiondefault(id: number): boolean {
  const panel = panels.value.find((p) => p.id === id)
  if (!panel) return false
  switch (panel.id) {
    case 1:
      return !scheduleId.value && !!scheduleIds.value.length
    case 2:
      return !timeSlotId.value && !!timeSlotIds.value.length
    case 3:
      return !sessionTypeId.value && !!sessionTypeIds.value.length
    default:
      return false
  }
}
function optionSelected(id: number): boolean {
  const panel = panels.value.find((p) => p.id === id)
  if (!panel) return false
  switch (panel.id) {
    case 1:
      return !!scheduleId.value
    case 2:
      return !!timeSlotId.value
    case 3:
      return !!sessionTypeId.value
    default:
      return false
  }
}
function optionDisabled(id: number): boolean {
  const panel = panels.value.find((p) => p.id === id)
  if (!panel) return false
  switch (panel.id) {
    case 1:
      return !scheduleIds.value.length
    case 2:
      return !timeSlotIds.value.length
    case 3:
      return !sessionTypeIds.value.length
    default:
      return false
  }
}
function togglePanel(id: number) {
  const panel = panels.value.find((p) => p.id === id)
  if (!panel) return
  panel.opened = !panel.opened
}

function openSpecificPanel(id: number) {
  panels.value.forEach((p) => {
    if (p.id === id) p.opened = true
    else if (p.id > id) p.opened = false
  })
}

watch(
  scheduleIds,
  (ids) => {
    if (ids.length) openSpecificPanel(1)
  },
  { immediate: true },
)

watch(timeSlotIds, (ids) => {
  if (ids.length) openSpecificPanel(2)
})

watch(sessionTypeIds, (ids) => {
  if (ids.length) openSpecificPanel(3)
})
</script>
<template>
  <div class="flex flex-col gap-8">
    <TogglePanel v-for="item in panels" :panel="item" :key="item.id" @toggle="togglePanel"
      :selected="optionSelected(item.id)" :disabled="optionDisabled(item.id)" :default="optiondefault(item.id)">
      <ScheduleBox v-if="item.id === 1 && scheduleIds" v-model="scheduleId" :available-ids="scheduleIds"
        :options="updatedScheduleOptions" />
      <TimeBox v-if="item.id === 2 && timeSlotIds" v-model="timeSlotId" :available-ids="timeSlotIds"
        :options="updatedTimeSlotOptions" />
      <SessionBox v-if="item.id === 3 && sessionTypeIds" class="flex-1 flex flex-row justify-between gap-2"
        v-model="sessionTypeId" :available-ids="sessionTypeIds" :options="updatedSessionOptions" />
    </TogglePanel>
    <div class="w-full flex flex-col gap-6 border border-grayscale-100 rounded-xl bg-gray-50 p-10">
      <div class="flex items-center justify-between text-grayscale-400">
        <h4 class="text-heading-4 leading-6">Total Price</h4>
        <span class="text-heading-2 text-grayscale-800" v-text="`$${courseOrder.totalPrice.toFixed(0)}`" />
      </div>
      <div class="w-full flex flex-col gap-3 items-center justify-between text-grayscale-400">
        <div class="w-full flex items-center justify-between">
          <span class="text-body-s leading-6">Base Price</span>
          <span class="text-grayscale-800" v-text="`+ $${courseOrder.basePrice.toFixed(0)}`" />
        </div>
        <div class="w-full flex items-center justify-between">
          <span class="text-body-s leading-6">Session Type</span>
          <span class="text-body-s text-grayscale-800" v-text="`+ $${courseOrder.additionalPrice.toFixed(0)}`" />
        </div>
      </div>
      <button class="btn-enroll text-heading-4 capitalize" :disabled="!courseOrder.bookingAuthorized"
        @click.prevent="enrollCourse()">
        Enroll Now
      </button>
    </div>
    <Transition v-if="!isAuthenticated || !isAuthorized" name="fade" mode="out-in"
      enter-active-class="duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <section>
        <Warning v-if="!isAuthenticated" title="authentication required"
          description="You need sign in to your profile before enrolling in this course.">
          <template #action>
            <AppLink :to="{ name: 'action.modal', params: { name: 'LogInModal' } }">
              <button
                class="btn-outline-sm text-helper-regular-m border-purple-200 bg-purple-50 flex flex-row items-center gap-1.5 justify-between">
                <span class="capitalize" v-text="'sign in'" />
                <IconLoader name="arrow_right" />
              </button>
            </AppLink>
          </template>
        </Warning>
        <Warning v-if="isAuthenticated && !isAuthorized" title="complete your profile"
          description="You need to fill in your profile details before enrolling in this course.">
          <template #action>
            <AppLink :to="{ name: 'action.modal', params: { name: 'ProfileModal' } }">
              <button
                class="btn-outline-sm text-helper-regular-m border-purple-200 bg-purple-50 flex flex-row items-center gap-1.5 justify-between">
                <span class="capitalize" v-text="'complete'" />
                <IconLoader name="arrow_right" />
              </button>
            </AppLink>
          </template>
        </Warning>
      </section>
    </Transition>
  </div>
</template>
