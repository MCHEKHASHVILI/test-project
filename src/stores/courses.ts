import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import {
  Category,
  Topic,
  Instructor,
  BrowseCoursesResponse,
  SelectOption,
  FetchCoursesParams,
  SortOption,
  Course,
} from '@types'

export const useCoursesStore = defineStore('courses', () => {
  // State
  const featuredCourses = ref<Course[] | null>(null)
  const courses = ref<BrowseCoursesResponse | null>(null)
  const categories = ref<Category[]>([])
  const topics = ref<Topic[]>([])
  const instructors = ref<Instructor[]>([])
  const page = ref<number>(1)
  const sort = ref<SortOption>('newest')
  const filters = ref({
    topics: [] as Topic['id'][],
    categories: [] as Category['id'][],
    instructors: [] as Instructor['id'][],
  })

  /**
   * @Todo find a way get the possible keys from api to make it more dynamic.
   */
  const sortOptions = ref<SelectOption[]>([
    {
      value: 'newest',
      label: 'Newest First',
    },
    {
      value: 'price_asc',
      label: 'Price: Low to High',
    },
    {
      value: 'price_desc',
      label: 'Price: High to Low',
    },
    {
      value: 'popular',
      label: 'Most Popular',
    },
    {
      value: 'title_asc',
      label: 'Title: A-Z',
    },
  ])

  // Actions
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories')
      if (response.ok) {
        categories.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchTopics = async () => {
    try {
      const response = await apiClient.get('/topics')
      if (response.ok) {
        topics.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  const fetchInstructors = async () => {
    try {
      const response = await apiClient.get('/instructors')
      if (response.ok) {
        instructors.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
    }
  }

  const fetchCourses = async (params: FetchCoursesParams = {}) => {
    try {
      const response = await apiClient.get('/courses', { params })
      if (response.ok) {
        courses.value = response.data
        page.value = response.data.meta.currentPage
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    }
  }
  const fetchFeaturedCourses = async () => {
    try {
      const response = await apiClient.get('/courses/featured')
      if (response.ok) {
        featuredCourses.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch featured courses:', error)
    }
  }

  const clearFilters = (): void => {
    ;(Object.keys(filters.value) as Array<keyof typeof filters.value>).forEach((key) => {
      if (Array.isArray(filters.value[key])) {
        filters.value[key] = []
      }
    })
  }

  // Getters
  const queryParams = computed(() => {
    return {
      topics: filters.value.topics,
      categories: filters.value.categories,
      instructors: filters.value.instructors,
      sort: sort.value,
      page: page.value,
    }
  })
  const totalFiltersCount = computed((): number => {
    return Object.values(filters.value).reduce((sum, arr) => sum + arr.length, 0)
  })

  return {
    sort,
    page,
    topics,
    courses,
    filters,
    categories,
    sortOptions,
    instructors,
    featuredCourses,
    fetchTopics,
    clearFilters,
    fetchCourses,
    fetchCategories,
    fetchInstructors,
    fetchFeaturedCourses,
    queryParams,
    totalFiltersCount,
  }
})
