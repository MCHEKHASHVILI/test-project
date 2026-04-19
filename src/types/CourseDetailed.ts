import { Course } from '@types'
import { CourseEnrolled } from '@types'
interface CourseReview {
  rating: number
  userId: number
}
export interface CourseDetailed extends Course {
  enrollment: CourseEnrolled
  reviews?: CourseReview[]
  isRated?: boolean
}
