<script setup lang="ts">
import { onMounted } from 'vue'
import SideModal from '@/layouts/modals/SideModal.vue'
import EnrolledCourseCard from '../cards/EnrolledCourseCard.vue'
import AppLink from '../shared/AppLink.vue'
import BaseIcon from '../shared/BaseIcon.vue'
import { useCoursesStore } from '@/stores/courses'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)

const coursesStore = useCoursesStore()
const { fetchCoursesEnrolled } = coursesStore
const { getCoursesEnrolled, isLoading } = storeToRefs(coursesStore)

onMounted(() => {
    fetchCoursesEnrolled()
})
</script>
<template>
    <SideModal :isOpen="!!activeModal">
        <template #total>
            <span>{{ getCoursesEnrolled.length || 0 }}</span>
        </template>
        <div v-if="!getCoursesEnrolled.length && !isLoading"
            class="flex-1 h-full flex flex-col justify-center items-center">
            <div class="w-full flex flex-col items-center gap-3 justify-center">
                <BaseIcon name="PackageOpen" />
                <h3 class="text-2xl font-semibold text-purple-800">No Enrolled Courses Yet</h3>
                <article>
                    <p class="text-sm font-medium text-purple-800">Your learning journey starts here!</p>
                    <p class="text-sm font-medium text-purple-800">Browse courses to get started.</p>
                </article>
                <AppLink :to="{ name: 'courses' }" class="btn-primary">Browse Courses</AppLink>
            </div>
        </div>
        <div v-else class="w-full flex flex-col gap-3 items-center justify-start">
            <EnrolledCourseCard v-for="course in getCoursesEnrolled" :key="course?.id" :data="course" />
        </div>
    </SideModal>
</template>