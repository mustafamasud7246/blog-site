import './globals.css'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import ThemeToggle from '@/app/ThemeToggle'

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
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className={outfit.className}>
        <header className="site-header">
          <div className="container header-content">
            <Link href="/" className="brand">
              <div className="brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <span>HealthKit</span>
            </Link>
            <nav className="main-nav">
              <Link href="/" className="nav-btn nav-home">Home</Link>
              <Link href="/blog" className="nav-btn nav-blog">Articles</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link href="/" className="brand !text-white">
                <div className="brand-icon !bg-white !text-[var(--primary)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <span>HealthKit</span>
              </Link>
              <p className="mt-2 text-gray-400 max-w-xs leading-relaxed text-xs">
                Empowering your health journey with scientific precision and professional medical insights. 
              </p>
            </div>

            {/* Quick Links + Resources side by side */}
            <div className="footer-links-group">
              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link href="/">Calculator Home</Link></li>
                  <li><Link href="/blog">Health Journal</Link></li>
                  <li><Link href="#">BMI Guide</Link></li>
                  <li><Link href="#">Nutrition Tips</Link></li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>Resources</h4>
                <ul>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/disclaimer">Medical Disclaimer</Link></li>
                  <li><Link href="#">Contact Support</Link></li>
                </ul>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="footer-contact">
              <h4>Stay Connected</h4>
              <div className="social-links">
                <a href="#" className="social-btn">FB</a>
                <a href="#" className="social-btn">TW</a>
                <a href="#" className="social-btn">IG</a>
                <a href="#" className="social-btn">YT</a>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Join our newsletter for weekly health tips.
              </p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} HealthKit Premium. Built with passion for better living.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}