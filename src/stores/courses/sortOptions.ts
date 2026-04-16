import { ref } from 'vue'
import { SelectOption } from '@/types'
/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
export const sortOptions = ref<SelectOption[]>([
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
