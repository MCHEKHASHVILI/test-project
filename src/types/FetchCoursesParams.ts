import { Category } from './Category'
import { Instructor } from './Instructor'
import { SortOption } from './SortOption'
import { Topic } from './Topic'

export interface FetchCoursesParams {
  page?: number
  categories?: Category['id'][]
  topics?: Topic['id'][]
  instructors?: Instructor['id'][]
  sort?: SortOption
}
