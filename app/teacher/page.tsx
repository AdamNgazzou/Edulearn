"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users, Clock, Star, FileText, Bell, Plus, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for teacher dashboard
const teacherData = {
  name: "Dr. John Smith",
  avatar: "/placeholder.svg?height=40&width=40",
  department: "Computer Science",
  totalStudents: 178,
  totalCourses: 4,
  averageRating: 4.8,
  upcomingClasses: [
    {
      id: 1,
      title: "Advanced JavaScript Programming",
      type: "lecture",
      day: "Today",
      time: "10:00 AM - 11:30 AM",
      location: "Room 302",
      students: 45,
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      type: "lab",
      day: "Today",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab 5",
      students: 56,
    },
    {
      id: 3,
      title: "Advanced JavaScript Programming",
      type: "lecture",
      day: "Tomorrow",
      time: "10:00 AM - 11:30 AM",
      location: "Room 302",
      students: 45,
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "submission",
      student: "Alex Johnson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Advanced JavaScript Programming",
      item: "Promises and Async/Await Assignment",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "question",
      student: "Maria Garcia",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Full Stack Web Development",
      item: "Question about React Hooks",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "enrollment",
      student: "James Wilson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Advanced JavaScript Programming",
      item: "New enrollment",
      time: "Yesterday",
    },
  ],
  courses: [
    {
      id: "1",
      title: "Advanced JavaScript Programming",
      students: 45,
      lessons: 15,
      status: "active",
      image: "/placeholder.svg?height=100&width=150",
      lastUpdated: "2 days ago",
      progress: 65,
      nextLesson: "Promises and Async/Await",
    },
    {
      id: "2",
      title: "React for Beginners",
      students: 78,
      lessons: 12,
      status: "active",
      image: "/placeholder.svg?height=100&width=150",
      lastUpdated: "1 week ago",
      progress: 42,
      nextLesson: "State Management with Context API",
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      students: 32,
      lessons: 18,
      status: "draft",
      image: "/placeholder.svg?height=100&width=150",
      lastUpdated: "3 days ago",
      progress: 0,
      nextLesson: "Introduction to Node.js",
    },
    {
      id: "4",
      title: "Full Stack Web Development",
      students: 56,
      lessons: 24,
      status: "active",
      image: "/placeholder.svg?height=100&width=150",
      lastUpdated: "5 days ago",
      progress: 80,
      nextLesson: "Deploying Full Stack Applications",
    },
  ],
  pendingAssignments: [
    {
      id: 1,
      title: "Promises and Async/Await",
      course: "Advanced JavaScript Programming",
      submissions: 38,
      totalStudents: 45,
      dueDate: "Yesterday",
    },
    {
      id: 2,
      title: "React Component Lifecycle",
      course: "React for Beginners",
      submissions: 65,
      totalStudents: 78,
      dueDate: "Today",
    },
    {
      id: 3,
      title: "Full Stack Project Proposal",
      course: "Full Stack Web Development",
      submissions: 42,
      totalStudents: 56,
      dueDate: "Tomorrow",
    },
  ],
}

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
                  <AvatarFallback>{teacherData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome, {teacherData.name}</h1>
                  <p className="text-muted-foreground">{teacherData.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/teacher/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/teacher/courses/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Course
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherData.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherData.courses.filter((c) => c.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Out of {teacherData.totalCourses} total courses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold">{teacherData.averageRating}</div>
                    <Star className="ml-1 h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">Based on student feedback</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherData.pendingAssignments.reduce((sum, a) => sum + (a.totalStudents - a.submissions), 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Assignments to grade</p>
                </CardContent>
              </Card>
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
                {/* Upcoming Classes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Today's Classes</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("schedule")}>
                      View Schedule
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {teacherData.upcomingClasses
                      .filter((c) => c.day === "Today")
                      .map((classItem) => (
                        <Card key={classItem.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{classItem.title}</CardTitle>
                              <Badge variant={classItem.type === "lecture" ? "default" : "secondary"}>
                                {classItem.type === "lecture" ? "Lecture" : "Lab"}
                              </Badge>
                            </div>
                            <CardDescription>{classItem.location}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{classItem.time}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{classItem.students} students</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button size="sm" className="w-full">
                              View Class Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Course Progress */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Course Progress</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/teacher/courses">
                        View All Courses
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {teacherData.courses
                      .filter((c) => c.status === "active")
                      .map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="flex">
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
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="mr-1 h-4 w-4" />
                                    <span>{course.students} students</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <FileText className="mr-1 h-4 w-4" />
                                    <span>{course.lessons} lessons</span>
                                  </div>
                                </div>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                  </div>
                                  <Progress value={course.progress} className="h-2" />
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">Next: {course.nextLesson}</p>
                              </div>
                              <Button size="sm" variant="outline" className="mt-2" asChild>
                                <Link href={`/teacher/courses/${course.id}`}>Manage Course</Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Pending Assignments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Pending Assignments</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("assignments")}>
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {teacherData.pendingAssignments.map((assignment) => (
                      <Card key={assignment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge variant={assignment.dueDate === "Yesterday" ? "destructive" : "outline"}>
                              Due: {assignment.dueDate}
                            </Badge>
                          </div>
                          <CardDescription>{assignment.course}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Submissions</span>
                              <span>
                                {assignment.submissions} of {assignment.totalStudents}
                              </span>
                            </div>
                            <Progress
                              value={(assignment.submissions / assignment.totalStudents) * 100}
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full">
                            Review Submissions
                          </Button>
                        </CardFooter>
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
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Schedule content would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignments & Grading</CardTitle>
                    <CardDescription>Manage assignments and review student submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Assignments content would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Student interactions and platform updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {teacherData.recentActivity.map((activity, index) => (
                        <div key={activity.id} className="relative pl-6">
                          {index < teacherData.recentActivity.length - 1 && (
                            <div className="absolute left-2 top-2 h-full w-px bg-muted-foreground/20" />
                          )}
                          <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={activity.studentAvatar} alt={activity.student} />
                                <AvatarFallback>{activity.student.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="font-medium">{activity.student}</h3>
                              <Badge variant="outline" className="ml-auto">
                                {activity.type === "submission"
                                  ? "Submission"
                                  : activity.type === "question"
                                    ? "Question"
                                    : "Enrollment"}
                              </Badge>
                            </div>
                            <p className="text-sm">{activity.item}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{activity.course}</span>
                              <span className="mx-1">•</span>
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

