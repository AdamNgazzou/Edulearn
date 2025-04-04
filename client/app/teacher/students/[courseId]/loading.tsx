"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Loading Header */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8" />
              <div>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32 mt-1" />
              </div>
            </div>

            {/* Loading Statistics */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  <Skeleton className="h-4 w-24" />
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Skeleton className="h-4 w-16" />
                </Badge>
              </div>
              <div className="relative">
                <Skeleton className="absolute left-2.5 top-2.5 h-4 w-4" />
                <Skeleton className="w-full md:w-[300px] h-8 mt-2" />
              </div>
            </div>

            {/* Loading Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {["Student", "Email", "Status", "Progress", "Actions"].map((header, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(5)].map((_, j) => (
                        <TableCell key={j}>
                          {j === 0 ? (
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  <Skeleton className="h-8 w-8" />
                                </AvatarFallback>
                              </Avatar>
                              <Skeleton className="h-4 w-32" />
                            </div>
                          ) : (
                            <Skeleton className="h-4 w-full" />
                          )}
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
