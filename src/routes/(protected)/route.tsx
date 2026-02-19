import { getSession } from '@/lib/auth.server';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)')({
    beforeLoad: async () => {
        const session = await getSession();
        if (!session) {
            throw redirect({ to: "/login" });
        }
        return { user: session.user };
    },
    component: () => <Outlet />,
})
