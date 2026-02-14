import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/_layout/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-600">This is the terms of service page.</p>
    </div>
  )
}
