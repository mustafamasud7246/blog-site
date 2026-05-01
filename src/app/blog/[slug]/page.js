import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = blogs || []
  return articles.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = params
  const blog = blogs.find((b) => b.slug === slug)
  
  if (!blog) return { title: 'Article Not Found' }

  return {
    title: `${blog.title} | HealthKit Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
    },
  }
}

export default function BlogPost({ params }) {
  const { slug } = params
  const articles = blogs || []
  const blog = articles.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="container py-12 md:py-24 max-w-3xl px-4 md:px-0">
      <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold mb-8 md:mb-12 hover:gap-3 transition-all">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Articles
      </Link>

      <header className="mb-8 md:mb-12">
        <span className="category-tag mb-4 md:mb-6">{blog.category}</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[var(--text-muted)] font-bold text-sm md:text-base">
          <span>{blog.date}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Article Content */}
      <div 
        className="blog-content prose prose-stone lg:prose-xl max-w-none text-base md:text-lg leading-relaxed text-[var(--text-main)]" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />

      <footer className="mt-12 md:mt-20 p-6 md:p-12 bg-[var(--primary-light)] rounded-[var(--radius)] text-center border border-[var(--primary)] border-opacity-10">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Enjoyed this article?</h3>
        <p className="mb-6 md:mb-8 text-[var(--text-muted)] font-medium text-sm md:text-base">Check out our other expert-backed health guides and calculators.</p>
        <Link href="/" className="btn-primary inline-block !w-full md:!w-auto px-12">
          Back to Toolkit
        </Link>
      </footer>
    </article>
  )
}