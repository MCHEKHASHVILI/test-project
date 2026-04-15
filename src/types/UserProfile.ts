import { UserAuthenticationForm } from './UserAuthenticationForm'
export interface UserProfile {
  id: number
  username: string
  email: UserAuthenticationForm['email']
  password: UserAuthenticationForm['password']
  avatar: string
  fullName: string
  mobileNumber: string
  age: number
  profileComplete: boolean
}
