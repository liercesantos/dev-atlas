import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">🚀 DevAtlas</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Welcome to the future of portfolio engineering.
        </p>
      </div>
    </main>
  );
}
