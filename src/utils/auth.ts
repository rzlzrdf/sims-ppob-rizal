import Cookies from 'js-cookie'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const TOKEN_EXPIRY_DAYS = 7

interface UserData {
  email?: string
  first_name?: string
  last_name?: string
  profile_image?: string
}

export const authUtils = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { 
      expires: TOKEN_EXPIRY_DAYS,
      secure: true,
      sameSite: 'strict'
    })
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY)
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY)
  },

  setUser: (user: UserData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser: (): UserData | null => {
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
    return null
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY)
  },

  clearAll: () => {
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(TOKEN_KEY)
  }
}