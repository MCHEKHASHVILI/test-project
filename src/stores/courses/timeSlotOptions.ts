import { ref } from 'vue'
import { TimeSlotOption } from '@/types'
/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
export const timeSlotOptions = ref<TimeSlotOption[]>([
  {
    id: 1,
    label: 'Morning',
    time: '9:00 AM – 12:00 PM',
    icon: 'bug',
  },
  {
    id: 2,
    label: 'Afternoon',
    time: '12:00 AM – 6:00 PM',
    icon: 'sun',
  },
  {
    id: 3,
    label: 'Evening',
    time: '6:00 AM – 9:00 PM',
    icon: 'moon',
  },
])
