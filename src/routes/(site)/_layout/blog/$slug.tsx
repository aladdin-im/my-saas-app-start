import { BlogShareButton } from '@/components/BlogShareButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blog } from '@/lib/source';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import browserCollections from 'fumadocs-mdx:collections/browser';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { default as defaultMdxComponents } from 'fumadocs-ui/mdx';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/(site)/_layout/blog/$slug')({
    component: BlogPostPage,
    loader: async ({ params }) => {
        const data = await serverLoader({ data: params.slug })
        await clientLoader.preload(data.path)
        return data
    },
})

const serverLoader = createServerFn({
    method: 'GET',
})
    .inputValidator((slug: string) => slug)
    .handler(async ({ data: slug }) => {
        const page = blog.getPage([slug])
        if (!page) throw notFound()

        return {
            path: page.path,
            title: page.data.title,
            description: page.data.description,
            date: page.data.date,
            author: page.data.author,
        }
    })

const clientLoader = browserCollections.blogPosts.createClientLoader({
    component({ toc, frontmatter, default: MDX }) {
        return (
            <div>
                {/* 返回导航链接 */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                {/* 博客标题 */}
                <h1 className="mb-4 text-4xl font-bold">{frontmatter.title}</h1>

                {/* 描述 */}
                {frontmatter.description && (
                    <p className="text-xl text-muted-foreground mb-8">
                        {frontmatter.description}
                    </p>
                )}

                {/* 作者信息区域：头像和作者名称、发布日期 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                            {frontmatter.avatar && (
                                <AvatarImage
                                    src={frontmatter.avatar}
                                    alt={frontmatter.author || 'Author'}
                                />
                            )}
                            <AvatarFallback>
                                {frontmatter.author?.charAt(0).toUpperCase() || 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-base">{frontmatter.author}</p>
                            <p className="text-sm text-fd-muted-foreground">
                                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* 分享按钮 - 客户端交互 */}
                    <BlogShareButton title={frontmatter.title} description={frontmatter.description} />
                </div>

                {/* 文章封面图片 */}
                {frontmatter.image && (
                    <div className="mb-8 rounded-lg overflow-hidden">
                        <img
                            src={frontmatter.image}
                            alt={frontmatter.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* 目录导航 */}
                {toc && toc.length > 0 && (
                    <div className="mb-8">
                        <InlineTOC items={toc} />
                    </div>
                )}

                {/* 文章正文内容 */}
                <article className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDX components={defaultMdxComponents} />
                </article>
            </div>
        )
    },
})

function BlogPostPage() {
    const data = useFumadocsLoader(Route.useLoaderData())

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Suspense
                fallback={
                    <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-muted-foreground">Loading article...</p>
                        </div>
                    </div>
                }
            >
                {clientLoader.useContent(data.path)}
            </Suspense>
        </div>
    )
}
