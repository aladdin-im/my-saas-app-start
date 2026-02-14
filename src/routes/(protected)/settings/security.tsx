import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/security')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">安全设置</h1>
      <p>这是安全设置页面</p>
    </div>
  )
}
