"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Search, Filter, Clock, Calendar, FileCheck, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for assignment details
const getAssignmentData = (assignmentId: string) => {
  // This would typically come from an API call
  return {
    id: Number.parseInt(assignmentId),
    title: "Promises and Async/Await",
    course: "Advanced JavaScript Programming",
    courseId: "js",
    dueDate: "2025-04-13",
    status: "active",
    submissions: 38,
    totalStudents: 45,
    gradingStatus: "in_progress",
    gradedCount: 15,
    createdAt: "2025-04-01",
    description: "Implement asynchronous operations using Promises and async/await syntax.",
    maxPoints: 100,
    averageGrade: 85,
    rubric: [
      {
        id: 1,
        criteria: "Implementation of Promises",
        maxPoints: 30,
        description: "Proper use of Promise syntax and chaining",
      },
      {
        id: 2,
        criteria: "Implementation of async/await",
        maxPoints: 30,
        description: "Correct use of async/await syntax",
      },
      {
        id: 3,
        criteria: "Error Handling",
        maxPoints: 20,
        description: "Proper error handling with try/catch or .catch()",
      },
      { id: 4, criteria: "Code Quality", maxPoints: 20, description: "Clean, readable, and well-documented code" },
    ],
    submissions: [
      {
        id: 1,
        studentName: "Alex Johnson",
        studentId: "S12345",
        submittedAt: "2025-04-12T14:30:00Z",
        status: "submitted",
        grade: null,
        feedback: null,
        late: false,
      },
      {
        id: 2,
        studentName: "Maria Garcia",
        studentId: "S12346",
        submittedAt: "2025-04-12T10:15:00Z",
        status: "graded",
        grade: 92,
        feedback: "Excellent work on implementing async/await patterns.",
        late: false,
      },
      {
        id: 3,
        studentName: "James Wilson",
        studentId: "S12347",
        submittedAt: "2025-04-11T16:45:00Z",
        status: "graded",
        grade: 85,
        feedback: "Good implementation, but error handling could be improved.",
        late: false,
      },
      {
        id: 4,
        studentName: "Sarah Lee",
        studentId: "S12348",
        submittedAt: "2025-04-13T09:20:00Z",
        status: "submitted",
        grade: null,
        feedback: null,
        late: true,
      },
      {
        id: 5,
        studentName: "Michael Brown",
        studentId: "S12349",
        submittedAt: "2025-04-13T11:05:00Z",
        status: "submitted",
        grade: null,
        feedback: null,
        late: true,
      },
      {
        id: 6,
        studentName: "Emily Davis",
        studentId: "S12350",
        submittedAt: "2025-04-10T13:25:00Z",
        status: "graded",
        grade: 78,
        feedback: "Good attempt, but needs improvement in Promise chaining.",
        late: false,
      },
      {
        id: 7,
        studentName: "David Martinez",
        studentId: "S12351",
        submittedAt: "2025-04-11T09:10:00Z",
        status: "graded",
        grade: 95,
        feedback: "Excellent work! Great error handling and clean code.",
        late: false,
      },
      {
        id: 8,
        studentName: "Sophia Taylor",
        studentId: "S12352",
        submittedAt: "2025-04-12T16:40:00Z",
        status: "submitted",
        grade: null,
        feedback: null,
        late: false,
      },
    ],
  }
}

