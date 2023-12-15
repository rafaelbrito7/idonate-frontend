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
