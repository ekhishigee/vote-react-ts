const DEFAULT_EXPIRES = 7

export const COOKIES = {
  PATH: '/',
  SESSION_USER: {
    NAME: 's_user',
    EXPIRES: DEFAULT_EXPIRES,
  },
  SESSION_TOKEN: {
    NAME: 's_token',
    EXPIRES: DEFAULT_EXPIRES,
  }
}
