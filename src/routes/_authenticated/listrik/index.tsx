import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/listrik/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/listrik/"!</div>
}
