import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { authUtils } from '@/utils/auth'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email?: string
    first_name?: string
    last_name?: string
    profile_image?: string
  } | null
  token: string | null
}

const initialState: AuthState = {
  isAuthenticated: authUtils.isAuthenticated(),
  user: authUtils.getUser(),
  token: authUtils.getToken() || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: AuthState['user']; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      authUtils.setToken(action.payload.token)
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      authUtils.clearAll()
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true
          state.token = payload.data.token
          authUtils.setToken(payload.data.token)
          // TODO: Fetch user data from profile endpoint if needed
          state.user = null
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true
          state.user = payload.user
          state.token = payload.token
        }
      )
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.isAuthenticated = false
          state.user = null
          state.token = null
          authUtils.clearAll()
        }
      )
      .addMatcher(
        authApi.endpoints.getProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data
          authUtils.setUser(payload.data)
        }
      )
      .addMatcher(
        authApi.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data
          authUtils.setUser(payload.data)
        }
      )
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer