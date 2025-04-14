"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileCheck,
  Clock,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  Calendar,
  Users,
  MoreHorizontal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Mock data for assignments
const assignmentsData = {
  courses: [
    { id: "all", name: "All Courses" },
    { id: "js", name: "Advanced JavaScript Programming" },
    { id: "react", name: "React for Beginners" },
    { id: "node", name: "Node.js Backend Development" },
    { id: "fullstack", name: "Full Stack Web Development" },
  ],
  assignments: [
    {
      id: 1,
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
    },
    {
      id: 2,
      title: "React Component Lifecycle",
      course: "React for Beginners",
      courseId: "react",
      dueDate: "2025-04-14",
      status: "active",
      submissions: 65,
      totalStudents: 78,
      gradingStatus: "not_started",
      gradedCount: 0,
      createdAt: "2025-04-02",
      description: "Create components demonstrating different lifecycle methods and hooks.",
      maxPoints: 100,
      averageGrade: null,
    },
    {
      id: 3,
      title: "Full Stack Project Proposal",
      course: "Full Stack Web Development",
      courseId: "fullstack",
      dueDate: "2025-04-15",
      status: "active",
      submissions: 42,
      totalStudents: 56,
      gradingStatus: "not_started",
      gradedCount: 0,
      createdAt: "2025-04-03",
      description: "Submit a proposal for your full stack project including tech stack and features.",
      maxPoints: 50,
      averageGrade: null,
    },
    {
      id: 4,
      title: "Error Handling in JavaScript",
      course: "Advanced JavaScript Programming",
      courseId: "js",
      dueDate: "2025-04-07",
      status: "closed",
      submissions: 45,
      totalStudents: 45,
      gradingStatus: "completed",
      gradedCount: 45,
      createdAt: "2025-03-25",
      description: "Implement robust error handling strategies in JavaScript applications.",
      maxPoints: 80,
      averageGrade: 76,
    },
    {
      id: 5,
      title: "State Management with Redux",
      course: "React for Beginners",
      courseId: "react",
      dueDate: "2025-04-05",
      status: "closed",
      submissions: 72,
      totalStudents: 78,
      gradingStatus: "completed",
      gradedCount: 72,
      createdAt: "2025-03-20",
      description: "Implement Redux for state management in a React application.",
      maxPoints: 120,
      averageGrade: 92,
    },
    {
      id: 6,
      title: "JavaScript Closures",
      course: "Advanced JavaScript Programming",
      courseId: "js",
      dueDate: "2025-04-17",
      status: "upcoming",
      submissions: 0,
      totalStudents: 45,
      gradingStatus: "not_started",
      gradedCount: 0,
      createdAt: "2025-04-05",
      description: "Demonstrate understanding of closures in JavaScript with practical examples.",
      maxPoints: 80,
      averageGrade: null,
    },
    {
      id: 7,
      title: "React Router Implementation",
      course: "React for Beginners",
      courseId: "react",
      dueDate: "2025-04-19",
      status: "upcoming",
      submissions: 0,
      totalStudents: 78,
      gradingStatus: "not_started",
      gradedCount: 0,
      createdAt: "2025-04-06",
      description: "Create a multi-page React application using React Router.",
      maxPoints: 100,
      averageGrade: null,
    },
    {
      id: 8,
      title: "Database Design Project",
      course: "Full Stack Web Development",
      courseId: "fullstack",
      dueDate: "2025-04-21",
      status: "draft",
      submissions: 0,
      totalStudents: 56,
      gradingStatus: "not_started",
      gradedCount: 0,
      createdAt: "2025-04-07",
      description: "Design a database schema for a web application of your choice.",
      maxPoints: 150,
      averageGrade: null,
    },
  ],
  submissions: [
    {
      id: 1,
      assignmentId: 1,
      studentName: "Alex Johnson",
      studentId: "S12345",
      submittedAt: "2025-04-12T14:30:00Z",
      status: "submitted",
      grade: null,
      feedback: null,
    },
    {
      id: 2,
      assignmentId: 1,
      studentName: "Maria Garcia",
      studentId: "S12346",
      submittedAt: "2025-04-12T10:15:00Z",
      status: "graded",
      grade: 92,
      feedback: "Excellent work on implementing async/await patterns.",
    },
    {
      id: 3,
      assignmentId: 1,
      studentName: "James Wilson",
      studentId: "S12347",
      submittedAt: "2025-04-11T16:45:00Z",
      status: "graded",
      grade: 85,
      feedback: "Good implementation, but error handling could be improved.",
    },
    {
      id: 4,
      assignmentId: 2,
      studentName: "Sarah Lee",
      studentId: "S12348",
      submittedAt: "2025-04-13T09:20:00Z",
      status: "submitted",
      grade: null,
      feedback: null,
    },
    {
      id: 5,
      assignmentId: 2,
      studentName: "Michael Brown",
      studentId: "S12349",
      submittedAt: "2025-04-13T11:05:00Z",
      status: "submitted",
      grade: null,
      feedback: null,
    },
  ],
}

