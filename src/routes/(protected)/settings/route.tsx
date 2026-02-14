import { AppSidebar } from '@/components/settings/AppSidebar'
import { DynamicBreadcrumb } from '@/components/settings/DynamicBreadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        {/* 加 min-w-0 防止页面宽度不受控制出现滚动条 */}
        <SidebarInset className="min-w-0">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
            {/* <div className="ml-auto flex items-center gap-4 px-2 md:px-4">
              <CreditsDisplay />
              <AnimatedThemeToggler />
            </div> */}
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
