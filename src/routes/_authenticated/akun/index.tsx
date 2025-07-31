import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/akun/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/akun/"!</div>
}
