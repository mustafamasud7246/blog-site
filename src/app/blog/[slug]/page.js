import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const articles = blogs || []
  return articles.map((blog) => ({
    slug: blog.slug,
  }))
}

export default function BlogPost({ params }) {
  const { slug } = params
  const articles = blogs || []
  const blog = articles.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="container py-24 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--primary)] font-bold mb-12 hover:gap-3 transition-all">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Articles
      </Link>

      <header className="mb-12">
        <span className="category-tag mb-6">{blog.category}</span>
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">{blog.title}</h1>
        <div className="flex items-center gap-4 text-[var(--text-muted)] font-bold">
          <span>{blog.date}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Article Content */}
      <div 
        className="blog-content prose prose-stone lg:prose-xl max-w-none text-lg leading-relaxed text-[var(--text-main)]" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
        style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.8', 
        }}
      />

      <footer className="mt-20 p-12 bg-[var(--primary-light)] rounded-[var(--radius)] text-center border border-[var(--primary)] border-opacity-10">
        <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
        <p className="mb-8 text-[var(--text-muted)] font-medium">Check out our other expert-backed health guides and calculators.</p>
        <Link href="/" className="btn-primary inline-block !w-auto px-12">
          Back to Toolkit
        </Link>
      </footer>
    </article>
  )
}