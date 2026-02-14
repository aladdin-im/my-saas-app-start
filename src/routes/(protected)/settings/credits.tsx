import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/credits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/settings/_layout/credits"!</div>
}
