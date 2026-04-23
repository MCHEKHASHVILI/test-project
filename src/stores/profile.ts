import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/apiClient'
import { useAuthStore } from './auth'
import { useModalStore } from './modals'
import axios from 'axios'

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

  const ageOptions = computed(() =>
    Array.from({ length: 120 }, (_, i) => {
      return { value: i, label: i }
    }).filter((value) => value.value > 18),
  )

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
    try {
      const response = await apiClient.put('profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (!response.ok) {
        return false
      }
      user.value = response.data.data

      localStorage.setItem('user', JSON.stringify(response.data.data))

      const modalStore = useModalStore()
      const { closeModal } = modalStore
      closeModal()

      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error Occured:', error)
      } else {
        console.error('An unexpected error occurred:', error)
      }
      return false
    } finally {
      // ...
    }
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
    ageOptions,
  }
})
