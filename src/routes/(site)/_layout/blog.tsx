import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/_layout/blog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(site)/_layout/blog"!</div>
}
