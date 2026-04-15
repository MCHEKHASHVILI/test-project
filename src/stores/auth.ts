import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import { UserRegistrationForm, UserAuthenticationForm, UserProfile } from '@types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const email = ref<UserAuthenticationForm['email']>()
  const password = ref<UserAuthenticationForm['password']>()
  const user = ref<UserProfile | null>(
    JSON.parse(localStorage.getItem('user') ?? '{}') as UserProfile,
  )
  const token = ref<string | null>(localStorage.getItem('token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && token.value !== null)
  // Actions
  async function register(userRegistrationForm: UserRegistrationForm) {
    const response = await apiClient.post('register', userRegistrationForm)
  }

  async function login(credentials: UserAuthenticationForm) {
    const response = await apiClient.post('login', credentials)

    if (!response.ok) {
      return false
    }

    const { data } = response.data

    user.value = data.user
    token.value = data.token

    // Persist to local storage to maintain session on refresh
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)

    return true
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return {
    email,
    password,
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout,
  }
})
