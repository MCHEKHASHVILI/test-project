import { ref } from 'vue'
import { TimeSlot } from '@/types'
/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
export const timeSlotOptions = ref<TimeSlot[]>([
  {
    id: 1,
    label: 'Morning',
    // localLabel: '9:00 AM – 12:00 PM',
    startTime: '09:00:00',
    endTime: '12:00:00',
    icon: 'cloud_sun',
  },
  {
    id: 2,
    label: 'Afternoon',
    // localLabel: '12:00 AM – 6:00 PM',
    startTime: '12:00:00',
    endTime: '18:00:00',
    icon: 'sun',
  },
  {
    id: 3,
    label: 'Evening',
    // localLabel: '6:00 AM – 9:00 PM',
    startTime: '18:00:00',
    endTime: '21:00:00',
    icon: 'moon',
  },
])
