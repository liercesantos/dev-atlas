'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProjectForm } from '@/features/projects/components/project-form';
import { projectsService } from '@/features/projects/services/projects.service';
import { Project, CreateProjectDto, UpdateProjectDto } from '@/features/projects/types';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectsService.getById(id);
        setProject(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (data: CreateProjectDto | UpdateProjectDto) => {
    setIsSaving(true);
    setError(null);
    try {
      await projectsService.update(id, data as UpdateProjectDto);
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground text-lg">Loading project...</div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="p-8">
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md mb-4">
          {error}
        </div>
        <Button variant="outline" onClick={() => router.push('/admin/projects')}>
          Back to projects
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">Modify project details.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {project && (
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isLoading={isSaving}
        />
      )}

      <div className="mt-12">
        <Link href="/admin/projects" className="text-muted-foreground hover:text-primary transition-colors">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
