import { ref } from 'vue'
import { SessionType } from '@/types'
/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
export const sessionTypeOptions = ref<SessionType[]>([
  {
    id: 1,
    name: 'Onlnie',
    location: '',
    icon: 'desktop',
    priceModifier: 0,
    availableSeats: 0,
  },
  {
    id: 2,
    name: 'In Person',
    location: '',
    icon: 'users',
    priceModifier: 0,
    availableSeats: 0,
  },
  {
    id: 3,
    name: 'Hybrid',
    location: '',
    icon: 'intersect',
    priceModifier: 0,
    availableSeats: 0,
  },
])
