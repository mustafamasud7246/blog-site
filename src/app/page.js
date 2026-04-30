"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Health Journal</h1>
      <p>Your premium fitness toolkit</p>
      <Link href="/blog" style={{ color: 'blue', textDecoration: 'underline' }}>
        Read Articles →
      </Link>
    </div>
  )
}