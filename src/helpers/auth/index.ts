import axios from 'axios'
import {
  destroyToken,
  getAccessTokenAndRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '../../config/tokens'
import { api } from '../../services/api'
import { loginFormValidationSchema } from '../../schemas/zod'
import * as zod from 'zod'

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

export const isAuthenticated = (): boolean => {
  const tokens = getAccessTokenAndRefreshToken()
  if (!tokens.accessToken) {
    return false
  }
  return true
}

export const login = async (data: LoginFormData) => {
  try {
    const cookies = getAccessTokenAndRefreshToken()

    if (cookies.accessToken) destroyToken('access_token')
    if (cookies.refreshToken) destroyToken('refresh_token')

    const response = await api.post('/auth/login', data)

    const {
      payload: { tokens },
    } = response.data

    setAccessTokenCookie('access_token', tokens.access_token)
    setRefreshTokenCookie(tokens.refresh_token)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Falha ao realizar login!',
        )
      } else if (error.request) {
        throw new Error('Erro de conexão: Incapaz de alcançar o servidor.')
      } else {
        throw new Error(
          'Erro: Não foi possível lidar com a requisição de login',
        )
      }
    } else {
      throw new Error('Algo inesperado aconteceu. Tente novamente mais tarde!')
    }
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
    destroyToken('access_token')
    destroyToken('refresh_token')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Falha ao realizar logout!',
        )
      } else if (error.request) {
        throw new Error('Erro de conexão: Incapaz de alcançar o servidor.')
      } else {
        throw new Error(
          'Erro: Não foi possível lidar com a requisição de logout',
        )
      }
    } else {
      throw new Error('Algo inesperado aconteceu. Tente novamente mais tarde!')
    }
  }
}
