'use client'

import { useState } from 'react'
import { blogs } from '@/data/blogs'
import Link from 'next/link'

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(blogs.map(b => b.category))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-12">
      <header className="mb-12">
        <h1 className="display-title mb-4">Health Journal</h1>
        <p className="subtitle text-muted">Deep dives into fitness, nutrition, and mental wellbeing.</p>
      </header>

      <div className="filters-wrap mb-12">
        <div className="search-box mb-6">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="blog-card">
              <div className="card-tag">{blog.category}</div>
              <h3 className="card-title-small">{blog.title}</h3>
              <p className="card-excerpt">{blog.excerpt}</p>
              <div className="card-footer">
                <span>{blog.date}</span>
                <span className="read-more">Read More &rarr;</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-12 { margin-bottom: 3rem; }
        .display-title { font-size: 3rem; font-weight: 800; }
        
        .search-input {
          width: 100%;
          padding: 1.25rem 2rem;
          border-radius: 99px;
          border: 2px solid var(--border);
          background: var(--surface);
          font-size: 1.1rem;
          box-shadow: var(--shadow);
          outline: none;
          transition: var(--transition);
        }
        .search-input:focus { border-color: var(--primary); transform: translateY(-2px); }
        
        .category-tabs { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 1rem; scrollbar-width: none; }
        .category-tabs::-webkit-scrollbar { display: none; }
        
        .filter-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 99px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-weight: 600;
          white-space: nowrap;
          transition: var(--transition);
        }
        .filter-btn:hover { background: var(--primary-light); color: var(--primary); }
        .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
        }
        
        .blog-card {
          background: var(--surface);
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          box-shadow: var(--shadow);
        }
        .blog-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        
        .card-tag {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }
        .card-title-small { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.3; }
        .card-excerpt { color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem; flex-grow: 1; }
        
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-muted);
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .read-more { color: var(--primary); font-weight: 700; }
        
        .empty-state { grid-column: 1 / -1; text-align: center; padding: 5rem; color: var(--text-muted); }
      `}</style>
    </div>
  )
}
