<script setup lang="ts">
import { watch } from 'vue'
import SideModal from '@/layouts/modals/SideModal.vue'
import EnrolledCourseCard from '../cards/EnrolledCourseCard.vue'
import AppLink from '@/components/shared/AppLink.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import { useCoursesStore } from '@/stores/courses'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { isAuthenticated } = storeToRefs(useAuthStore())
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)

const coursesStore = useCoursesStore()
const { fetchCoursesEnrolled } = coursesStore
const { getCoursesEnrolled, isLoading } = storeToRefs(coursesStore)
watch(isAuthenticated, () => { if (isAuthenticated.value) fetchCoursesEnrolled() }, { immediate: true })
</script>
<template>
    <SideModal :isOpen="!!activeModal">
        <template #total>
            <span>{{ getCoursesEnrolled.length || 0 }}</span>
        </template>
        <div v-if="!getCoursesEnrolled.length && !isLoading" class="flex-1 flex flex-col justify-center">
            <div class="w-full flex flex-col items-center gap-1 justify-center">
                <IconLoader name="PackageOpen" class="text-[132px] text-grayscale-200 m-2.5" />
                <div class="flex flex-col items-center justify-between gap-3">
                    <div class="flex flex-col items-center justify-between gap-2 text-purple-800">
                        <h3 class="text-heading-3">No Enrolled Courses Yet</h3>
                        <article class="flex flex-col items-center justify-start h-12">
                            <p class="text-body-xs ">Your learning journey starts here!</p>
                            <p class="text-body-xs">Browse courses to get started.</p>
                        </article>
                    </div>
                    <AppLink :to="{ name: 'courses' }" class="btn-primary text-btn-s leading-6">Browse Courses
                    </AppLink>
                </div>
            </div>
        </div>
        <div v-else class="w-full flex flex-col gap-3 items-center justify-start">
            <EnrolledCourseCard v-for="course in getCoursesEnrolled" :key="course?.id" :data="course" />
        </div>
    </SideModal>
</template>