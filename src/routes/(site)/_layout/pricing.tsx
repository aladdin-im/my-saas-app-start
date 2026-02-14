import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(site)/_layout/pricing')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(site)/_layout/pricing"!</div>
}
