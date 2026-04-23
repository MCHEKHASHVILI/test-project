<script setup lang="ts">
import BaseModal from '@/layouts/modals/BaseModal.vue'
import IconLoader from '@/components/shared/IconLoader.vue'
import StarRating from '@/components/form/StarRating.vue'
import { useCoursesStore } from '@/stores/courses'
import { useModalStore } from '@/stores/modals'
import { storeToRefs } from 'pinia'
const modalStore = useModalStore()

const { activeModal } = storeToRefs(modalStore)

const coursesStore = useCoursesStore()
const { courseRating } = storeToRefs(coursesStore)
const { getCourseDetailed, getAvgRating, rateCourse } = coursesStore
</script>
<template>
  <BaseModal :isOpen="!!activeModal" :title="'Congratulations!'" @close="$emit('close')">
    <template #exit><span /></template>
    <template #icon>
      <div class="w-full flex flex-row items-center justify-center py-6">
        <IconLoader name="ModalSuccess" class="text-[94px] text-helper-success" />
      </div>
    </template>
    <div class="w-full flex flex-col space-y-6 items-center justify-center text-center">
      <p class="text-xl font-medium text-grayscale-700 leading-[100%]">
        You've completed
        <span class="font-semibold leading-6">“{{ getCourseDetailed?.title }}”</span> Course!
      </p>
      <div v-if="getCourseDetailed" class="flex flex-col items-center gap-4.5 rounded-lg bg-transparent">
        <span class="text-purple-400 text-[16px] font-medium leading-6 lowercase first-letter:capitalize" v-text="!getCourseDetailed.isRated ? 'rate your experience' : `you've already rated this course`
          " />
        <div v-if="!getCourseDetailed.isRated" class="flex flex-row items-center justify-between">
          <StarRating v-model="courseRating" :actualRating="getAvgRating" iconName="StarBlank"
            color="var(--color-star-dark)" :maxRating="5" :width="46" :height="46" class="gap-4.5"
            @change="rateCourse" />
        </div>
      </div>
      <button class="w-full btn-primary" @click.prevent="$emit('close')">Done</button>
    </div>
  </BaseModal>
</template>
