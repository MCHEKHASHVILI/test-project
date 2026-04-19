import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import { UserAuthenticationForm, UserProfile } from '@types'
import { useModalStore } from './modals'

export const useAuthStore = defineStore('auth', () => {
  // State
  const email = ref<UserAuthenticationForm['email']>()
  const password = ref<UserAuthenticationForm['password']>()
  const user = ref<UserProfile | null>(JSON.parse(localStorage.getItem('user') || '{}'))
  const token = ref<string | null>(localStorage.getItem('token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && token.value !== null)
  const isAuthorized = computed(
    () => user.value && Object.keys(user.value).length && user.value.profileComplete,
  )

  // Actions
  async function login(): Promise<void> {
    const credentials: UserAuthenticationForm = {
      email: email.value,
      password: password.value,
    }
    const response = await apiClient.post('login', credentials)
    if (!response.ok) {
      // Show Error Messages

      return
    }
    const { data } = response.data
    authenticate(data)
    const modalStore = useModalStore()
    const { closeModal } = modalStore
    closeModal()
  }

  function authenticate(data: { user: UserProfile; token: string }) {
    user.value = data.user
    token.value = data.token

    // Persist to local storage to maintain session on refresh
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
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
    login,
    logout,
    authenticate,
    isAuthorized,
    isAuthenticated,
  }
})
