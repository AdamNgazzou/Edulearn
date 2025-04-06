'use client'
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from "lucide-react"
import { usePathname } from "next/navigation"

export default function StudentLoading() {
  const pathname = usePathname()
    // Only show loading if exactly on /student/courses
    if (pathname !== '/student') {
      return null
    }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}


      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome section skeleton */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Skeleton className="h-8 w-[300px] rounded-md" />
                <Skeleton className="h-4 w-[200px] rounded-md mt-2" />
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

              {/* Course cards skeleton */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <Skeleton className="h-32 w-full rounded-none" />
                    <div className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4 rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-20 rounded-md" />
                          <Skeleton className="h-4 w-12 rounded-md" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-md" />
                      </div>
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

