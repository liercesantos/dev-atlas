'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Project } from '../types';
import { projectsService } from '../services/projects.service';
import { useRouter } from 'next/navigation';

interface ProjectListProps {
  initialProjects: Project[];
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setIsDeleting(id);
    try {
      await projectsService.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                No projects found.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    project.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="p-2 hover:text-primary transition-colors"
                      aria-label={`Edit ${project.title}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={isDeleting === project.id}
                      className="p-2 hover:text-destructive transition-colors disabled:opacity-50"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash2 className={`w-4 h-4 ${isDeleting === project.id ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
