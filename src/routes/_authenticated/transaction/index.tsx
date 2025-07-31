import { createFileRoute } from '@tanstack/react-router'
import Transaction from "@/features/authenticated/transaction"
export const Route = createFileRoute('/_authenticated/transaction/')({
  component: Transaction,
})