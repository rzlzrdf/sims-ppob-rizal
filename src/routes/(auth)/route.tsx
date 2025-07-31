import AuthLayout from '@/layout/AuthLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authUtils } from '@/utils/auth'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: async () => {
    if (authUtils.isAuthenticated()) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: AuthLayout
})