export default function AssignmentsPage() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter assignments based on selected course and search query
  const filteredAssignments = assignmentsData.assignments.filter((assignment) => {
    const matchesCourse = selectedCourse === "all" || assignment.courseId === selectedCourse
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCourse && matchesSearch
  })

  // Get the selected assignment details
  const assignmentDetails = selectedAssignment
    ? assignmentsData.assignments.find((a) => a.id === selectedAssignment)
    : null

  // Get submissions for the selected assignment
  const assignmentSubmissions = selectedAssignment
    ? assignmentsData.submissions.filter((s) => s.assignmentId === selectedAssignment)
    : []

  // Handle opening the assignment details dialog
  const handleOpenAssignmentDetails = (assignmentId: number) => {
    setSelectedAssignment(assignmentId)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                <p className="text-muted-foreground">Manage and grade all your course assignments</p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild>
                  <Link href="/teacher/assignments/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Link>
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Search assignments..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignmentsData.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sort by Due Date</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Creation Date</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Filter Active Only</DropdownMenuItem>
                    <DropdownMenuItem>Filter Needs Grading</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full">
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                  {viewMode === "list" ? (
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Submissions</TableHead>
                              <TableHead>Grading</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAssignments
                              .filter((a) => a.status === "active")
                              .map((assignment) => (
                                <TableRow key={assignment.id}>
                                  <TableCell className="font-medium">{assignment.title}</TableCell>
                                  <TableCell>{assignment.course}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                      {new Date(assignment.dueDate).toLocaleDateString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span>
                                        {assignment.submissions}/{assignment.totalStudents}
                                      </span>
                                      <Progress
                                        value={(assignment.submissions / assignment.totalStudents) * 100}
                                        className="h-2 w-16"
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        assignment.gradingStatus === "completed"
                                          ? "outline"
                                          : assignment.gradingStatus === "in_progress"
                                            ? "default"
                                            : "secondary"
                                      }
                                    >
                                      {assignment.gradingStatus === "completed"
                                        ? "Completed"
                                        : assignment.gradingStatus === "in_progress"
                                          ? "In Progress"
                                          : "Not Started"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleOpenAssignmentDetails(assignment.id)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                          <Link href={`/teacher/assignments/${assignment.id}`}>
                                            <FileCheck className="mr-2 h-4 w-4" />
                                            Grade Submissions
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Assignment
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredAssignments
                        .filter((a) => a.status === "active")
                        .map((assignment) => (
                          <Card
                            key={assignment.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleOpenAssignmentDetails(assignment.id)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <Badge
                                  variant={
                                    assignment.gradingStatus === "completed"
                                      ? "outline"
                                      : assignment.gradingStatus === "in_progress"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {assignment.gradingStatus === "completed"
                                    ? "Completed"
                                    : assignment.gradingStatus === "in_progress"
                                      ? "In Progress"
                                      : "Not Started"}
                                </Badge>
                              </div>
                              <CardDescription>{assignment.course}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Submissions</span>
                                  <span>
                                    {assignment.submissions}/{assignment.totalStudents}
                                  </span>
                                </div>
                                <Progress
                                  value={(assignment.submissions / assignment.totalStudents) * 100}
                                  className="h-2"
                                />
                                <div className="flex items-center justify-between text-sm">
                                  <span>Graded</span>
                                  <span>
                                    {assignment.gradedCount}/{assignment.submissions}
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    assignment.submissions > 0
                                      ? (assignment.gradedCount / assignment.submissions) * 100
                                      : 0
                                  }
                                  className="h-2"
                                />
                                <div className="flex justify-end mt-4">
                                  <Button size="sm" asChild>
                                    <Link href={`/teacher/assignments/${assignment.id}`}>Grade</Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upcoming">
                  {/* Similar structure for upcoming assignments */}
                  {viewMode === "list" ? (
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAssignments
                              .filter((a) => a.status === "upcoming")
                              .map((assignment) => (
                                <TableRow key={assignment.id}>
                                  <TableCell className="font-medium">{assignment.title}</TableCell>
                                  <TableCell>{assignment.course}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                      {new Date(assignment.dueDate).toLocaleDateString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Upcoming</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleOpenAssignmentDetails(assignment.id)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Assignment
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredAssignments
                        .filter((a) => a.status === "upcoming")
                        .map((assignment) => (
                          <Card
                            key={assignment.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleOpenAssignmentDetails(assignment.id)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <Badge variant="secondary">Upcoming</Badge>
                              </div>
                              <CardDescription>{assignment.course}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-2">
                                  <Users className="mr-2 h-4 w-4" />
                                  <span>{assignment.totalStudents} students enrolled</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="closed">
                  {/* Similar structure for closed assignments */}
                  {viewMode === "list" ? (
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Submissions</TableHead>
                              <TableHead>Average Grade</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAssignments
                              .filter((a) => a.status === "closed")
                              .map((assignment) => (
                                <TableRow key={assignment.id}>
                                  <TableCell className="font-medium">{assignment.title}</TableCell>
                                  <TableCell>{assignment.course}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                      {new Date(assignment.dueDate).toLocaleDateString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span>
                                        {assignment.submissions}/{assignment.totalStudents}
                                      </span>
                                      <Progress
                                        value={(assignment.submissions / assignment.totalStudents) * 100}
                                        className="h-2 w-16"
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <span className="font-medium">{assignment.averageGrade}/100</span>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleOpenAssignmentDetails(assignment.id)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                          <Link href={`/teacher/assignments/${assignment.id}`}>
                                            <FileCheck className="mr-2 h-4 w-4" />
                                            View Submissions
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Download className="mr-2 h-4 w-4" />
                                          Export Grades
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredAssignments
                        .filter((a) => a.status === "closed")
                        .map((assignment) => (
                          <Card
                            key={assignment.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleOpenAssignmentDetails(assignment.id)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <Badge variant="outline">Closed</Badge>
                              </div>
                              <CardDescription>{assignment.course}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>Submissions</span>
                                  <span>
                                    {assignment.submissions}/{assignment.totalStudents}
                                  </span>
                                </div>
                                <Progress
                                  value={(assignment.submissions / assignment.totalStudents) * 100}
                                  className="h-2"
                                />
                                <div className="flex items-center justify-between text-sm mt-2">
                                  <span>Average Grade</span>
                                  <span className="font-medium">{assignment.averageGrade}/100</span>
                                </div>
                                <div className="flex justify-end mt-4">
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/teacher/assignments/${assignment.id}`}>View Submissions</Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="drafts">
                  {/* Similar structure for draft assignments */}
                  {viewMode === "list" ? (
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Course</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAssignments
                              .filter((a) => a.status === "draft")
                              .map((assignment) => (
                                <TableRow key={assignment.id}>
                                  <TableCell className="font-medium">{assignment.title}</TableCell>
                                  <TableCell>{assignment.course}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                      {new Date(assignment.createdAt).toLocaleDateString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">Draft</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleOpenAssignmentDetails(assignment.id)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Assignment
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Publish
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredAssignments
                        .filter((a) => a.status === "draft")
                        .map((assignment) => (
                          <Card
                            key={assignment.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleOpenAssignmentDetails(assignment.id)}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{assignment.title}</CardTitle>
                                <Badge variant="secondary">Draft</Badge>
                              </div>
                              <CardDescription>{assignment.course}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Created: {new Date(assignment.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-2">
                                  <Users className="mr-2 h-4 w-4" />
                                  <span>{assignment.totalStudents} students enrolled</span>
                                </div>
                                <div className="flex justify-end mt-4">
                                  <Button size="sm">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Publish
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Assignment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl">{assignmentDetails?.title}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>{assignmentDetails?.course}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Assignment Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">
                    {assignmentDetails ? new Date(assignmentDetails.dueDate).toLocaleDateString() : ""}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      assignmentDetails?.status === "active"
                        ? "default"
                        : assignmentDetails?.status === "closed"
                          ? "outline"
                          : assignmentDetails?.status === "upcoming"
                            ? "secondary"
                            : "secondary"
                    }
                  >
                    {assignmentDetails?.status === "active"
                      ? "Active"
                      : assignmentDetails?.status === "closed"
                        ? "Closed"
                        : assignmentDetails?.status === "upcoming"
                          ? "Upcoming"
                          : "Draft"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Max Points</p>
                  <p className="font-medium">{assignmentDetails?.maxPoints}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                  <p className="font-medium">
                    {assignmentDetails?.averageGrade ? `${assignmentDetails.averageGrade}/100` : "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{assignmentDetails?.description}</p>
              </div>
            </div>

            {/* Submission Stats */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Submission Statistics</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Submissions</span>
                  <span className="font-medium">
                    {assignmentDetails?.submissions}/{assignmentDetails?.totalStudents}
                  </span>
                </div>
                <Progress
                  value={
                    assignmentDetails ? (assignmentDetails.submissions / assignmentDetails.totalStudents) * 100 : 0
                  }
                  className="h-2"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>Graded</span>
                  <span className="font-medium">
                    {assignmentDetails?.gradedCount}/{assignmentDetails?.submissions}
                  </span>
                </div>
                <Progress
                  value={
                    assignmentDetails && assignmentDetails.submissions > 0
                      ? (assignmentDetails.gradedCount / assignmentDetails.submissions) * 100
                      : 0
                  }
                  className="h-2"
                />
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Recent Submissions</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/teacher/assignments/${selectedAssignment}`}>View All</Link>
                </Button>
              </div>

              {assignmentSubmissions.length > 0 ? (
                <div className="space-y-2">
                  {assignmentSubmissions.map((submission) => (
                    <Card key={submission.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(submission.submittedAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {submission.status === "graded" ? (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                Graded: {submission.grade}/100
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Ungraded
                              </Badge>
                            )}
                            <Button size="sm" asChild>
                              <Link href={`/teacher/assignments/${selectedAssignment}/${submission.id}`}>
                                {submission.status === "graded" ? "Review" : "Grade"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 bg-muted/20 rounded-md">
                  <p className="text-sm text-muted-foreground">No submissions yet</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href={`/teacher/assignments/${selectedAssignment}`}>
                <FileCheck className="mr-2 h-4 w-4" />
                Grade Submissions
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Grades
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
