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
      <body className={outfit.className}>
        <header className="site-header">
          <div className="container header-content">
            <Link href="/" className="brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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