"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, BookMarked, BarChart3, Settings, Calendar, TrendingUp, TrendingDown, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <Link href="/" className="text-xl font-bold">
              EduLearn
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex flex-col gap-2 p-4">
            <Link 
              href="/admin" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
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
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                  <p className="text-muted-foreground">Track platform performance and user engagement</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Custom Range
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4 md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6 space-y-8">
                  {/* Key Metrics */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">New Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">12.5%</span>
                          <span className="ml-1">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Course Enrollments</CardTitle>
                        <BookMarked className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">8.3%</span>
                          <span className="ml-1">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68.2%</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">3.1%</span>
                          <span className="ml-1">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$12,450</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                          <span className="text-red-500">2.4%</span>
                          <span className="ml-1">from previous period</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Charts */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>New user registrations over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="flex h-full items-center justify-center rounded-md border-2 border-dashed">
                          <div className="text-center">
                            <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                            <p className="mt-2 text-sm font-medium">User Growth Chart</p>
                            <p className="text-xs text-muted-foreground">
                              (Chart visualization would be implemented here)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Enrollments</CardTitle>
                        <CardDescription>Course enrollments by category</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="flex h-full items-center justify-center rounded-md border-2 border-dashed">
                          <div className="text-center">
                            <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                            <p className="mt-2 text-sm font-medium">Course Enrollments Chart</p>
                            <p className="text-xs text-muted-foreground">
                              (Chart visualization would be implemented here)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Activity</CardTitle>
                      <CardDescription>Daily active users and engagement metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="h-96">
                      <div className="flex h-full items-center justify-center rounded-md border-2 border-dashed">
                        <div className="text-center">
                          <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground" />
                          <p className="mt-2 text-sm font-medium">Platform Activity Chart</p>
                          <p className="text-xs text-muted-foreground">
                            (Chart visualization would be implemented here)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Analytics</CardTitle>
                      <CardDescription>Detailed user metrics and demographics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">User analytics content would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Analytics</CardTitle>
                      <CardDescription>Course performance and engagement metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Course analytics content would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="revenue" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Analytics</CardTitle>
                      <CardDescription>Financial metrics and revenue streams</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Revenue analytics content would be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 EduLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
