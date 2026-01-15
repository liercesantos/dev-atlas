import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  ToggleLeft
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Projects', value: '12', icon: Briefcase },
    { label: 'Blog Posts', value: '24', icon: FileText },
    { label: 'Monthly Visitors', value: '1.2k', icon: BarChart3 },
  ];

  const menuItems = [
    { label: 'Projects', href: '/admin/projects', icon: Briefcase },
    { label: 'Blog', href: '/admin/blog', icon: FileText },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Feature Toggles', href: '/admin/toggles', icon: ToggleLeft },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            DevAtlas Admin
          </h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/admin/projects/new"
              className="p-6 border rounded-xl bg-card hover:border-primary transition-colors flex flex-col"
            >
              <span className="font-semibold text-lg">Create New Project</span>
              <span className="text-sm text-muted-foreground">Add a new engineering showcase to your portfolio.</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="p-6 border rounded-xl bg-card hover:border-primary transition-colors flex flex-col"
            >
              <span className="font-semibold text-lg">Write Blog Post</span>
              <span className="text-sm text-muted-foreground">Share your thoughts with the community.</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
