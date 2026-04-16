// 1. Define the runtime array first
export const SORT_OPTIONS = [
  'newest',
  'oldest',
  'popular',
  'price_asc',
  'price_desc',
  'title_asc',
] as const

// 2. Derive the type from the array
export type SortOption = (typeof SORT_OPTIONS)[number]
