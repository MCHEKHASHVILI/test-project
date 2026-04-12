<script setup lang="ts">
import RouterBreadCrumbs from '@/components/shared/RouterBreadCrumbs.vue'
import Icon from '@/components/shared/Icon.vue'
import FeaturedCourseCard from '@/components/cards/FeaturedCourseCard.vue'
import FilterCheckBox from '@/components/form/FilterCheckBox.vue'
import SelectSort from '@/components/form/SelectSort.vue'
import Pagination from '@/components/shared/Pagination.vue'
import apiClient from '@/api/apiClient'
import { ref, type Ref, onMounted, computed, watch } from "vue"
import { BrowseCoursesResponse } from '@types'

const categories = ref(null);
const topics = ref(null);
const instructors = ref(null);

const courses = ref<BrowseCoursesResponse | null>(null)

const filters = ref({
  topics: [] as number[],
  categories: [] as number[],
  instructors: [] as number[]
})

/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
const sortOptions = ref([
  {
    value: 'newest',
    label: 'Newest First'
  },
  {
    value: 'price_asc',
    label: 'Price: Low to High'
  },
  {
    value: 'price_desc',
    label: 'Price: High to Low'
  },
  {
    value: 'popular',
    label: 'Most Popular'
  },
  {
    value: 'title_asc',
    label: 'Title: A-Z'
  }
])

const sort = ref<string | null>(null)
const page = ref<number>(1)

function clearFilters(): void {
  (Object.keys(filters.value) as Array<keyof typeof filters.value>).forEach(key => {
    if (Array.isArray(filters.value[key])) {
      filters.value[key] = []
    }
  })
}

const queryParams = computed(() => {
  return {
    topics: filters.value.topics,
    categories: filters.value.categories,
    instructors: filters.value.instructors,
    sort: sort.value,
    page: page.value,
  }
})

watch(filters, () => page.value = 1, { deep: true })

watch(queryParams, async (newValue, oldValue) => {
  await getCourses(queryParams.value)
}, { deep: true })

const totalFiltersCount = computed((): number => {
  return Object.values(filters.value).reduce((sum, arr) => sum + arr.length, 0)
})

async function getCourses(params: Object | null = null) {
  try {
    const response = await apiClient.get('courses', {
      params
    });
    courses.value = response.data;
    page.value = response.data.meta.currentPage
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getResource(endpoint: string, resourse: Ref): Promise<void> {
  try {
    const response = await apiClient.get(endpoint);
    resourse.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  getResource('categories', categories)
  getResource('topics', topics)
  getResource('instructors', instructors)
  getCourses()
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
          <FeaturedCourseCard v-for="item in courses.data" :course="item" />
        </div>
        <div class="flex mx-auto">
          <Pagination v-if="courses?.data" v-model="page" :last-page="courses.meta.lastPage"
            :per-page="courses.meta.perPage" :total="courses.meta.total" />
        </div>
      </section>
    </div>
  </div>
</template>
