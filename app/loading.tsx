import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">EduLearn</span>
          </div>
          <div className="hidden md:flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-20 rounded-md" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Page title skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-[250px] rounded-md" />
              <Skeleton className="h-4 w-[350px] rounded-md" />
            </div>

            {/* Content skeleton - cards grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 rounded-md" />
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduLearn</span>
          </div>
          <Skeleton className="h-4 w-[250px] rounded-md" />
        </div>
      </footer>
    </div>
  )
}
