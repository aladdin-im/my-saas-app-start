import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings/admin/')({
    beforeLoad: async () => {
        throw redirect({
            to: '/settings/admin/dashboard',
        })
    },
})
