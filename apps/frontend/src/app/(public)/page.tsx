import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LazyHeavyComponent } from "@/components/ui/lazy-heavy-component";
import { Feature } from "@/features/feature-flags/components/feature";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-24 px-6 flex flex-col items-center justify-center bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
          <div>
            <h1 className="text-4xl font-bold">🚀 DevAtlas</h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-lg">
              The ultimate production-grade portfolio engineering showcase.
              Built with Next.js, NestJS, and love.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/projects"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                View Projects
              </Link>
              <Feature name="ENABLE_BLOG">
                <Link
                  href="/blog"
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                  Read Blog
                </Link>
              </Feature>
            </div>
          </div>
          <div className="relative w-32 h-32 lg:w-48 lg:h-48 mt-8 lg:mt-0">
            <Image
              src="https://via.placeholder.com/200"
              alt="DevAtlas Hero"
              fill
              className="rounded-full object-cover border-4 border-primary/20"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About DevAtlas</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                DevAtlas is more than just a portfolio; it&apos;s a comprehensive
                engineering showcase designed to demonstrate best practices in
                modern full-stack development.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                From a modular NestJS backend to a performance-optimized Next.js
                frontend, every line of code is written with scalability,
                maintainability, and performance in mind.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Core Philosophy</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Clean Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Type Safety Everywhere
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Automated Quality Assurance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Exceptional User Experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Overview */}
      <section id="tech-stack" className="w-full py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Next.js", category: "Frontend" },
              { name: "NestJS", category: "Backend" },
              { name: "TypeScript", category: "Language" },
              { name: "PostgreSQL", category: "Database" },
              { name: "TailwindCSS", category: "Styling" },
              { name: "Prisma", category: "ORM" },
              { name: "GraphQL", category: "API" },
              { name: "Jest", category: "Testing" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-6 border rounded-lg hover:border-primary transition-colors"
              >
                <span className="font-bold text-lg">{tech.name}</span>
                <span className="text-xs text-muted-foreground uppercase mt-1">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 border-t mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 DevAtlas. Built with Next.js 15.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-primary">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="hidden">
        <LazyHeavyComponent />
      </div>
    </main>
  );
}
