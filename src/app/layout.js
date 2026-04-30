"use client";

import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <header className="site-header">
          <div className="container header-content">
            <div className="brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>HealthKit</span>
            </div>
            <nav className="main-nav">
              <a href="/">Home</a>
              <a href="/blog">Articles</a>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>&copy; 2026 HealthKit Premium. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}