import {
    Bell,
    Coins,
    CreditCard,
    GalleryVerticalEnd,
    LayoutDashboard,
    ListChecks,
    MessageSquare,
    Receipt,
    Shield,
    User,
    Users,
    UserX
} from "lucide-react"
import * as React from "react"

import { NavGroup } from "@/components/settings/NavGroup"
import { NavSecondary } from "@/components/settings/NavSecondary"
// import { NavUser } from "@/components/settings/NavUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
// import { SessionUser } from "@/lib/auth"
import { siteConfig } from "config"

export const navData = {
    navAdmin: {
        title: "Admin",
        items: [
            {
                name: "Dashboard",
                url: "/settings/admin/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Users",
                url: "/settings/admin/users",
                icon: Users,
            },
            {
                name: "Feedback",
                url: "/settings/admin/feedback",
                icon: MessageSquare,
            },
            {
                name: "Deletions",
                url: "/settings/admin/deletions",
                icon: UserX,
            },
            {
                name: "Credits",
                url: "/settings/admin/credits",
                icon: Coins,
            }
        ]
    },
    navAccountSettings: {
        title: "Account",
        items: [
            {
                name: "Profile",
                url: "/settings/profile",
                icon: User,
            },
            {
                name: "Security",
                url: "/settings/security",
                icon: Shield,
            }
        ]
    },
    navBillingSettings: {
        title: "Billing",
        items: [
            {
                name: "Credits",
                url: "/settings/credits",
                icon: Coins,
            },
            {
                name: "Subscription",
                url: "/settings/subscription",
                icon: CreditCard,
            },
            {
                name: "Purchases",
                url: "/settings/purchases",
                icon: Receipt,
            }
        ]
    },
    navUsageSettings: {
        title: "Usage",
        items: [
            {
                name: "Tasks",
                url: "/settings/tasks",
                icon: ListChecks,
            },
            {
                name: "Notifications",
                url: "/settings/notifications",
                icon: Bell,
            },
        ]
    },
    navSecondary: [
        {
            title: "Help & Support",
            url: "/help",
            icon: MessageSquare,
        },
    ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    // user: SessionUser
}

export function AppSidebar({ ...props }: AppSidebarProps) {
    // const isAdmin = user.role === 'admin'

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">{siteConfig.name}</span>
                                    {/* <span className="">v1.0.0</span> */}
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavGroup data={navData.navAdmin} />
                <NavGroup data={navData.navAccountSettings} />
                <NavGroup data={navData.navBillingSettings} />
                {/* <NavGroup data={navData.navUsageSettings} /> */}
                <NavSecondary items={navData.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={user} /> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
