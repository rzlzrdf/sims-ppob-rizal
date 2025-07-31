import BaseLayout from '@/layout/BaseLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authUtils } from '@/utils/auth'

export const Route = createFileRoute('/_authenticated')({
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
  component: BaseLayout,
})