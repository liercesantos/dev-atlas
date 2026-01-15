import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { blogService } from '@/features/blog/services/blog.service';
import { BlogPostList } from '@/features/blog/components/blog-post-list';
import { getServerAxios } from '@/lib/api/server-api';

export const dynamic = 'force-dynamic';

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

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <p className="text-muted-foreground">Write and edit your technical articles.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <BlogPostList initialPosts={posts} />
    </div>
  );
}
