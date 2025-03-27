import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from 'lucide-react'

export default function TeacherLoading() {
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
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-20 rounded-md" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome section skeleton */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-8 w-[250px] rounded-md" />
                  <Skeleton className="h-4 w-[150px] rounded-md mt-2" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>

            {/* Stats cards skeleton */}
            <div className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-2">
                    <Skeleton className="h-5 w-[120px] rounded-md" />
                    <Skeleton className="h-8 w-[80px] rounded-md" />
                    <Skeleton className="h-4 w-[100px] rounded-md" />
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs skeleton */}
            <div className="space-y-4">
              <div className="flex">
                <Skeleton className="h-10 w-[400px] rounded-md" />
              </div>
              
              {/* Content cards skeleton */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-[150px] rounded-md" />
                        <Skeleton className="h-6 w-[60px] rounded-md" />
                      </div>
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

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
