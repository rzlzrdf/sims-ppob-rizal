import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

interface Service {
  service_code: string
  service_name: string
  service_icon: string
  service_tariff: number
}

interface ServicesResponse {
  status: number
  message: string
  data: Service[]
}

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
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
  tagTypes: ['Service'],
  endpoints: (builder) => ({
    getServices: builder.query<ServicesResponse, void>({
      query: () => '/services',
      providesTags: ['Service'],
    }),
  }),
})

export const { useGetServicesQuery } = serviceApi