import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ErrorResponse } from '@/api/apiClient'
import { useModalStore } from './modals'
export type Error = {
  message: string
  errors?: {}
  conflicts?: {}
}
export const useApiStore = defineStore('api', () => {
  const modalStore = useModalStore()
  // State
  const loading = ref<boolean>(false)
  const errors = ref()
  const status = ref<number>()
  const message = ref<string>()
  // Actions
  function handleErrorResponse(errorResponse: ErrorResponse) {
    status.value = errorResponse.response.status
    message.value = errorResponse?.message || errorResponse.response?.message
    errors.value = errorResponse.response?.errors

    if (getStatus.value === 401) modalStore.closeModal()
  }
  // Getters
  const getErrors = computed(() => errors.value)
  const getStatus = computed(() => status.value)
  const getMessage = computed(() => message.value)
  const isLoading = computed(() => loading.value)

  return {
    loading,
    errors,
    handleErrorResponse,
    getErrors,
    getStatus,
    getMessage,
    isLoading,
  }
})
