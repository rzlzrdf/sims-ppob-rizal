import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

interface BalanceResponse {
  status: number
  message: string
  data: {
    balance: number
  }
}

interface TopupRequest {
  top_up_amount: number
}

interface TopupResponse {
  status: number
  message: string
  data: {
    balance: number
  }
}

export const balanceApi = createApi({
  reducerPath: 'balanceApi',
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
  tagTypes: ['Balance'],
  endpoints: (builder) => ({
    getBalance: builder.query<BalanceResponse, void>({
      query: () => '/balance',
      providesTags: ['Balance'],
    }),
    topup: builder.mutation<TopupResponse, TopupRequest>({
      query: (body) => ({
        url: '/topup',
        method: 'POST',
        body,
      }),
      // Invalidate balance cache after successful topup
      invalidatesTags: ['Balance'],
    }),
  }),
})

export const { useGetBalanceQuery, useTopupMutation } = balanceApi