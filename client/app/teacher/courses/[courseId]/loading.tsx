import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CourseManagementLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Page header with back button */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/teacher/courses">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <Skeleton className="h-8 w-[300px] rounded-md" />
                <Skeleton className="h-4 w-[150px] rounded-md mt-2" />
              </div>
            </div>

            {/* Course Header */}
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="relative rounded-lg overflow-hidden border">
                <Skeleton className="h-[200px] w-full rounded-none" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[150px] rounded-md" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-4 w-20 mx-auto rounded-md" />
                        <Skeleton className="h-8 w-12 mx-auto rounded-md" />
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-4 w-20 mx-auto rounded-md" />
                        <Skeleton className="h-8 w-12 mx-auto rounded-md" />
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-4 w-20 mx-auto rounded-md" />
                        <Skeleton className="h-8 w-12 mx-auto rounded-md" />
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <Skeleton className="h-4 w-20 mx-auto rounded-md" />
                        <Skeleton className="h-8 w-12 mx-auto rounded-md" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-md" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-9 w-32 rounded-md" />
                      <Skeleton className="h-9 w-32 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[120px] rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-md" />

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-[200px] rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-5 w-[180px] rounded-md" />
                          <Skeleton className="h-4 w-24 rounded-md" />
                        </div>
                        <Skeleton className="h-4 w-full rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

