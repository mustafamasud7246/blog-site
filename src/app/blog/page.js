"use client";

import { useState } from 'react'
import blogs from '../../data/blogs'
import Link from 'next/link'

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(blogs.map(b => b.category))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <h1>Health Journal</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {categories.map(cat => (
        <button key={cat} onClick={() => setActiveCategory(cat)}>
          {cat}
        </button>
      ))}
      {filteredBlogs.map(blog => (
        <div key={blog.slug}>
          <h2>{blog.title}</h2>
          <Link href={`/blog/${blog.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}