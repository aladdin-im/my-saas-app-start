import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/order')({
    server: {
        handlers: {
            GET: async ({ request }: { request: Request }) => {
                return new Response(JSON.stringify({ message: `Hello World!` }))
            },
        },
    },
})
