import { createFileRoute } from '@tanstack/react-router'
import Login from "@/features/auth/login"

export const Route = createFileRoute('/(auth)/login/')({
  component: Login,
})

