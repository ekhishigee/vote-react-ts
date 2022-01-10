import { addDays } from 'date-fns'
import Cookies from 'universal-cookie'

import { COOKIES } from '../constants/cookies.constants'
import { User } from '../models/user.model'

const cookies = new Cookies()

export const existSessionUser: boolean | any = () => !!cookies.get(COOKIES.SESSION_TOKEN.NAME)

export const setSessionToken = (sessionToken: string) => {
  cookies.set(COOKIES.SESSION_TOKEN.NAME, sessionToken, {
    path: COOKIES.PATH,
    expires: addDays(new Date(), COOKIES.SESSION_TOKEN.EXPIRES)
  })
}

export const setSessionUser = (user: User) => cookies.set(COOKIES.SESSION_USER.NAME, user, {
  path: COOKIES.PATH,
  expires: addDays(new Date(), COOKIES.SESSION_USER.EXPIRES),
})

export const removeSession = () =>
  new Promise<void>((resolve, reject) => {
    try {
      do {
        cookies.remove(COOKIES.SESSION_TOKEN.NAME, { path: COOKIES.PATH })
        cookies.remove(COOKIES.SESSION_USER.NAME, { path: COOKIES.PATH })
      } while (
        cookies.get(COOKIES.SESSION_TOKEN.NAME) ||
        cookies.get(COOKIES.SESSION_USER.NAME)
      )
      resolve()
    } catch (e) {
      reject(e)
    }
  })

export const getSessionToken: string | any = () => cookies.get(COOKIES.SESSION_TOKEN.NAME)

export const getSessionUser: User | any = () => cookies.get(COOKIES.SESSION_USER.NAME)
