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