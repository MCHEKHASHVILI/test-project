import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useModalStore } from './modals'
import apiClient from '@/api/apiClient'

export const useRegistrationStore = defineStore('registration', () => {
  const authStore = useAuthStore()

  // State
  const currentStep = ref<number>(1)
  const totalSteps = ref<number>(3)
  const email = ref<string | null>(null)
  const password = ref<string | null>(null)
  const passwordConfirmation = ref<string | null>(null)
  const userName = ref<string | null>(null)
  const avatar = ref<File | null>(null)
  const validationErrors = ref()

  // Actions
  async function register() {
    const formData = new FormData()
    formData.append('email', email.value || '')
    formData.append('password', password.value || '')
    formData.append('password_confirmation', passwordConfirmation.value || '')
    formData.append('username', userName.value || '')
    if (avatar.value instanceof File) formData.append('avatar', avatar.value)
    try {
      const response = await apiClient.post('register', formData)
      if (!response.ok) {
        return false
      }
      const { data } = response.data
      authStore.authenticate(data)
      reset()
      const modalStore = useModalStore()
      const { closeModal } = modalStore
      closeModal()
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data?.message || error.message
        if (status === 422) {
          validationErrors.value = error.response?.data?.errors
          return false
        }
        console.error(`API Error (${status}): ${message}`)
      } else {
        console.error('An unexpected error occurred:', error)
      }
      return false
    } finally {
      // ...
    }
  }

  function nextStep() {
    if (currentStep.value < totalSteps.value) {
      currentStep.value = currentStep.value + 1
    }
  }
  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value = currentStep.value - 1
    }
  }

  function getStepBgColor(index: number): string {
    let color = currentStep.value === index ? 'bg-purple-200' : 'bg-purple-50'
    color = currentStep.value > index ? 'bg-purple-500' : color
    color = currentStep.value < index - 1 ? 'bg-purple-50' : color
    return color
  }

  function reset() {
    currentStep.value = 1
    email.value = null
    password.value = null
    passwordConfirmation.value = null
    userName.value = null
    avatar.value = null
  }

  return {
    currentStep,
    totalSteps,
    email,
    password,
    passwordConfirmation,
    userName,
    avatar,
    validationErrors,
    register,
    prevStep,
    nextStep,
    getStepBgColor,
  }
})