export default function AssignmentSubmissionsPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = use(params);
  const assignmentData = getAssignmentData(assignmentId)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter submissions based on search query and status filter
  const filteredSubmissions = assignmentData.submissions.filter((submission) => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "graded" && submission.status === "graded") ||
      (statusFilter === "ungraded" && submission.status === "submitted") ||
      (statusFilter === "late" && submission.late)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/teacher/assignments">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{assignmentData.title}</h1>
                <p className="text-muted-foreground">{assignmentData.course}</p>
              </div>
            </div>

            {/* Assignment Overview */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">
                      {assignmentData.submissions.length}/{assignmentData.totalStudents}
                    </div>
                    <Progress
                      value={(assignmentData.submissions.length / assignmentData.totalStudents) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {assignmentData.totalStudents - assignmentData.submissions.length} students haven't submitted
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Grading Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">
                    {assignmentData.submissions.length}/{assignmentData.gradedCount}
                    </div>
                    <Progress
                      value={( assignmentData.submissions.length/ assignmentData.gradedCount) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {assignmentData.gradedCount  - assignmentData.submissions.length} submissions left to grade
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assignment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">{new Date(assignmentData.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max Points:</span>
                      <span className="font-medium">{assignmentData.maxPoints}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Average Grade:</span>
                      <span className="font-medium">
                        {assignmentData.averageGrade ? `${assignmentData.averageGrade}/100` : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Search students..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Submissions</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                    <SelectItem value="ungraded">Ungraded</SelectItem>
                    <SelectItem value="late">Late Submissions</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sort by Name</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Submission Date</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Grade</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Grades
                </Button>
              </div>
            </div>

            {/* Submissions List */}
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Submissions ({assignmentData.submissions.length})</TabsTrigger>
                <TabsTrigger value="ungraded">
                  Ungraded ({assignmentData.submissions.filter((s) => s.status === "submitted").length})
                </TabsTrigger>
                <TabsTrigger value="graded">
                  Graded ({assignmentData.submissions.filter((s) => s.status === "graded").length})
                </TabsTrigger>
                <TabsTrigger value="late">Late ({assignmentData.submissions.filter((s) => s.late).length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <Card
                    key={submission.id}
                    className={`overflow-hidden border-l-4 ${
                      submission.status === "graded"
                        ? "border-l-emerald-500"
                        : submission.late
                          ? "border-l-amber-500"
                          : "border-l-blue-500"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={submission.studentName} />
                            <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{submission.studentName}</h3>
                            <p className="text-sm text-muted-foreground">ID: {submission.studentId}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>
                                Submitted: {new Date(submission.submittedAt).toLocaleString()}
                                {submission.late && " (Late)"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {submission.status === "graded" ? (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              Graded: {submission.grade}/100
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className={
                                submission.late
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {submission.late ? "Late Submission" : "Ungraded"}
                            </Badge>
                          )}
                          <Button size="sm" asChild>
                            <Link href={`/teacher/assignments/${assignmentId}/${submission.id}`}>
                              {submission.status === "graded" ? "Review" : "Grade"}
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/teacher/assignments/${assignmentId}/${submission.id}`}>
                                  <FileCheck className="mr-2 h-4 w-4" />
                                  {submission.status === "graded" ? "Review Submission" : "Grade Submission"}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Submission
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                View Student History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ungraded" className="space-y-4">
                {filteredSubmissions
                  .filter((s) => s.status === "submitted")
                  .map((submission) => (
                    <Card
                      key={submission.id}
                      className={`overflow-hidden border-l-4 ${
                        submission.late ? "border-l-amber-500" : "border-l-blue-500"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={submission.studentName} />
                              <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{submission.studentName}</h3>
                              <p className="text-sm text-muted-foreground">ID: {submission.studentId}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>
                                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                                  {submission.late && " (Late)"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                submission.late
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {submission.late ? "Late Submission" : "Ungraded"}
                            </Badge>
                            <Button size="sm" asChild>
                              <Link href={`/teacher/assignments/${assignmentId}/${submission.id}`}>Grade</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="graded" className="space-y-4">
                {filteredSubmissions
                  .filter((s) => s.status === "graded")
                  .map((submission) => (
                    <Card key={submission.id} className="overflow-hidden border-l-4 border-l-emerald-500">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={submission.studentName} />
                              <Avatar alt={submission.studentName} />
                              <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{submission.studentName}</h3>
                              <p className="text-sm text-muted-foreground">ID: {submission.studentId}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              Graded: {submission.grade}/100
                            </Badge>
                            <Button size="sm" asChild>
                              <Link href={`/teacher/assignments/${assignmentId}/${submission.id}`}>Review</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="late" className="space-y-4">
                {filteredSubmissions
                  .filter((s) => s.late)
                  .map((submission) => (
                    <Card key={submission.id} className="overflow-hidden border-l-4 border-l-amber-500">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={submission.studentName} />
                              <AvatarFallback>{submission.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{submission.studentName}</h3>
                              <p className="text-sm text-muted-foreground">ID: {submission.studentId}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Submitted: {new Date(submission.submittedAt).toLocaleString()} (Late)</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Late Submission
                            </Badge>
                            <Button size="sm" asChild>
                              <Link href={`/teacher/assignments/${assignmentId}/${submission.id}`}>
                                {submission.status === "graded" ? "Review" : "Grade"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
