<script setup lang="ts">
import { ref } from 'vue'
import SideModal from './SideModal.vue'
import EnrolledCourseCard from '../cards/EnrolledCourseCard.vue'
import AppLink from '../shared/AppLink.vue'

const isOpen = ref<boolean>(false)

function close(): void {
    isOpen.value = false
}
function open(): void {
    isOpen.value = true
}

defineExpose({ open })

const temporary = false

</script>
<template>
    <SideModal :isOpen="isOpen" @close="close">
        <div v-if="temporary" class="w-full flex flex-col gap-3">
            <EnrolledCourseCard v-for="course in temporary" :key="course" />
        </div>
        <div v-else class="grow flex items-center justify-center">
            <div class="flex flex-col items-center gap-3 w-full text-center justify-center">

                <h3 class="text-2xl font-semibold text-brand-yellow-800">No Enrolled Courses Yet</h3>
                <article>
                    <p class="text-sm font-medium text-brand-yellow-800">Your learning journey starts here!</p>
                    <p class="text-sm font-medium text-brand-yellow-800">Browse courses to get started.</p>
                </article>
                <AppLink :to="{ name: 'courses' }" class="btn-primary" @click="close">Browse Courses</AppLink>
            </div>
        </div>
    </SideModal>
</template>