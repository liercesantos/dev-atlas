import React from 'react';

export default function HeavyComponent() {
  // Simulate some heavy work or large package usage
  return (
    <div className="p-8 mt-8 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">I am a heavy component</h2>
      <p>I was loaded lazily to improve the initial page load performance.</p>
      <div className="grid grid-cols-5 gap-2 mt-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
