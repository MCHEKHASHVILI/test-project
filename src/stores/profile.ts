import { defineStore, storeToRefs } from 'pinia'
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
  const { user } = storeToRefs(authStore)

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
    return user && user.value && user.value.profileComplete
  })

  const userName = computed(() => {
    if (authStore.user) {
      return authStore.user.username
    }
    return null
  })

  const email = computed(() => {
    if (authStore.user) {
      return authStore.user.email
    } else {
      return null
    }
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

  async function updateProfile(): Promise<boolean> {
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
    if (!response.ok) {
      return false
    }

    user.value = response.data.data

    localStorage.setItem('user', JSON.stringify(response.data.data))

    return true
  }

  return {
    fullName,
    mobileNumber,
    age,
    avatar,
    avatarUrl,
    ifProfileComplete,
    userName,
    email,
    fetchProfile,
    updateProfile,
  }
})
