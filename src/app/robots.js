export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://healthkits.vercel.app/sitemap.xml',
    host: 'https://healthkits.vercel.app',
  }
}
