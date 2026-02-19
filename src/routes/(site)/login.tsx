import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(site)/login"!</div>
}
