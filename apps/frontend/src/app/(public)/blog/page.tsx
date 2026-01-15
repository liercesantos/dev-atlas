import React from 'react';
import Link from 'next/link';

// ISR configuration
export const revalidate = 3600;

async function getBlogPosts() {
  // Mocking for demonstration
  return [
    {
      id: '1',
      title: 'Building a Production-Ready NestJS API',
      slug: 'building-production-ready-nestjs-api',
      excerpt: 'Learn the best practices for building scalable APIs with NestJS.',
      date: '2026-01-10'
    },
    {
      id: '2',
      title: 'Next.js 15: The Future of Frontend',
      slug: 'nextjs-15-future-of-frontend',
      excerpt: 'Exploring the new features and improvements in Next.js 15.',
      date: '2026-01-05'
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="mb-12 text-muted-foreground text-lg">
        Sharing insights about software engineering, architecture, and modern web development.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.id} className="p-8 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <time className="text-sm text-muted-foreground">{post.date}</time>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
