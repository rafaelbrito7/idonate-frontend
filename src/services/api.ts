/* eslint-disable dot-notation */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getAccessTokenAndRefreshToken } from '../config/tokens'
import { logout } from '../helpers/auth'

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
} as AxiosRequestConfig)

api.interceptors.request.use(
  async (config) => {
    const cookies = getAccessTokenAndRefreshToken()
    const accessToken = cookies.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === 'JWT expired')
    ) {
      await logout()
    }
    return Promise.reject(error)
  },
)

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       try {
//         const refreshToken = cookies.refreshToken
//         if (!refreshToken) {
//           redirect('/login')
//           return Promise.reject(error)
//         }
//         const { data } = await api.post('/auth/refresh', {
//           Headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         })
//         setAccessTokenCookie('access_token', data.accessToken)
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//         return api(originalRequest)
//       } catch (refreshError) {
//         redirect('/login')

//         return Promise.reject(refreshError)
//       }
//     }
//     return Promise.reject(error)
//   },
// )
