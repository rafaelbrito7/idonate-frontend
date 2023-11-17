/* eslint-disable dot-notation */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const refreshAuthHeader = (token?: string) => {
  api.defaults.headers.common['authorization'] = token ? `Bearer ${token}` : ''
}

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
} as AxiosRequestConfig)
