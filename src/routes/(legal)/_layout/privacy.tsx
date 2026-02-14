import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/_layout/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600">This is the privacy policy page.</p>
    </div>
  )
}
