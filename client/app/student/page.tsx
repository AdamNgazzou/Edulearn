"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Calendar,
  Clock,
  BarChart3,
  CheckCircle,
  FileText,
  BookMarked,
  GraduationCap,
  User,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
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
      priority: "high",
    },
    {
      id: 2,
      title: "Advanced DOM Manipulation",
      course: "Advanced JavaScript Concepts",
      dueDate: "Oct 25, 2024",
      priority: "medium",
    },
    {
      id: 3,
      title: "Basic App Layout",
      course: "Mobile App Development with React Native",
      dueDate: "Oct 20, 2024",
      priority: "high",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "assignment_submitted",
      title: "Promises and Async/Await",
      course: "Advanced JavaScript Concepts",
      date: "Oct 15, 2024",
      time: "3:45 PM",
    },
    {
      id: 2,
      type: "course_progress",
      title: "Completed Lesson 9: CSS Flexbox",
      course: "Introduction to Web Development",
      date: "Oct 14, 2024",
      time: "2:30 PM",
    },
    {
      id: 3,
      type: "grade_received",
      title: "HTML Basics Quiz",
      course: "Introduction to Web Development",
      grade: "A",
      date: "Oct 13, 2024",
      time: "10:15 AM",
    },
  ],
  enrolledCourses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Dr. John Smith",
      progress: 75,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      instructor: "Prof. Sarah Johnson",
      progress: 45,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      instructor: "David Wilson",
      progress: 30,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  grades: {
    currentSemester: {
      gpa: 3.7,
      courses: [
        { name: "Introduction to Web Development", grade: "A", credits: 3 },
        { name: "Advanced JavaScript Concepts", grade: "B+", credits: 4 },
        { name: "Mobile App Development", grade: "A-", credits: 3 },
      ],
    },
    previousSemesters: [
      {
        name: "Spring 2024",
        gpa: 3.5,
        courses: [
          { name: "Computer Science Fundamentals", grade: "A-", credits: 4 },
          { name: "Database Systems", grade: "B+", credits: 3 },
          { name: "Data Structures", grade: "B", credits: 4 },
        ],
      },
      {
        name: "Fall 2023",
        gpa: 3.8,
        courses: [
          { name: "Introduction to Programming", grade: "A", credits: 4 },
          { name: "Discrete Mathematics", grade: "A-", credits: 3 },
          { name: "Computer Architecture", grade: "B+", credits: 3 },
        ],
      },
    ],
  },
}

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Get today's day name
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  // Calculate days remaining for each assignment
  const assignmentsWithDaysRemaining = studentData.upcomingAssignments
    .map((assignment) => {
      const dueDate = new Date(assignment.dueDate)
      const today = new Date()
      const diffTime = dueDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return {
        ...assignment,
        daysRemaining: diffDays,
      }
    })
    .sort((a, b) => a.daysRemaining - b.daysRemaining)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
                  <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome back, {studentData.name.split(" ")[0]}!</h1>
                  <p className="text-muted-foreground">{studentData.program}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/student/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/student/courses">
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Courses
                  </Link>
                </Button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card className=" shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />
                        Overall Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.overallProgress}%</div>
                      <Progress value={studentData.overallProgress} className="h-2 mt-2" />
                    </CardContent>
                  </Card>
                  <Card className=" shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                        Total Courses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.totalCourses}</div>
                      <p className="text-xs text-muted-foreground">
                        {studentData.completedCourses} completed, {studentData.activeCourses} in progress
                      </p>
                    </CardContent>
                  </Card>
                  <Card className=" shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-amber-500" />
                        Upcoming Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.upcomingAssignments.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Next due: {assignmentsWithDaysRemaining[0].dueDate}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className=" shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4 text-purple-500" />
                        Current GPA
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{studentData.grades.currentSemester.gpa}</div>
                      <p className="text-xs text-muted-foreground">Current semester</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Enrolled Courses */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">My Courses</h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/student/courses">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studentData.enrolledCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
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
                            <Link href={`/student/course/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Upcoming Assignments - Improved UI */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                      Upcoming Assignments
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("assignments")}>
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {assignmentsWithDaysRemaining.map((assignment) => (
                      <Card
                        key={assignment.id}
                        className={` shadow-sm hover:shadow-md transition-shadow overflow-hidden border-t-4 ${
                          assignment.priority === "high" ? "border-t-red-500" : "border-t-amber-400"
                        }`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge variant={assignment.priority === "high" ? "destructive" : "outline"}>
                              {assignment.daysRemaining <= 2 ? "Due Soon!" : `${assignment.daysRemaining} days left`}
                            </Badge>
                          </div>
                          <CardDescription>{assignment.course}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          <div className="mt-2">
                            <Progress
                              value={Math.max(0, 100 - assignment.daysRemaining * 10)}
                              className="h-1.5"
                              indicatorclassname={assignment.priority === "high" ? "bg-red-500" : ""}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full">
                            Start Assignment
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("activity")}>
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <Card className=" shadow-sm">
                    <CardContent className="p-6">
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
                </div>
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
                        {assignmentsWithDaysRemaining.map((assignment) => (
                          <div
                            key={assignment.id}
                            className={`flex items-center justify-between rounded-lg border p-4 ${
                              assignment.priority === "high" ? "border-l-4 border-l-red-500" : ""
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`rounded-md p-2 ${
                                  assignment.priority === "high"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-amber-100 text-amber-600"
                                }`}
                              >
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{assignment.title}</h3>
                                <p className="text-sm text-muted-foreground">{assignment.course}</p>
                                <div className="mt-1 flex items-center gap-3">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>Due: {assignment.dueDate}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                    <span>{assignment.daysRemaining} days remaining</span>
                                  </div>
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
                          <p className="text-sm text-muted-foreground">Assignments you've submitted will appear here</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="graded" className="mt-4">
                        <div className="rounded-lg border p-8 text-center">
                          <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-2 font-medium">No graded assignments</h3>
                          <p className="text-sm text-muted-foreground">Graded assignments will appear here</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Academic Performance Card */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Academic Performance</CardTitle>
                      <CardDescription>Your grades and GPA over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md mb-6">
                        <div className="text-center">
                          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">GPA trend chart would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Current Semester</h3>
                          <div className="rounded-md border overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left p-3 font-medium">Course</th>
                                  <th className="text-center p-3 font-medium">Credits</th>
                                  <th className="text-center p-3 font-medium">Grade</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {studentData.grades.currentSemester.courses.map((course, i) => (
                                  <tr key={i} className="hover:bg-muted/20">
                                    <td className="p-3">{course.name}</td>
                                    <td className="p-3 text-center">{course.credits}</td>
                                    <td className="p-3 text-center">
                                      <Badge variant="outline" className="font-medium">
                                        {course.grade}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                                <tr className="bg-muted/10 font-medium">
                                  <td className="p-3">Semester GPA</td>
                                  <td className="p-3 text-center">
                                    {studentData.grades.currentSemester.courses.reduce(
                                      (sum, course) => sum + course.credits,
                                      0,
                                    )}
                                  </td>
                                  <td className="p-3 text-center">{studentData.grades.currentSemester.gpa}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Previous Semesters</h3>
                          <div className="space-y-4">
                            {studentData.grades.previousSemesters.map((semester, i) => (
                              <Card key={i}>
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-center">
                                    <CardTitle className="text-base">{semester.name}</CardTitle>
                                    <Badge variant="outline">GPA: {semester.gpa}</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-sm space-y-1">
                                    {semester.courses.map((course, j) => (
                                      <div
                                        key={j}
                                        className="flex justify-between py-1 border-b border-dashed last:border-0"
                                      >
                                        <span>{course.name}</span>
                                        <span className="font-medium">{course.grade}</span>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Progress Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Progress</CardTitle>
                      <CardDescription>Your progress across all enrolled courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 flex items-center justify-center bg-muted/20 rounded-md mb-6">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Course progress chart would appear here</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {studentData.enrolledCourses.map((course) => (
                          <div key={course.id} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{course.title}</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Activity Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Activity</CardTitle>
                      <CardDescription>Your engagement and activity metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 flex items-center justify-center bg-muted/20 rounded-md mb-6">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Activity chart would appear here</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/20 p-4 rounded-lg text-center">
                          <h3 className="text-sm font-medium text-muted-foreground">Study Hours</h3>
                          <p className="text-2xl font-bold mt-1">42.5</p>
                          <p className="text-xs text-muted-foreground mt-1">This month</p>
                        </div>
                        <div className="bg-muted/20 p-4 rounded-lg text-center">
                          <h3 className="text-sm font-medium text-muted-foreground">Assignments</h3>
                          <p className="text-2xl font-bold mt-1">12/15</p>
                          <p className="text-xs text-muted-foreground mt-1">Completed</p>
                        </div>
                        <div className="bg-muted/20 p-4 rounded-lg text-center">
                          <h3 className="text-sm font-medium text-muted-foreground">Attendance</h3>
                          <p className="text-2xl font-bold mt-1">95%</p>
                          <p className="text-xs text-muted-foreground mt-1">Overall rate</p>
                        </div>
                        <div className="bg-muted/20 p-4 rounded-lg text-center">
                          <h3 className="text-sm font-medium text-muted-foreground">Participation</h3>
                          <p className="text-2xl font-bold mt-1">High</p>
                          <p className="text-xs text-muted-foreground mt-1">Engagement level</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
