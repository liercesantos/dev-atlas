'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPostForm } from '@/features/blog/components/blog-post-form';
import { blogService } from '@/features/blog/services/blog.service';
import { CreateBlogPostDto, UpdateBlogPostDto, BlogPost } from '@/features/blog/types';

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const data = await blogService.getById(id);
        setBlogPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post.');
      } finally {
        setIsFetching(false);
      }
    }
    fetchBlogPost();
  }, [id]);

  const handleSubmit = async (data: CreateBlogPostDto | UpdateBlogPostDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await blogService.update(id, data as UpdateBlogPostDto);
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-4"></div>
          <div className="h-4 w-64 bg-muted rounded mb-8"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!blogPost && !isFetching) {
    return (
      <div className="p-8">
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
          Blog post not found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">Modify your article content.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
          {error}
        </div>
      )}

      <BlogPostForm
        initialData={blogPost!}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
