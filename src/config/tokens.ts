/* eslint-disable @typescript-eslint/no-explicit-any */
import nookies from 'nookies'

export const getAccessTokenAndRefreshToken = () => {
  const cookies = nookies.get()

  return {
    accessToken: cookies.access_token,
    refreshToken: cookies.refresh_token,
  }
}

export const setAccessTokenCookie = (cookieName: string, tkt: string) => {
  nookies.set(null, cookieName, tkt, {
    maxAge: 86450,
    path: '/',
    sameSite: 'none',
    secure: true,
  })
}

export const setRefreshTokenCookie = (tkt: string) => {
  nookies.set(null, 'refresh_token', tkt, {
    maxAge: 604850,
    path: '/',
    sameSite: 'none',
    secure: true,
  })
}

export const destroyToken = (cookieName: string, ctx?: any) => {
  nookies.destroy(ctx ?? {}, cookieName, {
    path: '/',
  })
}
