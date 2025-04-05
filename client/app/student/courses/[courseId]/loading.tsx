// app/student/courses/[courseId]/loading.tsx
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-9 w-52" />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            {/* Overview Tab Skeleton */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
                <div className="space-y-6">
                  {/* About This Course */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="h-6 w-40" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />

                      <div className="space-y-4 mt-6">
                        <div>
                          <Skeleton className="h-5 w-48 mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div>
                          <Skeleton className="h-5 w-40 mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Meet Instructor */}
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="h-6 w-40" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Course Details & Includes */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Skeleton className="h-5 w-32" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Skeleton className="h-5 w-32" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab Skeleton */}
            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-40" />
                  </CardTitle>
                  <Skeleton className="h-4 w-60" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center border p-4 rounded-lg">
                      <div className="flex gap-3 items-center">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussions Tab Skeleton */}
            <TabsContent value="discussions" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                  <Skeleton className="h-9 w-36" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex justify-between border p-4 rounded-lg">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-64" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  ))}
                </CardContent>
                <div className="border-t bg-muted/50 px-6 py-4">
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
