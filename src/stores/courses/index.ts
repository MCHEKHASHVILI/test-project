import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../auth'
import axios from 'axios'
import apiClient from '@/api/apiClient'
import { useRoute, useRouter } from 'vue-router'
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
  CourseEnrolled,
  EnrollmentConflicts,
} from '@types'

import { sortOptions } from './sortOptions'
import { scheduleOptions } from './scheduleOptions'
import { timeSlotOptions } from './timeSlotOptions'
import { sessionTypeOptions } from './sessioTypeOptions'

export const useCoursesStore = defineStore('courses', () => {
  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  // State
  const courses = ref<BrowseCoursesResponse | null>(null)
  const coursesFeatured = ref<Course[] | null>(null)
  const coursesEnrolled = ref<CourseEnrolled[]>([])
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
  const courseRating = ref<number>(0)
  const enrollmentConflicts = ref<EnrollmentConflicts | null>(null)
  const loading = ref<boolean>(false)

  // Actions
  async function fetchCategories() {
    try {
      loading.value = true
      const response = await apiClient.get('/categories', { requiresAuth: false })
      if (response.ok) {
        categories.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchTopics() {
    try {
      loading.value = true
      const response = await apiClient.get('/topics', { requiresAuth: false })
      if (response.ok) {
        topics.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchInstructors() {
    try {
      loading.value = true
      const response = await apiClient.get('/instructors', { requiresAuth: false })
      if (response.ok) {
        instructors.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch instructors:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchCourses(params: FetchCoursesParams = {}) {
    try {
      loading.value = true
      const response = await apiClient.get('/courses', {
        params,
        requiresAuth: false,
      })
      if (response.ok) {
        courses.value = response.data
        page.value = response.data.meta.currentPage
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchCoursesFeatured(): Promise<void> {
    try {
      loading.value = true
      const response = await apiClient.get('/courses/featured', { requiresAuth: false })
      if (response.ok) {
        coursesFeatured.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch featured courses:', error)
    } finally {
      loading.value = false
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
      loading.value = true
      const response = await apiClient.get(`/courses/${route.params.id}`)

      if (response.ok) {
        courseDetailed.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch course details:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchSchedules(): Promise<void> {
    // reset models
    scheduleId.value = null
    timeSlotId.value = null
    sessionTypeId.value = null
    try {
      loading.value = true
      const response = await apiClient.get(`/courses/${route.params.id}/weekly-schedules`, {
        requiresAuth: false,
      })

      if (response.ok) {
        schedules.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchTimeSlots(): Promise<void> {
    // reset models
    timeSlotId.value = null
    sessionTypeId.value = null
    try {
      loading.value = true
      const response = await apiClient.get(`/courses/${route.params.id}/time-slots`, {
        params: {
          weekly_schedule_id: scheduleId.value,
        },
        requiresAuth: false,
      })

      if (response.ok) {
        timeSlots.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch timeSlots:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchSessionTypes(): Promise<void> {
    // reset models
    sessionTypeId.value = null
    try {
      loading.value = true
      const response = await apiClient.get(`/courses/${route.params.id}/session-types`, {
        params: {
          weekly_schedule_id: scheduleId.value,
          time_slot_id: timeSlotId.value,
        },
        requiresAuth: false,
      })
      if (response.ok) {
        sessionTypes.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch session types:', error)
    } finally {
      loading.value = false
    }
  }

  async function enrollCourse(force = false): Promise<void> {
    try {
      loading.value = true
      const response = await apiClient.post('/enrollments', {
        courseId: route.params.id,
        courseScheduleId: courseOrder.value.session?.courseScheduleId
          ? courseOrder.value.session.courseScheduleId
          : null,
        force: force,
      })
      if (response.ok) {
        const { data } = response.data.data
        coursesEnrolled.value.push(data)
        enrollmentConflicts.value = null
        fetchCourse()
        router.push({ name: 'action.modal', params: { name: 'EnrolledSuccessModal' } })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data?.message || error.message
        if (status === 409) {
          enrollmentConflicts.value = error.response?.data?.conflicts[0]
          router.push({ name: 'action.modal', params: { name: 'EnrollmentConflictModal' } })
          return Promise.reject(new Error(message))
        }
        console.error(`API Error (${status}): ${message}`)
      } else {
        console.error('An unexpected error occurred:', error)
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchCoursesEnrolled(): Promise<void> {
    try {
      loading.value = true
      const response = await apiClient.get('/enrollments')
      if (response.ok) {
        coursesEnrolled.value = response.data.data
      }
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error)
    } finally {
      loading.value = false
    }
  }

  async function rateCourse(): Promise<void> {
    if (!courseDetailed.value) return new Promise(() => {})
    try {
      loading.value = true
      const response = await apiClient.post(`/courses/${courseDetailed.value.id}/reviews`, {
        rating: courseRating.value,
      })
      if (response.ok) {
        courseDetailed.value.isRated = true
      }
    } catch (error) {
      console.error('Failed to rate a course:', error)
    } finally {
      loading.value = false
    }
  }

  async function completeCourse(): Promise<void> {
    if (!courseDetailed.value) return new Promise(() => {})
    try {
      loading.value = true
      const response = await apiClient.patch(
        `/enrollments/${courseDetailed.value.enrollment.id}/complete`,
        {
          id: courseDetailed.value.id,
        },
      )
      if (response.ok) {
        const { data } = response.data
        courseDetailed.value.enrollment.completedAt = data.completedAt
        courseDetailed.value.enrollment.progress = data.progress
        router.push({ name: 'action.modal', params: { name: 'CourseCompletedModal' } })
      }
    } catch (error) {
      console.error('Failed to complete a course:', error)
    } finally {
      loading.value = false
    }
  }

  async function retakeCourse(): Promise<void> {
    if (!courseDetailed.value) return new Promise(() => {})
    try {
      loading.value = true
      const response = await apiClient.delete(`/enrollments/${courseDetailed.value.enrollment.id}`)
      if (response.ok) {
        await fetchCourse()
        await fetchSchedules()
      }
    } catch (error) {
      console.error('Failed to retake a course:', error)
    } finally {
      loading.value = false
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

  const scheduleIds = computed((): number[] => schedules.value.map((user) => user.id))
  const timeSlotIds = computed((): number[] => timeSlots.value.map((user) => user.id))
  const sessionTypeIds = computed((): number[] => sessionTypes.value.map((user) => user.id))

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

  const updatedTimeSlotOptions = computed(() => {
    const result = timeSlotOptions.value.map((localItem) => {
      // Look for the matching dynamic data from the API response
      const match = timeSlots.value.find((apiItem: any) => apiItem.id === localItem.id)

      // If no match from API, return the local item as-is
      if (!match) {
        return { ...localItem }
      }

      // Merge: create a new object with local defaults + API realtime updates
      return {
        ...localItem,
        label: match.label,
        startTime: match.startTime,
        endTime: match.endTime,
      }
    })

    return result
  })

  const updatedScheduleOptions = computed(() => {
    const result = scheduleOptions.value.map((localItem) => {
      // Look for the matching dynamic data from the API response
      const match = schedules.value.find((apiItem: any) => apiItem.id === localItem.id)

      // If no match from API, return the local item as-is
      if (!match) {
        return { ...localItem }
      }

      // Merge: create a new object with local defaults + API realtime updates
      return {
        ...localItem,
        label: match.label,
        days: match.days,
      }
    })

    return result
  })

  const getCoursesEnrolled = computed(() =>
    coursesEnrolled.value.filter((c) => c && c.progress < 100),
  )
  const getCoursesCompleted = computed(() =>
    coursesEnrolled.value.filter((c) => c && c.progress === 100),
  )
  const getCourseDetailed = computed(() => {
    return courseDetailed.value
  })
  const getAvgRating = computed(() => {
    if (!courseDetailed.value?.reviews) return 0
    const total = courseDetailed.value.reviews.reduce((a, c) => a + c.rating, 0)
    return courseDetailed.value.reviews.length
      ? Math.round((total / courseDetailed.value.reviews.length) * 10) / 10
      : 0
  })

  const isLoading = computed(() => loading.value)

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

  const getCoursesFeatured = computed(() => coursesFeatured.value)

  /**
   * Watchers
   */
  watch(scheduleId, () => {
    if (!scheduleId.value) return
    fetchTimeSlots()
  })

  watch(timeSlotId, () => {
    if (!timeSlotId.value) return
    fetchSessionTypes()
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
    scheduleOptions,
    timeSlotOptions,
    sessionTypeOptions,
    courseRating,
    enrollmentConflicts,
    fetchCourse,
    fetchTopics,
    clearFilters,
    fetchCourses,
    fetchSchedules,
    fetchCategories,
    fetchInstructors,
    fetchCoursesFeatured,
    fetchTimeSlots,
    fetchSessionTypes,
    enrollCourse,
    fetchCoursesEnrolled,
    rateCourse,
    retakeCourse,
    completeCourse,
    queryParams,
    totalFiltersCount,
    filteredTopics,
    scheduleIds,
    timeSlotIds,
    sessionTypeIds,
    courseOrder,
    updatedSessionOptions,
    updatedScheduleOptions,
    updatedTimeSlotOptions,
    getCourseDetailed,
    getCoursesEnrolled,
    getCoursesCompleted,
    getCoursesFeatured,
    getAvgRating,
    isLoading,
  }
})
