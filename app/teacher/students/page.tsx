"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BookOpen, Search, Download, ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data for courses
const teacherCourses = [
  {
    id: "1",
    title: "Advanced JavaScript Programming",
    students: 45,
    lessons: 15,
    status: "active",
  },
  {
    id: "2",
    title: "React for Beginners",
    students: 78,
    lessons: 12,
    status: "active",
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    students: 32,
    lessons: 18,
    status: "draft",
  },
  {
    id: "4",
    title: "Full Stack Web Development",
    students: 56,
    lessons: 24,
    status: "active",
  },
]

// Mock data for students by course
const studentsByCourseMock = {
  "1": [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      status: "active",
      progress: 65,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-09-15",
      lastActive: "2024-10-01",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      status: "active",
      progress: 78,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-09-10",
      lastActive: "2024-10-02",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      status: "inactive",
      progress: 23,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-09-20",
      lastActive: "2024-09-15",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.d@example.com",
      status: "active",
      progress: 92,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-09-05",
      lastActive: "2024-10-03",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.b@example.com",
      status: "active",
      progress: 45,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-09-12",
      lastActive: "2024-09-28",
    },
  ],
  "2": [
    {
      id: 6,
      name: "Sophia Martinez",
      email: "sophia.m@example.com",
      status: "active",
      progress: 88,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-08-15",
      lastActive: "2024-10-01",
    },
    {
      id: 7,
      name: "William Taylor",
      email: "william.t@example.com",
      status: "active",
      progress: 72,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-08-20",
      lastActive: "2024-09-30",
    },
    {
      id: 8,
      name: "Olivia Anderson",
      email: "olivia.a@example.com",
      status: "inactive",
      progress: 15,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-08-25",
      lastActive: "2024-09-10",
    },
    {
      id: 9,
      name: "Noah Thomas",
      email: "noah.t@example.com",
      status: "active",
      progress: 60,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-08-10",
      lastActive: "2024-09-29",
    },
  ],
  "3": [
    {
      id: 10,
      name: "Isabella Jackson",
      email: "isabella.j@example.com",
      status: "active",
      progress: 55,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-10-05",
      lastActive: "2024-10-02",
    },
    {
      id: 11,
      name: "Ethan White",
      email: "ethan.w@example.com",
      status: "active",
      progress: 40,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-10-10",
      lastActive: "2024-09-25",
    },
    {
      id: 12,
      name: "Mia Harris",
      email: "mia.h@example.com",
      status: "active",
      progress: 67,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-10-15",
      lastActive: "2024-10-01",
    },
  ],
  "4": [
    {
      id: 13,
      name: "Charlotte Clark",
      email: "charlotte.c@example.com",
      status: "active",
      progress: 82,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-07-10",
      lastActive: "2024-10-03",
    },
    {
      id: 14,
      name: "Liam Lewis",
      email: "liam.l@example.com",
      status: "inactive",
      progress: 30,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-07-15",
      lastActive: "2024-09-10",
    },
    {
      id: 15,
      name: "Amelia Walker",
      email: "amelia.w@example.com",
      status: "active",
      progress: 75,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-07-20",
      lastActive: "2024-10-01",
    },
    {
      id: 16,
      name: "Benjamin Hall",
      email: "benjamin.h@example.com",
      status: "active",
      progress: 50,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-07-25",
      lastActive: "2024-09-28",
    },
    {
      id: 17,
      name: "Harper Young",
      email: "harper.y@example.com",
      status: "active",
      progress: 95,
      avatar: "/placeholder.svg?height=40&width=40",
      enrollmentDate: "2023-07-05",
      lastActive: "2024-10-02",
    },
  ],
}

