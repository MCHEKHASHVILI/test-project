import { Course } from '@types'
export interface BrowseCoursesResponse {
  data: Course[]
  meta: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}
