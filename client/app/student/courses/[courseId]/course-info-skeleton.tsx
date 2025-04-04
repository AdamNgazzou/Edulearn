import { Skeleton } from "@/components/ui/skeleton"

export default function CourseInfoSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header Skeleton */}
        <div className="relative">
          <Skeleton className="h-[200px] md:h-[300px] w-full" />
          <div className="container relative -mt-20 px-4 md:px-6">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

