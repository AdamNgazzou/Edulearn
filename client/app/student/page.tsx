"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, Clock, Bell, BarChart3, CheckCircle, FileText, BookMarked, GraduationCap, Users, User, ChevronRight, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock student data
const studentData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  program: "Bachelor of Science in Computer Science",
  enrollmentDate: "September 2022",
  overallProgress: 68,
  totalCourses: 5,
  completedCourses: 2,
  activeCourses: 3,
  upcomingAssignments: [
    {
      id: 1,
      title: "CSS Layout Project",
      course: "Introduction to Web Development",
      dueDate: "Oct 22, 2024",
      priority: "high"
    },
    {
      id: 2,
      title: "Advanced DOM Manipulation",
      course: "Advanced JavaScript Concepts",
      dueDate: "Oct 25, 2024",
      priority: "medium"
    },
    {
      id: 3,
      title: "Basic App Layout",
      course: "Mobile App Development with React Native",
      dueDate: "Oct 20, 2024",
      priority: "high"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "assignment_submitted",
      title: "Promises and Async/Await",
      course: "Advanced JavaScript Concepts",
      date: "Oct 15, 2024",
      time: "3:45 PM"
    },
    {
      id: 2,
      type: "course_progress",
      title: "Completed Lesson 9: CSS Flexbox",
      course: "Introduction to Web Development",
      date: "Oct 14, 2024",
      time: "2:30 PM"
    },
    {
      id: 3,
      type: "grade_received",
      title: "HTML Basics Quiz",
      course: "Introduction to Web Development",
      grade: "A",
      date: "Oct 13, 2024",
      time: "10:15 AM"
    }
  ],
  schedule: [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      type: "lecture",
      day: "Monday",
      time: "10:00 AM - 11:30 AM",
      instructor: "Prof. Sarah Johnson",
      location: "Room 302"
    },
    {
      id: 2,
      title: "Introduction to Web Development",
      type: "lab",
      day: "Tuesday",
      time: "2:00 PM - 4:00 PM",
      instructor: "Dr. John Smith",
      location: "Computer Lab 5"
    },
    {
      id: 3,
      title: "Mobile App Development",
      type: "lecture",
      day: "Thursday",
      time: "3:30 PM - 5:00 PM",
      instructor: "David Wilson",
      location: "Room 405"
    }
  ],
  enrolledCourses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. John Smith",
      progress: 75,
      image: "/placeholder.svg?height=100&width=150"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Prof. Sarah Johnson",
      progress: 45,
      image: "/placeholder.svg?height=100&width=150"
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      instructor: "David Wilson",
      progress: 30,
      image: "/placeholder.svg?height=100&width=150"
    }
  ],
  recommendedCourses: [
    {
      id: 7,
      title: "Advanced CSS and Sass",
      instructor: "Emma Davis",
      level: "Intermediate",
      image: "/placeholder.svg?height=100&width=150"
    },
    {
      id: 8,
      title: "TypeScript Fundamentals",
      instructor: "Robert Brown",
      level: "Intermediate",
      image: "/placeholder.svg?height=100&width=150"
    }
  ]
}

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  
  // Filter today's classes
  const todayClasses = studentData.schedule.filter(
    item => item.day === today
  )

  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {studentData.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Here's an overview of your learning journey</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/student/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/courses">
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Courses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.overallProgress}%</div>
                      <Progress value={studentData.overallProgress} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.totalCourses}</div>
                      <p className="text-xs text-muted-foreground">
                        {studentData.completedCourses} completed, {studentData.activeCourses} in progress
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.upcomingAssignments.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Next due: {studentData.upcomingAssignments[0].dueDate}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{todayClasses.length}</div>
                      <p className="text-xs text-muted-foreground">
                        {todayClasses.length > 0 
                          ? `Next: ${todayClasses[0].time}` 
                          : "No classes today"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Enrolled Courses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">My Courses</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/courses">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studentData.enrolledCourses.map(course => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="relative h-32 w-full">
                          <Image 
                            src={course.image || "/placeholder.svg"} 
                            alt={course.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription>{course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/student/classes`}>
                              Continue Learning
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Upcoming Assignments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Upcoming Assignments</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("assignments")}>
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {studentData.upcomingAssignments.map(assignment => (
                      <Card key={assignment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge variant={assignment.priority === "high" ? "destructive" : "outline"}>
                              {assignment.priority === "high" ? "Due Soon" : "Upcoming"}
                            </Badge>
                          </div>
                          <CardDescription>{assignment.course}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full">View Assignment</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recommended Courses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recommended for You</h2>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {studentData.recommendedCourses.map(course => (
                      <Card key={course.id} className="flex overflow-hidden">
                        <div className="relative h-auto w-1/3">
                          <Image 
                            src={course.image || "/placeholder.svg"} 
                            alt={course.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex flex-col justify-between w-2/3 p-4">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            <Badge variant="outline" className="mt-2">{course.level}</Badge>
                          </div>
                          <Button size="sm" variant="outline" className="mt-2">View Details</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Schedule Tab */}
              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Your upcoming classes and sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => {
                        const dayClasses = studentData.schedule.filter(item => item.day === day)
                        return (
                          <div key={day} className="space-y-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">{day}</h3>
                              {day === today && (
                                <Badge className="ml-2" variant="secondary">Today</Badge>
                              )}
                            </div>
                            {dayClasses.length > 0 ? (
                              <div className="space-y-3">
                                {dayClasses.map(item => (
                                  <div key={item.id} className="flex items-start rounded-lg border p-3">
                                    <div className="mr-4 rounded-md bg-primary/10 p-2 text-primary">
                                      {item.type === "lecture" ? (
                                        <BookOpen className="h-5 w-5" />
                                      ) : (
                                        <FileText className="h-5 w-5" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{item.title}</h4>
                                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Clock className="mr-1 h-4 w-4" />
                                          <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Users className="mr-1 h-4 w-4" />
                                          <span>{item.instructor}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <MapPin className="mr-1 h-4 w-4" />
                                          <span>{item.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge variant={item.type === "lecture" ? "default" : "secondary"}>
                                      {item.type === "lecture" ? "Lecture" : "Lab"}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="rounded-lg border p-4 text-center text-muted-foreground">
                                No classes scheduled
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Assignments Tab */}
              <TabsContent value="assignments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignments & Deadlines</CardTitle>
                    <CardDescription>Track your upcoming and past assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="upcoming">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="submitted">Submitted</TabsTrigger>
                        <TabsTrigger value="graded">Graded</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upcoming" className="mt-4 space-y-4">
                        {studentData.upcomingAssignments.map(assignment => (
                          <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-start gap-4">
                              <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{assignment.title}</h3>
                                <p className="text-sm text-muted-foreground">{assignment.course}</p>
                                <div className="mt-1 flex items-center text-sm">
                                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                  <span>Due: {assignment.dueDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={assignment.priority === "high" ? "destructive" : "outline"}>
                                {assignment.priority === "high" ? "High Priority" : "Medium Priority"}
                              </Badge>
                              <Button size="sm">Start</Button>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="submitted" className="mt-4">
                        <div className="rounded-lg border p-8 text-center">
                          <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-2 font-medium">No submitted assignments</h3>
                          <p className="text-sm text-muted-foreground">
                            Assignments you've submitted will appear here
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="graded" className="mt-4">
                        <div className="rounded-lg border p-8 text-center">
                          <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-2 font-medium">No graded assignments</h3>
                          <p className="text-sm text-muted-foreground">
                            Graded assignments will appear here
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your learning activity and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {studentData.recentActivity.map((activity, index) => (
                        <div key={activity.id} className="relative pl-6">
                          {index < studentData.recentActivity.length - 1 && (
                            <div className="absolute left-2 top-2 h-full w-px bg-muted-foreground/20" />
                          )}
                          <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{activity.title}</h3>
                              {activity.type === "grade_received" && (
                                <Badge variant="outline">Grade: {activity.grade}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{activity.course}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{activity.date}</span>
                              <span className="mx-1">•</span>
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
