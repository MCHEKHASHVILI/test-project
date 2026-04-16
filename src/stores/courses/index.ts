import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from '../auth'
import apiClient from '@/api/apiClient'
import { useRoute } from 'vue-router'
import {
  Category,
  Topic,
  Instructor,
  BrowseCoursesResponse,
  FetchCoursesParams,
  SortOption,
  Course,
  CourseDetailed,
  Schedule,
  TimeSlot,
  SessionType,
} from '@types'

import { sortOptions } from './sortOptions'
import { scheduleOptions } from './scheduleOptions'
import { timeSlotOptions } from './timeSlotOptions'
import { sessionTypeOptions } from './sessioTypeOptions'

export const useCoursesStore = defineStore('courses', () => {
  const authStore = useAuthStore()
  const route = useRoute()
  // State
  const featuredCourses = ref<Course[] | null>(null)
  const courses = ref<BrowseCoursesResponse | null>(null)
  const courseDetailed = ref<CourseDetailed | null>(null)
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
  const schedules = ref<Schedule[]>([])
  const timeSlots = ref<TimeSlot[]>([])
  const sessionTypes = ref<SessionType[]>([])
  const scheduleId = ref<number | null>(null)
  const timeSlotId = ref<number | null>(null)
  const sessionTypeId = ref<number | null>(null)

  // Actions
  async function fetchCategories() {
    try {
      const response = await apiClient.get('/categories')
      if (response.ok) {
        categories.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  async function fetchTopics() {
    try {
      const response = await apiClient.get('/topics')
      if (response.ok) {
        topics.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  async function fetchInstructors() {
    try {
      const response = await apiClient.get('/instructors')
      if (response.ok) {
        instructors.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
    }
  }

  async function fetchCourses(params: FetchCoursesParams = {}) {
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

  async function fetchFeaturedCourses(): Promise<void> {
    try {
      const response = await apiClient.get('/courses/featured')
      if (response.ok) {
        featuredCourses.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch featured courses:', error)
    }
  }

  function clearFilters(): void {
    ;(Object.keys(filters.value) as Array<keyof typeof filters.value>).forEach((key) => {
      if (Array.isArray(filters.value[key])) {
        filters.value[key] = []
      }
    })
  }

  async function fetchCourse(): Promise<void> {
    try {
      const response = await apiClient.get(`/courses/${route.params.id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      if (response.ok) {
        courseDetailed.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch course details:', error)
    }
  }

  async function fetchSchedules(): Promise<void> {
    // reset models
    scheduleId.value = null
    timeSlotId.value = null
    sessionTypeId.value = null
    try {
      const response = await apiClient.get(`/courses/${route.params.id}/weekly-schedules`)

      if (response.ok) {
        schedules.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error)
    }
  }

  async function fetchTimeSlots(): Promise<void> {
    // reset models
    timeSlotId.value = null
    sessionTypeId.value = null
    try {
      const response = await apiClient.get(`/courses/${route.params.id}/time-slots`, {
        params: {
          weekly_schedule_id: scheduleId.value,
        },
      })

      if (response.ok) {
        timeSlots.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch timeSlots:', error)
    }
  }

  async function fetchSessionTypes(): Promise<void> {
    // reset models
    sessionTypeId.value = null
    try {
      const response = await apiClient.get(`/courses/${route.params.id}/session-types`, {
        params: {
          weekly_schedule_id: scheduleId.value,
          time_slot_id: timeSlotId.value,
        },
      })
      if (response.ok) {
        sessionTypes.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch session types:', error)
    }
  }

  async function enrollCourse(force = false) {
    try {
      const response = await apiClient.post(
        '/enrollments',
        {
          courseId: route.params.id,
          courseScheduleId: courseOrder.value.session?.courseScheduleId
            ? courseOrder.value.session.courseScheduleId
            : null,
          force: force,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )
      if (response.ok) {
        return response
      }
    } catch (error) {
      console.error('Failed to Enroll The Course:', error)
    }
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

  const filteredTopics = computed(() => {
    if (!filters.value.categories.length) {
      return topics.value
    } else {
      return topics.value.filter((topic) => filters.value.categories.includes(topic.categoryId))
    }
  })

  const scheduleIds = computed((): number[] => {
    if (!schedules.value.length) {
      return []
    } else {
      return schedules.value.reduce((a: number[], c) => {
        a.push(c.id)
        return a
      }, [])
    }
  })

  const timeSlotIds = computed((): number[] => {
    if (!timeSlots.value.length || !scheduleId.value) {
      return []
    } else {
      return timeSlots.value.reduce((a: number[], c) => {
        a.push(c.id)
        return a
      }, [])
    }
  })

  const sessionTypeIds = computed((): number[] => {
    if (!sessionTypes.value.length || !timeSlotId.value) {
      return []
    } else {
      return sessionTypes.value.reduce((a: number[], c) => {
        a.push(c.id)
        return a
      }, [])
    }
  })

  const updatedSessionOptions = computed(() => {
    const result = sessionTypeOptions.value.map((localItem) => {
      // Look for the matching dynamic data from the API response
      const match = sessionTypes.value.find((apiItem: any) => apiItem.id === localItem.id)

      // If no match from API, return the local item as-is
      if (!match) {
        return { ...localItem }
      }

      // Merge: create a new object with local defaults + API realtime updates
      return {
        ...localItem,
        name: match.name,
        location: match.location,
        priceModifier: +match.priceModifier,
        availableSeats: match.availableSeats,
        courseScheduleId: match.courseScheduleId,
      }
    })

    return result
  })

  const courseOrder = computed(() => {
    const course = courseDetailed.value
    const schedule = updatedSessionOptions.value.find((option) => option.id === scheduleId.value)
    const slot = timeSlotOptions.value.find((option) => option.id === timeSlotId.value)
    const session = updatedSessionOptions.value.find((option) => option.id === sessionTypeId.value)

    const basePrice = course?.basePrice ? +course.basePrice : 0
    const additionalPrice = session?.priceModifier ? +session.priceModifier : 0
    const totalPrice = basePrice + additionalPrice

    const bookingAuthorized: boolean =
      authStore.isAuthenticated && !!sessionTypeId.value && !!timeSlotId.value && !!scheduleId.value

    return {
      course: course,
      schedule: schedule,
      slot: slot,
      session: session,
      basePrice: basePrice,
      additionalPrice: additionalPrice,
      totalPrice: totalPrice,
      bookingAuthorized: bookingAuthorized,
    }
  })

  return {
    sort,
    page,
    topics,
    courses,
    filters,
    schedules,
    timeSlots,
    sessionTypes,
    scheduleId,
    timeSlotId,
    sessionTypeId,
    categories,
    sortOptions,
    instructors,
    courseDetailed,
    featuredCourses,
    scheduleOptions,
    timeSlotOptions,
    sessionTypeOptions,
    updatedSessionOptions,
    fetchCourse,
    fetchTopics,
    clearFilters,
    fetchCourses,
    fetchSchedules,
    fetchCategories,
    fetchInstructors,
    fetchFeaturedCourses,
    fetchTimeSlots,
    fetchSessionTypes,
    enrollCourse,
    queryParams,
    totalFiltersCount,
    filteredTopics,
    scheduleIds,
    timeSlotIds,
    sessionTypeIds,
    courseOrder,
  }
})
