"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, BookMarked, BarChart3, Settings, Bell, Search, Download, TrendingUp, TrendingDown, DollarSign, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for admin dashboard
const dashboardData = {
  totalUsers: 2450,
  userGrowth: 12.5,
  totalCourses: 156,
  courseGrowth: 8.2,
  totalRevenue: 45680,
  revenueGrowth: -2.4,
  activeStudents: 1850,
  studentGrowth: 15.3,
  recentUsers: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      role: "student",
      joinDate: "2024-10-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      role: "student",
      joinDate: "2024-10-02",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      role: "teacher",
      joinDate: "2024-09-28",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.d@example.com",
      role: "student",
      joinDate: "2024-09-30",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Prof. Sarah Johnson",
      email: "sarah.j@example.com",
      role: "teacher",
      joinDate: "2024-09-25",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  popularCourses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. John Smith",
      students: 245,
      rating: 4.8,
    },
    {
      id: 2,
      title: "React for Beginners",
      instructor: "Prof. Sarah Johnson",
      students: 189,
      rating: 4.7,
    },
    {
      id: 3,
      title: "Advanced JavaScript Concepts",
      instructor: "Prof. Sarah Johnson",
      students: 156,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Emily Chen",
      students: 132,
      rating: 4.6,
    },
  ],
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
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
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Overview of your learning platform</p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalUsers.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {dashboardData.userGrowth > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={dashboardData.userGrowth > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(dashboardData.userGrowth)}%
                      </span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    <BookMarked className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalCourses.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {dashboardData.courseGrowth > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={dashboardData.courseGrowth > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(dashboardData.courseGrowth)}%
                      </span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${dashboardData.totalRevenue.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {dashboardData.revenueGrowth > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={dashboardData.revenueGrowth > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(dashboardData.revenueGrowth)}%
                      </span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                    <UserPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.activeStudents.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {dashboardData.studentGrowth > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={dashboardData.studentGrowth > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(dashboardData.studentGrowth)}%
                      </span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Users</CardTitle>
                      <CardDescription>Latest users who joined the platform</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/users">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={user.role === "teacher" ? "outline" : "secondary"}>
                              {user.role === "teacher" ? "Teacher" : "Student"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(user.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Popular Courses</CardTitle>
                      <CardDescription>Top performing courses on the platform</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin/courses">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.popularCourses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">By {course.instructor}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{course.students}</span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="mr-1 h-3 w-3 fill-current text-yellow-500"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                              <span className="text-xs">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 EduLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
