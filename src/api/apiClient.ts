import axios from 'axios'

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
