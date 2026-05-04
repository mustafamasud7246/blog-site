// import { blogs } from '@/data/blogs'

// export default function sitemap() {
//   const baseUrl = 'https://healthkits.vercel.app' // Should be updated with real domain

//   const blogEntries = blogs.map((blog) => ({
//     url: `${baseUrl}/blog/${blog.slug}`,
//     lastModified: new Date(),
//     changeFrequency: 'monthly',
//     priority: 0.7,
//   }))

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//       changeFrequency: 'yearly',
//       priority: 1,
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: new Date(),
//       changeFrequency: 'weekly',
//       priority: 0.8,
//     },
//     ...blogEntries,
//   ]
// }

import { blogs } from '@data/blogs'

export default function sitemap() {
  const baseUrl = 'https://healthkits.vercel.app'

  // মূল পেজগুলো
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // ব্লগ পোস্টগুলো
  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.blog}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // সবগুলো একসাথে রিটার্ন করুন
  return [...routes, ...blogEntries]
}