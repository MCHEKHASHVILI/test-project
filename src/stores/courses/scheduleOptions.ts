import { ref } from 'vue'
import { ScheduleOption } from '@/types'
/**
 * @Todo find a way get the possible keys from api to make it more dynamic.
 */
export const scheduleOptions = ref<ScheduleOption[]>([
  {
    id: 1,
    label: 'Monday - Wednesday',
    customLabel: 'Mon - Wed',
    days: ['monday', 'wednesday'],
  },
  {
    id: 2,
    label: 'Tuesday - Thursday',
    customLabel: 'Tue - Thu',
    days: ['tuesday', 'thursday'],
  },
  {
    id: 3,
    label: 'Friday - Saturday',
    customLabel: 'Fri - Sat',
    days: ['friday', 'saturday'],
  },
  {
    id: 4,
    label: 'Weekend Only',
    customLabel: 'Weekend',
    days: ['saturday', 'sunday'],
  },
])
