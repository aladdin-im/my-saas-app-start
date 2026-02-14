import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">设置</h1>
      <p>这是设置页面的主页</p>
    </div>
  )
}
