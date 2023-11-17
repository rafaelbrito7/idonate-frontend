import nookies from 'nookies'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
}

export const isLogged = (): boolean => {
  const cookies = nookies.get()
  const accessToken = cookies.access_token
  const refreshToken = cookies.refresh_token

  if (!accessToken || !refreshToken) {
    return false
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(accessToken)

    const currentTime = Date.now().valueOf() / 1000
    if (decodedToken.exp < currentTime) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
