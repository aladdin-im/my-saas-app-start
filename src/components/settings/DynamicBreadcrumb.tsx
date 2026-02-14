import { navData } from "@/components/settings/AppSidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Link, useLocation } from "@tanstack/react-router"
import { useMemo } from "react"

export function DynamicBreadcrumb() {
    const pathname = useLocation().pathname

    // 从 navData 生成路由映射
    const routeNameMap = useMemo(() => {
        const map: Record<string, string> = {
            '/settings': 'Settings',
        }

        navData.navAdmin.items.forEach(item => {
            map[item.url] = item.name
        })

        navData.navAccountSettings.items.forEach(item => {
            map[item.url] = item.name
        })

        navData.navBillingSettings.items.forEach(item => {
            map[item.url] = item.name
        })

        navData.navUsageSettings.items.forEach(item => {
            map[item.url] = item.name
        })

        navData.navSecondary.forEach(item => {
            map[item.url] = item.title
        })

        return map
    }, [])

    // 解析路径生成面包屑
    const pathSegments = pathname.split('/').filter(Boolean)

    // 生成面包屑项
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/')
        const name = routeNameMap[path] || segment.charAt(0).toUpperCase() + segment.slice(1)

        return {
            path,
            name,
            isLast: index === pathSegments.length - 1
        }
    })

    // 如果只有一级路径，直接显示
    if (breadcrumbItems.length === 1) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumbItems[0].name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

    // 多级路径
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <div key={item.path} className="flex items-center gap-2">
                        <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                            {item.isLast ? (
                                // 最后一个层级：不可点击（当前页面）
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            ) : index === 0 ? (
                                // 第一个层级 (Settings)：不可点击，置灰
                                <span className="text-muted-foreground">{item.name}</span>
                            ) : (
                                // 中间层级：可点击
                                <BreadcrumbLink asChild>
                                    <Link to={item.path}>{item.name}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!item.isLast && (
                            <BreadcrumbSeparator className="hidden md:block" />
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

