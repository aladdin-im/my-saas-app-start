import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/settings/admin/system',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/settings/_layout/admin/system"!</div>
}
