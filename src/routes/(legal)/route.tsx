import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

export const Route = createFileRoute('/(legal)')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <RootProvider>
                    <Outlet />
                </RootProvider>
            </main>
            <Footer />
        </div>
    )
}
