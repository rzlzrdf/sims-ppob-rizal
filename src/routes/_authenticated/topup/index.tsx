import { createFileRoute } from '@tanstack/react-router'
import TopUp from "@/features/authenticated/topup"

export const Route = createFileRoute('/_authenticated/topup/')({
  component: TopUp,
})

