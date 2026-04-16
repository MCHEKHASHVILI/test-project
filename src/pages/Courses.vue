<script setup lang="ts">
import RouterBreadCrumbs from '@/components/shared/RouterBreadCrumbs.vue'
import Icon from '@/components/shared/Icon.vue'
import BrowseCourseCard from '@/components/cards/BrowseCourseCard.vue'
import FilterCheckBox from '@/components/form/FilterCheckBox.vue'
import SelectSort from '@/components/form/SelectSort.vue'
import Pagination from '@/components/shared/Pagination.vue'
import { onMounted, watch } from "vue"
import { useCoursesStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'

const coursesStore = useCoursesStore()
const {
  courses,
  categories,
  topics,
  instructors,
  filters,
  sort,
  page,
  queryParams,
  totalFiltersCount,
  sortOptions
} = storeToRefs(coursesStore)

const {
  fetchCategories,
  fetchInstructors,
  fetchTopics,
  fetchCourses,
  clearFilters
} = coursesStore

watch(filters, () => page.value = 1, { deep: true })

watch(queryParams, async (newValue, oldValue) => {
  await fetchCourses(queryParams.value)
}, { deep: true })

onMounted(() => {
  fetchCategories()
  fetchInstructors()
  fetchTopics()
  fetchCourses()
});
</script>

<template>
  <div class="flex flex-col gap-8.5">
    <RouterBreadCrumbs />
    <div class="wrapper flex flex-row gap-22.5">
      <div class="w-77.25 flex flex-row items-center justify-between">
        <h1 class="w-full text-[40px] font-semibold text-grayscale-950">Filters</h1>
        <button
          class="w-full flex flex-row items-center justify-end space-x-1.5 cursor-pointer text-grayscale-400 group"
          @click="clearFilters">
          <span class="font-medium leading-6 group-hover:text-brand-yellow-400">Clear All Filters</span>
          <Icon name="XIcon" class="group-hover:[&_path]:stroke-brand-yellow-400" />
        </button>
      </div>
      <div v-if="courses" class="w-291.75 flex flex-row items-center justify-between">
        <span class="text-grayscale-500 font-medium">Showing {{ courses.data.length }} out of {{ courses.meta.total
        }}</span>
        <SelectSort v-model="sort" :options="sortOptions" />
      </div>
    </div>
    <div class="wrapper flex flex-row gap-22.5">
      <aside class="w-77.25 flex flex-col gap-6">
        <div class="flex flex-col gap-14">
          <section class="flex flex-col gap-6">
            <h4 class="text-lg text-grayscale-500 font-medium">Categories</h4>
            <div class="flex flex-wrap gap-2">
              <FilterCheckBox v-for="item in categories" :data="item" v-model="filters.categories" :key="item.id"
                :value="item.id" />
            </div>
          </section>
          <section class="flex flex-col gap-6">
            <h4 class="text-lg text-grayscale-500 font-medium">Topics</h4>
            <div class="flex flex-wrap gap-2">
              <FilterCheckBox v-for="item in topics" :data="item" v-model="filters.topics" :key="item.id"
                :value="item.id" />
            </div>
          </section>
          <section class="flex flex-col gap-6">
            <h4 class="text-lg text-grayscale-500 font-medium">instructor</h4>
            <div class="flex flex-col gap-2">
              <FilterCheckBox v-for="item in instructors" :data="item" v-model="filters.instructors" :key="item.id"
                :value="item.id" />
            </div>
          </section>
        </div>
        <div class="border-t pt-4 border-grayscale-300">
          <span class="text-sm font-medium text-grayscale-400">{{ totalFiltersCount }} Filters active</span>
        </div>
      </aside>
      <section class="w-291.75 flex flex-col gap-8">
        <div v-if="courses" class="grid grid-cols-3 gap-6">
          <BrowseCourseCard v-for="item in courses.data" :course="item" />
        </div>
        <div class="flex mx-auto">
          <Pagination v-if="courses?.data" v-model="page" :last-page="courses.meta.lastPage"
            :per-page="courses.meta.perPage" :total="courses.meta.total" />
        </div>
      </section>
    </div>
  </div>
</template>
