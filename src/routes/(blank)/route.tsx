import { createFileRoute, redirect } from '@tanstack/react-router'
import { authUtils } from '@/utils/auth'
import BlankLayout from '@/layout/BlankLayout'

export const Route = createFileRoute('/(blank)')({
  beforeLoad: async ({ location }) => {
    if (!authUtils.isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: BlankLayout,
})