"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileCheck,
  Clock,
  Star,
  Plus,
  ChevronRight,
  User,
  AlertCircle,
  BarChart3,
  GraduationCap,
  PieChart,
  Search,
  ArrowUpDown,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for teacher dashboard
const teacherData = {
  name: "Dr. John Smith",
  avatar: "/placeholder.svg?height=40&width=40",
  department: "Computer Science",
  totalStudents: 178,
  totalCourses: 4,
  averageRating: 4.8,
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
      status: "overdue",
    },
    {
      id: 2,
      title: "React Component Lifecycle",
      course: "React for Beginners",
      submissions: 65,
      totalStudents: 78,
      dueDate: "Today",
      status: "urgent",
    },
    {
      id: 3,
      title: "Full Stack Project Proposal",
      course: "Full Stack Web Development",
      submissions: 42,
      totalStudents: 56,
      dueDate: "Tomorrow",
      status: "upcoming",
    },
  ],
  recentSubmissions: [
    {
      id: 1,
      student: "Alex Johnson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Advanced JavaScript Programming",
      assignment: "Promises and Async/Await Assignment",
      submittedAt: "2 hours ago",
      status: "ungraded",
    },
    {
      id: 2,
      student: "Maria Garcia",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "React for Beginners",
      assignment: "React Hooks Implementation",
      submittedAt: "5 hours ago",
      status: "ungraded",
    },
    {
      id: 3,
      student: "James Wilson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Full Stack Web Development",
      assignment: "API Integration Project",
      submittedAt: "Yesterday",
      status: "ungraded",
    },
    {
      id: 4,
      student: "Sarah Lee",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "Advanced JavaScript Programming",
      assignment: "Error Handling in JavaScript",
      submittedAt: "Yesterday",
      status: "graded",
      grade: "A",
    },
    {
      id: 5,
      student: "Michael Brown",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      course: "React for Beginners",
      assignment: "State Management Challenge",
      submittedAt: "2 days ago",
      status: "graded",
      grade: "B+",
    },
  ],
  gradingQueue: [
    {
      id: 1,
      title: "Promises and Async/Await",
      course: "Advanced JavaScript Programming",
      pendingGrading: 38,
      totalSubmissions: 38,
      dueDate: "Yesterday",
      priority: "high",
    },
    {
      id: 2,
      title: "React Component Lifecycle",
      course: "React for Beginners",
      pendingGrading: 65,
      totalSubmissions: 65,
      dueDate: "Today",
      priority: "medium",
    },
    {
      id: 3,
      title: "Full Stack Project Proposal",
      course: "Full Stack Web Development",
      pendingGrading: 42,
      totalSubmissions: 42,
      dueDate: "Tomorrow",
      priority: "low",
    },
    {
      id: 4,
      title: "Error Handling in JavaScript",
      course: "Advanced JavaScript Programming",
      pendingGrading: 12,
      totalSubmissions: 45,
      dueDate: "Last week",
      priority: "completed",
    },
  ],
  upcomingAssignments: [
    {
      id: 1,
      title: "JavaScript Closures",
      course: "Advanced JavaScript Programming",
      dueDate: "In 3 days",
      status: "published",
    },
    {
      id: 2,
      title: "React Router Implementation",
      course: "React for Beginners",
      dueDate: "In 5 days",
      status: "published",
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "Full Stack Web Development",
      dueDate: "In 1 week",
      status: "draft",
    },
  ],
  gradingStats: {
    totalGraded: 145,
    pendingGrading: 145,
    averageGrade: "B+",
    gradingTime: "15 min",
    courseBreakdown: [
      { course: "Advanced JavaScript", percentage: 35 },
      { course: "React for Beginners", percentage: 40 },
      { course: "Full Stack Web Dev", percentage: 25 },
    ],
  },
}

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4  p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  <AvatarImage src={teacherData.avatar || "/placeholder.svg"} alt={teacherData.name} />
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
                  <Link href="/teacher/assignments/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className=" shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileCheck className="mr-2 h-4 w-4 text-emerald-500" />
                    Assignments Graded
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherData.gradingStats.totalGraded}</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </CardContent>
              </Card>
              <Card className=" shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    Pending Grading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherData.gradingStats.pendingGrading}</div>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </CardContent>
              </Card>
              <Card className=" shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    Average Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherData.gradingStats.averageGrade}</div>
                  <p className="text-xs text-muted-foreground">Across all assignments</p>
                </CardContent>
              </Card>
              <Card className=" shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherData.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across {teacherData.totalCourses} courses</p>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto shadow-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="grading">Grading</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* Pending Assignments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                      Assignments Requiring Attention
                    </h2>
                    <Button variant="outline" size="sm">
                      View All Assignments
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {teacherData.pendingAssignments.map((assignment) => (
                      <Card
                        key={assignment.id}
                        className=" shadow-sm hover:shadow-md transition-shadow overflow-hidden border-t-4 border-t-amber-500"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge
                              variant={
                                assignment.status === "overdue"
                                  ? "destructive"
                                  : assignment.status === "urgent"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              Due: {assignment.dueDate}
                            </Badge>
                          </div>
                          <CardDescription>{assignment.course}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Submissions</span>
                              <span className="font-medium">
                                {assignment.submissions} of {assignment.totalStudents}
                              </span>
                            </div>
                            <Progress
                              value={(assignment.submissions / assignment.totalStudents) * 100}
                              className="h-2"
                            />
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{assignment.totalStudents - assignment.submissions} submissions pending</span>
                            </div>
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

                {/* Grading Queue */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <FileCheck className="mr-2 h-5 w-5 text-emerald-500" />
                      Grading Queue
                    </h2>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("grading")}>
                      Go to Grading
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <Card className=" shadow-sm">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-4 font-medium">Assignment</th>
                              <th className="text-left p-4 font-medium">Course</th>
                              <th className="text-left p-4 font-medium">Due Date</th>
                              <th className="text-left p-4 font-medium">Pending</th>
                              <th className="text-left p-4 font-medium">Priority</th>
                              <th className="text-left p-4 font-medium">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teacherData.gradingQueue.map((item) => (
                              <tr key={item.id} className="border-b hover:bg-muted/20">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4 text-sm text-muted-foreground">{item.course}</td>
                                <td className="p-4 text-sm">{item.dueDate}</td>
                                <td className="p-4">
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">{item.pendingGrading}</span>
                                    <span className="text-xs text-muted-foreground">of {item.totalSubmissions}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge
                                    variant={
                                      item.priority === "high"
                                        ? "destructive"
                                        : item.priority === "medium"
                                          ? "default"
                                          : item.priority === "completed"
                                            ? "outline"
                                            : "secondary"
                                    }
                                  >
                                    {item.priority}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <Button size="sm" variant={item.priority === "completed" ? "outline" : "default"}>
                                    {item.priority === "completed" ? "View Grades" : "Start Grading"}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Grading Tab */}
              <TabsContent value="grading" className="mt-6 space-y-6">
                <Card className=" shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Grading & Feedback</CardTitle>
                        <CardDescription>Review and grade student submissions</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export Grades
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1 flex gap-2">
                        <Input placeholder="Search submissions..." className="flex-1" />
                        <Button variant="outline" size="icon">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Submissions</SelectItem>
                            <SelectItem value="ungraded">Ungraded</SelectItem>
                            <SelectItem value="graded">Graded</SelectItem>
                            <SelectItem value="late">Late Submissions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Pending Submissions</h3>
                      <div className="space-y-4">
                        {teacherData.recentSubmissions
                          .filter((submission) => submission.status === "ungraded")
                          .map((submission) => (
                            <Card key={submission.id} className="overflow-hidden border-l-4 border-l-amber-500">
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={submission.studentAvatar || "/placeholder.svg"}
                                        alt={submission.student}
                                      />
                                      <AvatarFallback>{submission.student.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium">{submission.student}</h3>
                                      <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <span>{submission.course}</span>
                                        <span className="mx-1">•</span>
                                        <span>{submission.submittedAt}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className=" text-amber-700 border-amber-200">
                                      Ungraded
                                    </Badge>
                                    <Button size="sm">Grade Now</Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>

                      <h3 className="font-medium text-lg mt-8">Recently Graded</h3>
                      <div className="space-y-4">
                        {teacherData.recentSubmissions
                          .filter((submission) => submission.status === "graded")
                          .map((submission) => (
                            <Card key={submission.id} className="overflow-hidden border-l-4 border-l-emerald-500">
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={submission.studentAvatar || "/placeholder.svg"}
                                        alt={submission.student}
                                      />
                                      <AvatarFallback>{submission.student.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium">{submission.student}</h3>
                                      <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <span>{submission.course}</span>
                                        <span className="mx-1">•</span>
                                        <span>{submission.submittedAt}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className=" text-emerald-700 border-emerald-200"
                                    >
                                      Graded: {submission.grade}
                                    </Badge>
                                    <Button size="sm" variant="outline">
                                      View Feedback
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <Card className=" shadow-sm">
                  <CardHeader>
                    <CardTitle>Grading Analytics</CardTitle>
                    <CardDescription>Insights into your grading patterns and student performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Grading Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center h-60">
                            <div className="flex items-center justify-center flex-col">
                              <PieChart className="h-16 w-16 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Grading distribution chart would appear here
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Submission Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-center h-60">
                            <div className="flex items-center justify-center flex-col">
                              <BarChart3 className="h-16 w-16 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Submission timeline chart would appear here
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Grading Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className=" p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">Average Grading Time</h3>
                              <p className="text-2xl font-bold mt-1">{teacherData.gradingStats.gradingTime}</p>
                              <p className="text-xs text-muted-foreground mt-1">Per assignment</p>
                            </div>
                            <div className=" p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">Feedback Length</h3>
                              <p className="text-2xl font-bold mt-1">250 words</p>
                              <p className="text-xs text-muted-foreground mt-1">Average per submission</p>
                            </div>
                            <div className=" p-4 rounded-lg">
                              <h3 className="text-sm font-medium text-muted-foreground">Response Time</h3>
                              <p className="text-2xl font-bold mt-1">1.5 days</p>
                              <p className="text-xs text-muted-foreground mt-1">From submission to grading</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
