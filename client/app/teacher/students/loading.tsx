"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
              <p className="text-muted-foreground">Loading student data...</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      <Skeleton className="h-4 w-24" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Student", "Status", "Enrolled Courses", "Avg. Progress", "Last Active", "Actions"].map(
                      (header, i) => (
                        <TableHead key={i}>
                          <Skeleton className="h-4 w-24" />
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(6)].map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
