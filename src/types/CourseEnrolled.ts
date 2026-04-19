import { Course } from '@types'

export interface CourseEnrolled {
  id: number
  quantity: number
  totalPrice: number
  progress: number
  completedAt: string
  course: Course
  schedule: {
    weeklySchedule: {
      id: number
      label: string
      days: string[]
    }
    timeSlot: {
      id: number
      label: string
      startTime: string
      endTime: string
    }
    sessionType: {
      id: number
      courseScheduleId: number
      name: string
      priceModifier: number
      availableSeats: number
      location: string
    }
    location: string
  }
}
