import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from './api/authApi'
import { balanceApi } from './api/balanceApi'
import { serviceApi } from './api/serviceApi'
import { transactionApi } from './api/transactionApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      balanceApi.middleware, 
      serviceApi.middleware,
      transactionApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch