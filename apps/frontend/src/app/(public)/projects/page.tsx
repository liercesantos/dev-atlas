import React from 'react';
import Link from 'next/link';
import {getServerAxios} from "@/lib/api/server-api";
import {projectsService} from "@/features/projects/services/projects.service";

// ISR configuration - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-24">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <p className="mb-4 text-muted-foreground">
        This page is statically generated and uses Incremental Static Regeneration (ISR).
        It will be revalidated every hour.
      </p>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
