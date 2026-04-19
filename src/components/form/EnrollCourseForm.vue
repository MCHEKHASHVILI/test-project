<script setup lang="ts">
import TogglePanel from './TogglePanel.vue'
import ScheduleBox from './ScheduleBox.vue'
import TimeBox from './TimeBox.vue'
import SessionBox from './SessionBox.vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import AppLink from '@/components/shared/AppLink.vue'
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const { isAuthenticated, isAuthorized } = storeToRefs(authStore)
const coursesStore = useCoursesStore()
const { scheduleId, timeSlotId, sessionTypeId, scheduleIds, timeSlotIds, sessionTypeIds, updatedScheduleOptions, updatedTimeSlotOptions, updatedSessionOptions, courseOrder } = storeToRefs(coursesStore)
const { enrollCourse, fetchTimeSlots, fetchSessionTypes } = coursesStore
function onSubmit() {
    enrollCourse()
}
const panels = ref([
    { id: 1, title: 'Select Weekly Schedule', icons: ['1-circle', 'up-circle'], opened: false },
    { id: 2, title: 'Time Slot', icons: ['2-circle', 's-circle'], opened: false },
    { id: 3, title: 'Session Type', icons: ['dollar-circle', '3-circle'], opened: false }
])

function togglePanel(id: number) {
    const panel = panels.value.find(p => p.id === id)
    if (!panel) return
    panel.opened = !panel.opened
}

function openSpecificPanel(id: number) {
    panels.value.forEach(p => {
        if (p.id === id) p.opened = true;
        else if (p.id > id) p.opened = false;
    });
}

watch(scheduleIds, (ids) => {
    if (ids.length) openSpecificPanel(1);
}, { immediate: true });

watch(timeSlotIds, (ids) => {
    if (ids.length) openSpecificPanel(2);
})

watch(sessionTypeIds, (ids) => {
    if (ids.length) openSpecificPanel(3);
})
</script>
<template>
    <div class="flex flex-col gap-2.75">
        <TogglePanel v-for="item in panels" :panel="item" :key="item.id" @toggle="togglePanel">
            <ScheduleBox v-if="item.id === 1 && scheduleIds" v-model="scheduleId" :available-ids="scheduleIds"
                :options="updatedScheduleOptions" />
            <TimeBox v-if="item.id === 2 && timeSlotIds" v-model="timeSlotId" :available-ids="timeSlotIds"
                :options="updatedTimeSlotOptions" />
            <SessionBox v-if="item.id === 3 && sessionTypeIds" class="flex-1 flex flex-row justify-between gap-2"
                v-model="sessionTypeId" :available-ids="sessionTypeIds" :options="updatedSessionOptions" />
        </TogglePanel>
        <div class="w-full flex flex-col gap-7.75 border border-grayscale-100 rounded-xl bg-gray-50 p-10">
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
                @click.prevent="enrollCourse()">Enroll Now</button>
        </div>
        <Transition v-if="!isAuthenticated || !isAuthorized" name="fade" mode="out-in"
            enter-active-class="duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <section>
                <div v-if="!isAuthenticated"
                    class="w-full flex flex-row justify-between p-5 border border-[#E5E7EB] rounded-xl bg-[#F8FAFC]">
                    <div div class="flex flex-col gap-2.25">
                        <div class="flex flex-row gap-1.5">
                            <BaseIcon name="warning" class="text-helper-warning" />
                            <span class="capitalize text-md text-grayscale-800 font-medium leading-6"
                                v-text="'authentication required'" />
                        </div>
                        <span class="lowercase first-letter:capitalize text-grayscale-400 text-xs"
                            v-text="'You need sign in to your profile before enrolling in this course.'" />
                    </div>
                    <AppLink :to="{ name: 'action.modal', params: { name: 'LogInModal' } }"> <button
                            class="btn-outline-sm border-purple-200 bg-purple-50 flex flex-row items-center gap-1.5 justify-between">
                            <span class="capitalize" v-text="'sign in'" />
                            <BaseIcon name="arrow-right" />
                        </button>
                    </AppLink>
                </div>
                <div v-if="isAuthenticated && !isAuthorized"
                    class="w-full flex flex-row justify-between p-5 border border-[#E5E7EB] rounded-xl bg-[#F8FAFC]">
                    <div div class="flex flex-col gap-2.25">
                        <div class="flex flex-row gap-1.5">
                            <BaseIcon name="warning" class="text-helper-warning" />
                            <span class="capitalize text-md text-grayscale-800 font-medium leading-6"
                                v-text="'complete your profile'" />
                        </div>
                        <span class="lowercase first-letter:capitalize text-grayscale-400 text-xs"
                            v-text="'You need to fill in your profile details before enrolling in this course.'" />
                    </div>
                    <AppLink :to="{ name: 'action.modal', params: { name: 'ProfileModal' } }"> <button
                            class="btn-outline-sm border-purple-200 bg-purple-50 flex flex-row items-center gap-1.5 justify-between">
                            <span class="capitalize" v-text="'complete'" />
                            <BaseIcon name="arrow-right" />
                        </button>
                    </AppLink>
                </div>
            </section>
        </Transition>
    </div>
</template>