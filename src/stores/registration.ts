import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

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

  // Actions
  async function register() {
    const formData = new FormData()
    formData.append('email', email.value || '')
    formData.append('password', password.value || '')
    formData.append('password_confirmation', passwordConfirmation.value || '')
    formData.append('username', userName.value || '')
    if (avatar.value instanceof File) formData.append('avatar', avatar.value)
    const response = await authStore.register(formData)
    return response
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
    let color = currentStep.value === index ? 'bg-brand-yellow-200' : 'bg-brand-yellow-50'
    color = currentStep.value > index ? 'bg-brand-yellow-500' : color
    color = currentStep.value < index - 1 ? 'bg-brand-yellow-50' : color
    return color
  }

  return {
    currentStep,
    totalSteps,
    email,
    password,
    passwordConfirmation,
    userName,
    avatar,
    register,
    prevStep,
    nextStep,
    getStepBgColor,
  }
})
