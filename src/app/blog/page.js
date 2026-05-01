'use client'

import { useState } from 'react'
import { blogs } from '@/data/blogs'
import Link from 'next/link'

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

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
      <header className="mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">Health Journal</h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
          Expert-backed articles on nutrition, fitness, and wellness.
        </p>
      </header>

      <div className="mb-12">
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            className="form-control !rounded-full !px-8"
            placeholder="Search articles..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map(blog => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug} className="blog-card flex flex-col !no-underline group">
            <div className="p-6 md:p-8 flex flex-col h-full text-left">
              <span className="category-tag">{blog.category}</span>
              <h2 className="text-xl md:text-2xl font-bold mb-4 line-clamp-2 text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                {blog.title}
              </h2>
              <p className="text-[var(--text-muted)] mb-8 line-clamp-3 flex-grow">{blog.excerpt}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm font-semibold text-[var(--text-muted)]">{blog.date}</span>
                <span className="read-more group-hover:gap-4 transition-all">Read More →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <div className="text-center py-24 text-[var(--text-muted)]">
          <p className="text-xl">No articles match your search.</p>
        </div>
      )}
    </div>
  )
}