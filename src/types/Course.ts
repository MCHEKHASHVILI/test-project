import { Category, Topic, Instructor } from '@types'

export interface Course {
  id: number
  title: string
  description: string
  image: string
  basePrice: number
  durationWeeks: number
  hours?: number
  isFeatured: true
  avgRating: number
  reviewCount: number
  category: Category
  topic: Topic
  instructor: Instructor
}
