import axios, { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useApiStore } from '@/stores/api'
import { storeToRefs } from 'pinia'
import { type AxiosResponse } from 'axios'
export interface ErrorResponse extends AxiosResponse {
  response: {
    status: number
    message?: string
    conflicts?: []
    errors?: []
    data?: { errors: []; conflicts?: [] }
    ok: boolean
  }
  message?: string
  errors?: []
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
    const { reset } = useApiStore()
    response.ok = response.status >= 200 && response.status < 300
    if (response.ok) reset(response.status)
    return response
  },
  (error) => {
    if (error.response) {
      const { handleErrorResponse } = useApiStore()
      handleErrorResponse(error)
      error.response.ok = false
    }
    return Promise.reject(error)
  },
)

export default apiClient
