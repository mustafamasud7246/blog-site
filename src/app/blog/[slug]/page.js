import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }) {
  const blog = blogs.find(b => b.slug === params.slug)
  if (!blog) return {}

  return {
    title: `${blog.title} | Health Journal`,
    description: blog.excerpt,
  }
}

export default function BlogPost({ params }) {
  const blog = blogs.find(b => b.slug === params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="blog-post-page">
      <div className="blog-hero">
        <div className="container">
          <Link href="/blog" className="back-link mb-8 inline-block">&larr; Back to Journal</Link>
          <div className="post-meta mb-4">
            <span className="category-badge">{blog.category}</span>
            <span className="date-badge">{blog.date}</span>
          </div>
          <h1 className="post-title">{blog.title}</h1>
        </div>
      </div>

      <div className="container py-16">
        <div className="post-layout">
          <div className="post-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          
          <aside className="post-sidebar">
            <div className="sidebar-card">
              <h3>About HealthKit</h3>
              <p>Your premium resource for data-driven wellness. We believe in clarity, accuracy, and sustainable health.</p>
            </div>
            
            <div className="sidebar-card">
              <h3>Featured Tools</h3>
              <ul className="tool-links">
                <li><Link href="/">BMI Calculator</Link></li>
                <li><Link href="/">Calorie Needs</Link></li>
                <li><Link href="/">Ideal Weight</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .blog-hero {
          background: var(--bg-color);
          padding: 6rem 0;
          border-bottom: 1px solid var(--border);
        }
        .post-title {
          font-size: 4rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.1;
          max-width: 900px;
        }
        .post-meta { display: flex; gap: 1rem; align-items: center; }
        .category-badge {
          background: var(--primary);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 99px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .date-badge { color: var(--text-muted); font-weight: 500; }
        .back-link { color: var(--text-muted); text-decoration: none; font-weight: 600; transition: var(--transition); }
        .back-link:hover { color: var(--primary); transform: translateX(-5px); }
        
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .mb-8 { margin-bottom: 2rem; }
        
        .post-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 4rem;
        }
        
        .post-content {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--text-main);
        }
        .post-content :global(p) { margin-bottom: 2rem; }
        .post-content :global(b) { color: var(--primary); }
        
        .post-sidebar { display: flex; flex-direction: column; gap: 2rem; }
        .sidebar-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .sidebar-card h3 { font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-main); }
        .sidebar-card p { font-size: 0.95rem; color: var(--text-muted); }
        
        .tool-links { list-style: none; padding: 0; }
        .tool-links li { margin-bottom: 0.5rem; }
        .tool-links a { color: var(--primary); text-decoration: none; font-weight: 600; }
        
        @media (max-width: 992px) {
          .post-layout { grid-template-columns: 1fr; }
          .post-title { font-size: 2.5rem; }
        }
      `}</style>
    </article>
  )
}
