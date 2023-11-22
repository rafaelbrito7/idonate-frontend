/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookie, destroyCookie } from 'nookies'

import { refreshAuthHeader } from '../services/api'

// export const getTokenCookie = (ctx: undefined) => {
//   const cookies = parseCookies(ctx)

// }

export const setTokenCookie = (cookieName: string, tkt: string) => {
  setCookie(null, cookieName, tkt, {
    maxAge: 86400,
    path: '/',
    sameSite: 'none',
    secure: true,
  })
  refreshAuthHeader(tkt)
}

export const setRefreshTokenCookie = (tkt: string) => {
  setCookie(null, 'refresh_token', tkt, {
    maxAge: 86400,
    path: '/',
    sameSite: 'none',
    secure: true,
  })
}

export const destroyToken = (cookieName: string, ctx?: any) => {
  destroyCookie(ctx ?? {}, cookieName, {
    path: '/',
  })
  refreshAuthHeader()
}
