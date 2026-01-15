import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { projectsService } from '@/features/projects/services/projects.service';
import { ProjectList } from '@/features/projects/components/project-list';
import { getServerAxios } from '@/lib/api/server-api';

export const dynamic = 'force-dynamic';

async function getProjects() {
  try {
    const api = await getServerAxios();
    const { items } = await projectsService.getAll(undefined, api);
    return items;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-muted-foreground">Add, edit, or remove projects from your portfolio.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <ProjectList initialProjects={projects} />

      <div className="mt-12">
        <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
