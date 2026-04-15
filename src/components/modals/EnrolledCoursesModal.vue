<script setup lang="ts">
import { ref } from 'vue'
import SideModal from './SideModal.vue'
import EnrolledCourseCard from '../cards/EnrolledCourseCard.vue'

const isOpen = ref<boolean>(false)

function close(): void {
    isOpen.value = false
}
function open(): void {
    isOpen.value = true
}

defineExpose({ open })

</script>
<template>
    <SideModal :isOpen="isOpen" @close="close">
        <div class="flex flex-col gap-3">
            <EnrolledCourseCard v-for="course in 5" :key="course" />
        </div>
    </SideModal>
</template>