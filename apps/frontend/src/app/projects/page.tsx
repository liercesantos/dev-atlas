import React from 'react';
import Link from 'next/link';

// ISR configuration - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

async function getProjects() {
  // In a real app, this would be an API call to the backend
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
  // return res.json();

  // Mocking for demonstration
  return [
    { id: '1', title: 'DevAtlas', description: 'This very platform.' },
    { id: '2', title: 'Portfolio Pro', description: 'An older portfolio project.' },
  ];
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
