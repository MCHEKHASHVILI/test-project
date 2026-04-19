<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'
import { useCoursesStore } from '@/stores/courses'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)

const coursesStore = useCoursesStore()
const { getCourseDetailed } = storeToRefs(coursesStore)
</script>
<template>
    <BaseModal :isOpen="!!activeModal" :title="'Enrollment Confirmed!'" @close="$emit('close')">
        <template #exit><span /></template>
        <template #icon>
            <div class="w-full flex flex-row items-center justify-center py-6">
                <BaseIcon name="ModalComplete" width="94" height="94" class="text-purple-500" />
            </div>
        </template>
        <div class="flex flex-col space-y-6 text-center">
            <p class="text-xl font-medium text-grayscale-700 leading-[100%]">
                You've successfully enrolled to the <span class="font-semibold leading-6">“{{ getCourseDetailed?.title
                }}”</span> Course!
            </p>
            <button class="btn-primary" @click.prevent="$emit('close')">Done</button>
        </div>
    </BaseModal>
</template>