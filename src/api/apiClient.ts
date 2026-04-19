import axios, { InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

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
    // Add custom 'ok' property to successful responses
    response.ok = response.status >= 200 && response.status < 300
    return response
  },
  (error) => {
    // Ensure 'ok' is false even on caught errors
    if (error.response) {
      error.response.ok = false
    }
    return Promise.reject(error)
  },
)

export default apiClient
