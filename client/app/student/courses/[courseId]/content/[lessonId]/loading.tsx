import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Course Navigation Header Skeleton */}
        <div className="bg-muted py-4 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <div>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32 mt-1" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content Skeleton */}
        <div className="container px-4 py-8 md:px-6">
          <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>

              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

