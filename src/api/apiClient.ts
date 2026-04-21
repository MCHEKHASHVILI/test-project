import axios, { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useApiStore } from '@/stores/api'
import { storeToRefs } from 'pinia'
import { type AxiosResponse } from 'axios'
export interface ErrorResponse extends AxiosResponse {
  response: { status: number; message?: string; conflicts?: []; errors?: []; ok: boolean }
  message?: string
}
declare module 'axios' {
  export interface AxiosResponse<T = any, D = any> {
    ok?: boolean
  }
}

const apiClient = axios.create({
  baseURL: 'https://api.redclass.redberryinternship.ge/api',
  headers: {
    accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiStore = useApiStore()
    const { loading } = storeToRefs(apiStore)
    loading.value = true
    const authStore = useAuthStore()
    // ONLY add header if requiresAuth is NOT explicitly set to false
    if (config.requiresAuth !== false && authStore.isAuthenticated) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => {
    const apiStore = useApiStore()
    const { loading } = storeToRefs(apiStore)
    // Add custom 'ok' property to successful responses
    response.ok = response.status >= 200 && response.status < 300
    if (response.ok) loading.value = false
    return response
  },
  (error) => {
    // Ensure 'ok' is false even on caught errors
    if (error.response) {
      const apiStore = useApiStore()
      const { loading } = storeToRefs(apiStore)
      error.response.ok = false
      // Set unAuthenticated state
      const { handleErrorResponse } = useApiStore()
      handleErrorResponse(error)
      loading.value = false
    }
    return Promise.reject(error)
  },
)

export default apiClient
