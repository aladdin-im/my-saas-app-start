import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">个人资料</h1>
      <p>这是个人资料设置页面</p>
    </div>
  )
}
