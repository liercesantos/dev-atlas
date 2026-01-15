import React from 'react';
import Link from 'next/link';
import {getServerAxios} from "@/lib/api/server-api";
import {blogService} from "@/features/blog/services/blog.service";

// ISR configuration
export const revalidate = 3600;

async function getBlogPosts() {
  try {
    const api = await getServerAxios();
    const { items } = await blogService.getAll(undefined, api);
    return items;
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
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
              <time className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</time>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">{post.content}</p>
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