// Create a combined list of all students with their courses
const getAllStudents = () => {
  const allStudents = []

  Object.entries(studentsByCourseMock).forEach(([courseId, students]) => {
    const courseName = teacherCourses.find((c) => c.id === courseId)?.title || "Unknown Course"

    students.forEach((student) => {
      // Check if student already exists in the list
      const existingStudentIndex = allStudents.findIndex((s) => s.id === student.id)

      if (existingStudentIndex >= 0) {
        // Add this course to the existing student's courses
        allStudents[existingStudentIndex].courses.push({
          id: courseId,
          name: courseName,
          progress: student.progress,
        })
      } else {
        // Add new student with this course
        allStudents.push({
          ...student,
          courses: [
            {
              id: courseId,
              name: courseName,
              progress: student.progress,
            },
          ],
        })
      }
    })
  })

  return allStudents
}

export default function AllStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  const allStudents = useMemo(() => getAllStudents(), [])

  // Apply filters and sorting
  const filteredStudents = useMemo(() => {
    return allStudents
      .filter(
        (student) =>
          (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (statusFilter === "all" || student.status === statusFilter) &&
          (courseFilter === "all" || student.courses.some((course) => course.id === courseFilter)),
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        } else if (sortBy === "status") {
          return sortOrder === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
        } else if (sortBy === "progress") {
          // Calculate average progress across all courses
          const aAvg = a.courses.reduce((sum, c) => sum + c.progress, 0) / a.courses.length
          const bAvg = b.courses.reduce((sum, c) => sum + c.progress, 0) / b.courses.length
          return sortOrder === "asc" ? aAvg - bAvg : bAvg - aAvg
        } else if (sortBy === "courses") {
          return sortOrder === "asc" ? a.courses.length - b.courses.length : b.courses.length - a.courses.length
        } else if (sortBy === "lastActive") {
          return sortOrder === "asc"
            ? new Date(a.lastActive) - new Date(b.lastActive)
            : new Date(b.lastActive) - new Date(a.lastActive)
        }
        return 0
      })
  }, [allStudents, searchQuery, statusFilter, courseFilter, sortBy, sortOrder])

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  // Calculate statistics
  const totalStudents = allStudents.length
  const activeStudents = allStudents.filter((s) => s.status === "active").length
  const inactiveStudents = allStudents.filter((s) => s.status === "inactive").length
  const averageProgress = Math.round(
    allStudents.reduce((sum, student) => {
      const studentAvg = student.courses.reduce((s, c) => s + c.progress, 0) / student.courses.length
      return sum + studentAvg
    }, 0) / totalStudents,
  )

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
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/teacher/courses" className="text-sm font-medium transition-colors hover:text-primary">
              My Courses
            </Link>
            <Link href="/teacher" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/teacher/students" className="text-sm font-medium text-primary">
              All Students
            </Link>
            <Link href="/teacher/profile" className="text-sm font-medium transition-colors hover:text-primary">
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
              <p className="text-muted-foreground">Manage and view all students enrolled in your courses</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((activeStudents / totalStudents) * 100)}% of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inactive Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inactiveStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((inactiveStudents / totalStudents) * 100)}% of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageProgress}%</div>
                  <Progress value={averageProgress} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex-1 md:max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {teacherCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Students Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                        Student
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => toggleSort("status")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => toggleSort("courses")}>
                        Enrolled Courses
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => toggleSort("progress")}>
                        Avg. Progress
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => toggleSort("lastActive")}>
                        Last Active
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => {
                      // Calculate average progress across all courses
                      const avgProgress = Math.round(
                        student.courses.reduce((sum, course) => sum + course.progress, 0) / student.courses.length,
                      )

                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.status === "active" ? "default" : "secondary"}>
                              {student.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-medium">{student.courses.length} courses</div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                    View Courses <ChevronDown className="ml-1 h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[200px]">
                                  {student.courses.map((course) => (
                                    <DropdownMenuCheckboxItem key={course.id} checked={true} disabled>
                                      {course.name}
                                    </DropdownMenuCheckboxItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 rounded-full bg-muted">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${avgProgress}%` }} />
                              </div>
                              <span className="text-sm">{avgProgress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{new Date(student.lastActive).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
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

