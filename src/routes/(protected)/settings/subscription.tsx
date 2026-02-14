import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/settings/subscription',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/settings/_layout/subscription"!</div>
}
