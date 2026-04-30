import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'Health Journal | Premium Fitness Toolkit',
  description: 'Comprehensive health calculators and expert articles for your fitness journey.',
  keywords: 'BMI, TDEE, Health Toolkit, Fitness, Wellness',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <header className="site-header">
          <div className="container header-content">
            <div className="brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
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

        <style jsx global>{`
          .site-header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary);
          }
          .brand svg {
            width: 32px;
            height: 32px;
          }
          .main-nav {
            display: flex;
            gap: 2rem;
          }
          .main-nav a {
            text-decoration: none;
            color: var(--text-muted);
            font-weight: 500;
            transition: var(--transition);
          }
          .main-nav a:hover {
            color: var(--primary);
          }
          .site-footer {
            margin-top: auto;
            padding: 3rem 0;
            text-align: center;
            border-top: 1px solid var(--border);
            color: var(--text-muted);
          }
        `}</style>
      </body>
    </html>
  )
}
