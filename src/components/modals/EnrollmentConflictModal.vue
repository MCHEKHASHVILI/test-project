<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import { useCoursesStore } from '@/stores/courses'
import { useModalStore } from '@/stores/modals'
import { useApiStore } from '@/stores/api'
import { storeToRefs } from 'pinia'
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)
const coursesStore = useCoursesStore()
const { enrollCourse } = coursesStore
// const { enrollmentConflicts } = storeToRefs(coursesStore)
const { getConflicts } = storeToRefs(useApiStore())

</script>
<template>
  <BaseModal :isOpen="!!activeModal" :title="'Enrollment Conflict'" class="w-119" @close="$emit('close')">
    <template #exit><span /></template>
    <template #icon>
      <div class="w-full flex flex-row items-center justify-center py-6">
        <IconLoader name="ModalWarning" class="text-[94px] text-helper-warning" />
      </div>
    </template>
    <div class="flex flex-col space-y-6 text-center">
      <p class="text-xl font-medium text-grayscale-700 leading-[100%]">
        You are already enrolled in
        <span class="font-semibold leading-6">“{{ getConflicts.conflictingCourseName }}”</span> with
        the same schedule: <span class="font-semibold leading-6">{{ getConflicts.schedule }}</span>
      </p>
      <div class="w-full flex flex-row items-center justify-between gap-2">
        <button class="w-full btn-outline btn-outline-sm text-button-s leading-6 text-nowrap capitalize p-3"
          @click.prevent="() => enrollCourse(true)">
          continue anyway
        </button>
        <button class="w-full btn-primary btn-primary-sm text-button-s leading-6 text-nowrap capitalize p-3"
          @click.prevent="$emit('close')">
          cancel
        </button>
      </div>
    </div>
  </BaseModal>
</template>
