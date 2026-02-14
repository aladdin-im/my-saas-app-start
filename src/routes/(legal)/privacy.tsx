import { legal } from '@/lib/source';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import browserCollections from 'fumadocs-mdx:collections/browser';
import { default as defaultMdxComponents } from 'fumadocs-ui/mdx';
import { Suspense } from 'react';

export const Route = createFileRoute('/(legal)/privacy')({
  component: PrivacyPage,
  loader: async () => {
    const data = await serverLoader()
    await clientLoader.preload(data.path)
    return data
  },
})

const serverLoader = createServerFn({
  method: 'GET',
}).handler(async () => {
  const page = legal.getPage(['privacy'])
  if (!page) throw notFound()

  return {
    path: page.path,
    title: page.data.title,
    description: page.data.description || '',
    date: page.data.date,
  }
})

const clientLoader = browserCollections.legalPages.createClientLoader({
  component({ frontmatter, default: MDX }) {
    return (
      <div>
        {/* 页面标题 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-fd-muted-foreground">
            Last updated: {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* 文章正文内容 */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDX components={defaultMdxComponents} />
        </article>
      </div>
    )
  },
})

function PrivacyPage() {
  const data = useFumadocsLoader(Route.useLoaderData())

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading content...</p>
            </div>
          </div>
        }
      >
        {clientLoader.useContent(data.path)}
      </Suspense>
    </div>
  )
}

