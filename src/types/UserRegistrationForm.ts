import { UserAuthenticationForm } from './UserAuthenticationForm'
export interface UserRegistrationForm {
  username: string
  email: UserAuthenticationForm['email']
  password: UserAuthenticationForm['password']
  password_confirmation: UserAuthenticationForm['password']
  avatar: string
}
