import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import { useAuthStore } from './auth'

export const useProfileStore = defineStore('profile', () => {
  // State
  const fullName = ref<string | null>(null)
  const mobileNumber = ref<string | null>(null)
  const age = ref<number | null>(null)
  const avatar = ref<File | null>(null)

  const authStore = useAuthStore()

  // Getters
  const avatarUrl = computed((): string | null => {
    if (avatar.value) {
      return URL.createObjectURL(avatar.value)
    }
    if (authStore.user && typeof authStore.user.avatar === 'string') {
      return authStore.user.avatar
    }
    return null
  })

  const ifProfileComplete = computed(() => {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') ?? '{}').profileComplete
      : false
  })

  const userName = computed(() => {
    if (authStore.user) {
      return authStore.user.username
    }
    return null
  })

  // Actions
  async function fetchProfile() {
    try {
      const response = await apiClient.get('me', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      fullName.value = response.data.data.fullName
      mobileNumber.value = response.data.data.mobileNumber
      age.value = response.data.data.age
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  async function updateProfile() {
    const formData = new FormData()
    formData.append('full_name', fullName.value || '')
    formData.append('mobile_number', mobileNumber.value || '')
    formData.append('age', age.value !== null ? age.value.toString() : '')
    if (avatar.value instanceof File) formData.append('avatar', avatar.value)
    const response = await apiClient.put('profile', formData, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    localStorage.setItem('user', JSON.stringify(response.data.data))

    return !!response.ok
  }

  return {
    fullName,
    mobileNumber,
    age,
    avatar,
    avatarUrl,
    ifProfileComplete,
    userName,
    fetchProfile,
    updateProfile,
  }
})
