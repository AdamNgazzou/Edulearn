import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CourseCreateLoading() {
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
        </div>
      </header>

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
                <Skeleton className="h-8 w-[250px] rounded-md" />
                <Skeleton className="h-4 w-[150px] rounded-md mt-2" />
              </div>
            </div>

            {/* Form skeleton */}
            <div className="grid gap-6 md:grid-cols-[1fr_250px]">
              <div className="space-y-6">
                {/* Tabs skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-md" />

                  {/* Card skeleton */}
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-[150px] rounded-md" />
                        <Skeleton className="h-4 w-[250px] rounded-md" />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-[100px] rounded-md" />
                          <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        <div className="space-y-2">
                          <Skeleton className="h-5 w-[120px] rounded-md" />
                          <Skeleton className="h-24 w-full rounded-md" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-[80px] rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                          </div>
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-[80px] rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                          </div>
                        </div>

                        <Skeleton className="h-40 w-full rounded-md" />
                      </div>
                    </div>

                    <div className="p-6 border-t flex justify-between">
                      <Skeleton className="h-10 w-24 rounded-md" />
                      <Skeleton className="h-10 w-36 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar skeleton */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[180px] rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-3/4 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[150px] rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                  </div>
                </div>
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

