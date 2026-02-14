import { createFileRoute, Outlet } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'

export const Route = createFileRoute('/(site)/blog')({
  component: BlogLayout,
})

function BlogLayout() {
  return (
    <RootProvider>
      <Outlet />
    </RootProvider>
  )
}
