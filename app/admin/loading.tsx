import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, BarChart3, Users, BookMarked, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">EduLearn</span>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-[200px] rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/courses"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <BookMarked className="h-4 w-4" />
              Courses
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-8">
            <div className="flex flex-col space-y-8">
              <div>
                <Skeleton className="h-8 w-[250px] rounded-md" />
                <Skeleton className="h-4 w-[350px] rounded-md mt-2" />
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-[100px] rounded-md" />
                        <Skeleton className="h-4 w-4 rounded-full" />
                      </div>
                      <Skeleton className="h-8 w-[80px] rounded-md" />
                      <Skeleton className="h-4 w-[120px] rounded-md" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Skeleton className="h-6 w-[150px] rounded-md" />
                          <Skeleton className="h-4 w-[200px] rounded-md mt-1" />
                        </div>
                        <Skeleton className="h-9 w-24 rounded-md" />
                      </div>

                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                <Skeleton className="h-5 w-[120px] rounded-md" />
                                <Skeleton className="h-4 w-[150px] rounded-md mt-1" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-6 w-20 rounded-full" />
                              <Skeleton className="h-4 w-24 rounded-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full border-t py-4">
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

