import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import { UserRegistrationForm, UserAuthenticationForm, UserProfile } from '@types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const email = ref<UserAuthenticationForm['email']>()
  const password = ref<UserAuthenticationForm['password']>()
  const user = ref<UserProfile>()
  const avatar = ref<UserProfile['avatar']>()
  const token = ref<string>()

  // Getters
  const isAuthenticated = computed(() => !!token.value && token.value !== 'undefined')
  const userProfile = computed({
    get() {
      const rawData = localStorage.getItem('user') ?? '{}'

      return JSON.parse(rawData) as UserProfile
    },
    set(newValue: UserProfile) {
      email.value = newValue.email
    },
  })
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
    user.value = undefined
    token.value = undefined
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const toSnakeCase = (str: string) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, '') // Removes a leading underscore if the input was PascalCase
  }

  async function updateProfile() {
    const formData = new FormData()

    Object.entries(userProfile.value).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append(key, value)
      } else if (key !== 'avatar') {
        formData.append(toSnakeCase(key), value)
      }
    })

    const response = await apiClient.put('profile', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart-form/data',
        Authorization: `Bearer ${token.value}`,
      },
    })

    localStorage.setItem('user', JSON.stringify(response.data.data))

    if (response.ok) {
      userProfile.value.avatar = response.data.data.avatar
    }

    return !!response.ok
  }

  return {
    email,
    password,
    avatar,
    user,
    token,
    isAuthenticated,
    userProfile,
    register,
    login,
    logout,
    updateProfile,
  }
})
