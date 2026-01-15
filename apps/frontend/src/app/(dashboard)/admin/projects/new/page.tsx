'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProjectForm } from '@/features/projects/components/project-form';
import { projectsService } from '@/features/projects/services/projects.service';
import { CreateProjectDto, UpdateProjectDto } from '@/features/projects/types';
import { useState } from 'react';
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateProjectDto | UpdateProjectDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await projectsService.create(data as CreateProjectDto);
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-muted-foreground">Create a new project for your portfolio.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-12">
        <Link href="/admin/projects" className="text-muted-foreground hover:text-primary transition-colors">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
