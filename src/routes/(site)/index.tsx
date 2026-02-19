import { getDb } from '@/db'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getOrders = createServerFn({ method: 'GET' }).handler(async () => {
  const db = await getDb()
  const orders = await db.query.order.findMany()
  console.log('orders', orders)
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

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  )
}
