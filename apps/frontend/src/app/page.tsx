import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LazyHeavyComponent } from "@/components/ui/lazy-heavy-component";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
        <div>
          <h1 className="text-4xl font-bold">🚀 DevAtlas</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Welcome to the future of portfolio engineering.
          </p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="text-primary hover:underline font-semibold"
            >
              Explore Projects (ISR) →
            </Link>
          </div>
        </div>
        <div className="relative w-32 h-32 lg:w-48 lg:h-48 mt-8 lg:mt-0">
          {/* Using a placeholder for demonstration of next/image optimization */}
          <Image
            src="https://via.placeholder.com/200"
            alt="DevAtlas Hero"
            fill
            className="rounded-full object-cover border-4 border-primary/20"
            priority
          />
        </div>
      </div>

      <LazyHeavyComponent />
    </main>
  );
}
