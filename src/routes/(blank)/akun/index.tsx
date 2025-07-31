import { createFileRoute } from '@tanstack/react-router'
import Akun from "@/features/authenticated/akun"

export const Route = createFileRoute('/(blank)/akun/')({
  component: Akun,
})
