import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'
import { balanceApi } from './balanceApi'

interface TransactionRequest {
  service_code: string
}

interface TransactionResponse {
  status: number
  message: string
  data: {
    invoice_number: string
    service_code: string
    service_name: string
    transaction_type: string
    total_amount: number
    created_on: string
  }
}

interface TransactionRecord {
  invoice_number: string
  transaction_type: string
  description: string
  total_amount: number
  created_on: string
}

interface TransactionHistoryRequest {
  offset?: number
  limit?: number
}

interface TransactionHistoryResponse {
  status: number
  message: string
  data: {
    offset: number
    limit: number
    records: TransactionRecord[]
  }
}

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
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
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    createTransaction: builder.mutation<TransactionResponse, TransactionRequest>({
      query: (body) => ({
        url: '/transaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transaction'],
      // After successful transaction, invalidate balance to refetch updated balance
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // Invalidate balance cache to trigger refetch
          dispatch(balanceApi.util.invalidateTags(['Balance']))
        } catch {}
      },
    }),
    getTransactionHistory: builder.query<TransactionHistoryResponse, TransactionHistoryRequest>({
      query: (params) => ({
        url: '/transaction/history',
        params: {
          offset: params.offset || 0,
          limit: params.limit || 10,
        },
      }),
      // Merge new data with existing data for infinite scroll
      serializeQueryArgs: ({ queryArgs }) => {
        // Always use the same cache key regardless of offset
        return { limit: queryArgs.limit || 10 };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.offset === 0) {
          // If offset is 0, replace the entire cache
          return newItems;
        }
        // Otherwise, append new records to existing ones
        return {
          ...newItems,
          data: {
            ...newItems.data,
            records: [...(currentCache?.data?.records || []), ...newItems.data.records],
          },
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        // Refetch when offset changes
        return currentArg?.offset !== previousArg?.offset;
      },
      providesTags: ['Transaction'],
    }),
  }),
})

export const { useCreateTransactionMutation, useGetTransactionHistoryQuery } = transactionApi