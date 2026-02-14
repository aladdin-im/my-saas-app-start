import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/settings/admin/feedback',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/settings/_layout/admin/feedback"!</div>
}
