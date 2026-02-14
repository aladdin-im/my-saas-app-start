import { blog } from '@/lib/source'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

export const Route = createFileRoute('/(site)/blog/')({
    component: BlogListPage,
    loader: async () => {
        return await serverLoader()
    },
})

// 使用 serverFn 确保数据正确序列化
const serverLoader = createServerFn({
    method: 'GET',
}).handler(async () => {
    const pages = blog.getPages()

    return {
        pages: pages.map((page) => ({
            url: page.url,
            slugs: page.slugs,
            title: page.data.title,
            description: page.data.description || null,
            date: page.data.date,
            author: page.data.author,
            image: page.data.image,
            avatar: page.data.avatar,
        })),
    }
})

function BlogListPage() {
    const { pages } = Route.useLoaderData()

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* 页面标题 */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                <p className="text-lg text-fd-muted-foreground">
                    Read about our latest product features, solutions, and updates.
                </p>
            </div>

            {/* 博客文章网格 */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pages.map((post) => (
                    <Link
                        key={post.url}
                        to={post.url}
                        className="group block rounded-xl overflow-hidden border border-fd-border bg-fd-card hover:shadow-lg transition-all duration-300"
                    >
                        {/* 封面图片 */}
                        <div className="relative aspect-video overflow-hidden bg-fd-muted">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                        </div>

                        {/* 文章内容 */}
                        <div className="p-6">
                            {/* 标题 */}
                            <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-fd-primary transition-colors">
                                {post.title}
                            </h2>

                            {/* 描述 */}
                            <p className="text-fd-muted-foreground line-clamp-3 text-sm">
                                {post.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
