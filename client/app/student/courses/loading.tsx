"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { usePathname } from "next/navigation"

type SkeletonCardProps = {
  count?: number
}

export default function Loading() {
  const pathname = usePathname()
  const hideHeader = pathname.includes('/content/')

  if (!hideHeader) return null

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-64 mt-2" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={6} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SkeletonCard({ count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4 border rounded-lg p-4 shadow-sm">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-5/6" />
        </div>
      ))}
    </>
  )
}
