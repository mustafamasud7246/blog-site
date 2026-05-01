'use client'

import { useState } from 'react'
import { blogs } from '@/data/blogs'
import Link from 'next/link'

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Fallback for empty data
  const articles = blogs || []
  
  const categories = ['All', ...new Set(articles.map(b => b.category))]

  const filteredBlogs = articles.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-16">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-4">Health Journal</h1>
        <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          Expert-backed articles on nutrition, fitness, and wellness.
        </p>
      </header>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            className="form-control !rounded-full !px-8"
            placeholder="Search for topics, keywords, articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`unit-btn !rounded-full !px-6 !py-2.5 max-w-fit ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-8 font-semibold text-[var(--text-muted)]">
        Showing {filteredBlogs.length} articles
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map(blog => (
          <div key={blog.slug} className="blog-card flex flex-col">
            <div className="p-8 flex flex-col h-full">
              <span className="category-tag">{blog.category}</span>
              <h2 className="text-2xl font-bold mb-4 line-clamp-2">{blog.title}</h2>
              <p className="text-[var(--text-muted)] mb-8 line-clamp-3 flex-grow">{blog.excerpt}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-semibold text-[var(--text-muted)]">{blog.date}</span>
                <Link href={`/blog/${blog.slug}`} className="read-more group">
                  Read More 
                  <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <div className="text-center py-24 text-[var(--text-muted)] bg-[var(--surface)] rounded-[var(--radius)] border-2 border-dashed border-[var(--border)]">
          <p className="text-xl font-medium">No articles match your search criteria.</p>
        </div>
      )}
    </div>
  )
}