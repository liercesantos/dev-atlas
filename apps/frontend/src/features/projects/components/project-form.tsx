'use client';

import React, { useState } from 'react';
import { CreateProjectDto, Project, UpdateProjectDto } from '../types';
import { Button } from '@/components/ui/button';

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: CreateProjectDto | UpdateProjectDto) => Promise<void>;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    repoUrl: initialData?.repoUrl || '',
    liveUrl: initialData?.liveUrl || '',
    tags: initialData?.tags || [],
    published: initialData?.published || false,
  });

  const [tagInput, setTagInput] = useState(initialData?.tags.join(', ') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    const tags = e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 border rounded-xl shadow-sm">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Project Title"
          className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold">Description</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Short description of the project"
          className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-semibold">Content (Markdown)</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          placeholder="Detailed project content in Markdown..."
          className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-y"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-semibold">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-semibold">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            value={tagInput}
            onChange={handleTagsChange}
            placeholder="nextjs, tailwind, typescript"
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="repoUrl" className="text-sm font-semibold">Repository URL</label>
          <input
            id="repoUrl"
            name="repoUrl"
            value={formData.repoUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="liveUrl" className="text-sm font-semibold">Live URL</label>
          <input
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={formData.published}
          onChange={handleChange}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="published" className="text-sm font-semibold cursor-pointer">Published</label>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
