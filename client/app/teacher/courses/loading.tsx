import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function CoursesLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <Skeleton className="h-8 w-[200px] rounded-md" />
              <Skeleton className="h-4 w-[300px] rounded-md mt-2" />
            </div>

            <Skeleton className="h-10 w-full md:w-[400px] rounded-md" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-4 w-24 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16 rounded-md" />
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
      </main>
    </div>
  )
}

