import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

interface ApiErrorResponse {
  status: number
  message: string
  data: null
}

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  status: number
  message: string
  data: {
    token: string
  }
}

interface RegisterRequest {
  email: string
  password: string
  name: string
}

interface RegisterResponse {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

interface UserProfile {
  email: string
  first_name: string
  last_name: string
  profile_image: string
}

interface ProfileResponse {
  status: number
  message: string
  data: UserProfile
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
    responseHandler: async (response) => {
      const data = await response.json()
      if (!response.ok) {
        throw { status: response.status, data }
      }
      return data
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/profile',
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetProfileQuery } = authApi