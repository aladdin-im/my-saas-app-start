import { Button } from '@/components/ui/button'
import { getDb } from '@/db'
import { authClient } from '@/lib/auth-client'
import { createOrder } from '@/lib/order.server'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'

const getOrders = createServerFn({ method: 'GET' }).handler(async () => {
  const db = await getDb()
  const orders = await db.query.order.findMany()
  return orders
})

export const Route = createFileRoute('/(site)/')({
  loader: async () => {
    const orders = await getOrders()
    return { orders }
  },
  component: App,
})

function App() {
  const { orders } = Route.useLoaderData()
  const router = useRouter()
  const session = authClient.useSession()

  const handleCreateOrder = useServerFn(createOrder)

  const onCreateOrder = async () => {
    if (!session.data) {
      router.navigate({ to: '/login' })
      return
    }
    try {
      await handleCreateOrder({ data: { status: 'pending' } })
      toast.success('Order created')
      router.invalidate()
    } catch {
      toast.error('Failed to create order')
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>

      <pre>{JSON.stringify(session.data, null, 2)}</pre>

      <Button onClick={() => authClient.signIn.social({ provider: 'github' })}>Sign In with Github</Button>

      <Button onClick={() => authClient.signOut()}>Sign Out</Button>

      <Button onClick={onCreateOrder}>Create Order</Button>
    </div>
  )
}
