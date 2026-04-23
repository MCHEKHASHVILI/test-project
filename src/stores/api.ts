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
  const conflicts = ref()
  const status = ref<number>()
  const message = ref<string>()
  // Actions
  function handleErrorResponse(errorResponse: ErrorResponse) {
    status.value = errorResponse.response.status
    message.value = errorResponse?.message || errorResponse.response?.message
    errors.value =
      errorResponse?.errors ||
      errorResponse.response?.errors ||
      errorResponse.response?.data?.errors
    conflicts.value = errorResponse.response?.conflicts || errorResponse.response?.data?.conflicts
    // turn off loading
    loading.value = false
    // Handle unauthorized and 500 server errors (just closing modals)
    if (getStatus.value === 401 || getStatus.value === 500) modalStore.closeModal()
  }

  function reset(statusCode: number) {
    loading.value = false
    errors.value = []
    status.value = statusCode
    message.value = ''
  }
  // Getters
  const getErrors = computed(() => errors.value)
  const getConflicts = computed(() => conflicts.value[0])
  const getStatus = computed(() => status.value)
  const getMessage = computed(() => message.value)
  const isLoading = computed(() => loading.value)

  return {
    loading,
    errors,
    handleErrorResponse,
    reset,
    getErrors,
    getConflicts,
    getStatus,
    getMessage,
    isLoading,
  }
})
