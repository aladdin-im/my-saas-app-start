import { createFileRoute, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useRouteContext({ from: '/(protected)' })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">个人资料</h1>
      <div className="space-y-2">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {user.image && <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />}
      </div>
    </div>
  )
}
