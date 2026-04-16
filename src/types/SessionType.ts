export interface SessionType {
  id: number
  courseScheduleId?: number
  name: string
  priceModifier: number
  availableSeats: number
  location: string
  icon?: string
}
