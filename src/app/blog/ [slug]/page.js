import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default function BlogPost({ params }) {
  const { slug } = params
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="container" style={{ paddingTop: '6rem', maxWidth: '800px' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, marginBottom: '2rem' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Articles
      </Link>

      <header style={{ marginBottom: '3rem' }}>
        <span className="category-tag" style={{ marginBottom: '1.5rem' }}>{blog.category}</span>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>{blog.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>{blog.date || 'May 1, 2026'}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Article Content */}
      <div 
        className="blog-content" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
        style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.8', 
          color: 'var(--text-main)',
        }}
      />

      <footer style={{ marginTop: '5rem', padding: '3rem', background: 'var(--primary-light)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Enjoyed this article?</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Check out our other expert-backed health guides and calculators.</p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '1rem 2rem', textDecoration: 'none' }}>
          Back to Toolkit
        </Link>
      </footer>
    </article>
  )
}
