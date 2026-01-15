import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mocking function to simulate getting a post by slug
async function getPostBySlug(slug: string) {
  const posts = [
    {
      title: 'Building a Production-Ready NestJS API',
      slug: 'building-production-ready-nestjs-api',
      content: `
        ## Introduction
        Building a production-ready API requires more than just functional code.

        ### Key Topics
        - Modular Architecture
        - Dependency Injection
        - Global Exception Filters
        - Validation Pipes

        Using NestJS allows us to follow SOLID principles easily.
      `,
      date: '2026-01-10'
    },
    {
      title: 'Next.js 15: The Future of Frontend',
      slug: 'nextjs-15-future-of-frontend',
      content: `
        ## What's New?
        Next.js 15 brings significant improvements to performance and developer experience.

        ### Highlights
        - Enhanced caching strategy
        - Faster builds
        - Improved middleware
      `,
      date: '2026-01-05'
    },
  ];

  return posts.find((p) => p.slug === slug);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-24 px-6">
      <header className="mb-12">
        <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-muted-foreground">{post.date}</time>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* In a real app with MDX, we would render the content here */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  );
}
