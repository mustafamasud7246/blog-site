"use client";

import { blogs } from '../../../data/blogs'
import Link from 'next/link'

export default function BlogPost({ params }) {
  const { slug } = params
  const blog = blogs.find(b => b.slug === slug)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/blog">← Back to all articles</Link>
      <h1>{blog.title}</h1>
      <p><strong>{blog.date}</strong> | {blog.category}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  )
}