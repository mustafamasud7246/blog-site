import './globals.css'
import { Outfit } from 'next/font/google'
import Link from 'next/link'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'HealthKit Premium | Scientific Health Toolkit',
  description: 'Expert-backed health calculators and medical insights for nutrition, fitness, and wellness.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="jgGVBuzEkDtp64AExkO_qEKD9XL3vgFLH9q1dt2aOJc" />
      </head>
      <body className={outfit.className}>
        <header className="site-header">
          <div className="container header-content">
            <Link href="/" className="brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              <span>HealthKit</span>
            </Link>
            <nav className="main-nav">
              <Link href="/">Home</Link>
              <Link href="/blog">Articles</Link>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} HealthKit Premium. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}