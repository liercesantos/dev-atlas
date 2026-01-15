'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPostForm } from '@/features/blog/components/blog-post-form';
import { blogService } from '@/features/blog/services/blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto } from '@/features/blog/types';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateBlogPostDto | UpdateBlogPostDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await blogService.create(data as CreateBlogPostDto);
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Failed to create blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Blog Post</h1>
        <p className="text-muted-foreground">Create a new technical article.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
          {error}
        </div>
      )}

      <BlogPostForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
