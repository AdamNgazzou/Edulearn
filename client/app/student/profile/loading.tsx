// loading.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton" // You can create your own Skeleton component if you don't have one

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <Skeleton className="w-40 h-8" />
              </h1>
              <p className="text-muted-foreground">
                <Skeleton className="w-64 h-4 mt-2" />
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <Skeleton className="h-full w-full rounded-full" />
                      </Avatar>
                    </div>
                    <CardTitle className="mt-4">
                      <Skeleton className="w-40 h-6" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="w-24 h-4" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Skeleton className="w-24 h-4" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="w-24 h-6 rounded-full" />
                      <Skeleton className="w-24 h-6 rounded-full" />
                      <Skeleton className="w-24 h-6 rounded-full" />
                      <Skeleton className="w-24 h-6 rounded-full" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <Skeleton className="w-24 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="w-full flex flex-col space-y-6">
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                  <Skeleton className="w-full h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
