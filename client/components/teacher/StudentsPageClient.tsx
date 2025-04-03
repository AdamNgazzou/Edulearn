"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BookOpen, Search, Download, ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

// Replace the mock data and data processing logic with the new structure

// Replace the teacherCourses and studentsByCourseMock with the new data structure
interface data  {
  success: boolean
  studentdata: course[]
  total_students: string
  banned_students: string
}
interface student {
    student_id: number,
    student_name: string,
    email: string,
    last_active: string,
    status: string,
    progress: number,         
}
interface course {
    course_id: string
    course_title: string
    students: student[]
    average_course_progress: string    
}

// Replace the getAllStudents function with a new one that processes the new data structure
const getAllStudents = (studentsData : data) => {
  const allStudents: { id: number; name: string; email: string; status: string; lastActive: string; averageProgress: number; courses: { id: string; name: string; progress: number }[] }[] = []
  const uniqueStudentIds = new Set()

  studentsData.studentdata.forEach((course) => {
    course.students.forEach((student) => {
      // Check if student already exists in the list
      if (!uniqueStudentIds.has(student.student_id)) {
        uniqueStudentIds.add(student.student_id)

        // Add new student with this course
        allStudents.push({
          id: student.student_id,
          name: student.student_name,
          email: student.email,
          status: student.status,
          lastActive: student.last_active,
          averageProgress: student.progress,
          courses: [
            {
              id: course.course_id,
              name: course.course_title,
              progress: student.progress,
            },
          ],
        })
      } else {
        // Add this course to the existing student's courses
        const existingStudent = allStudents.find((s) => s.id === student.student_id)
        if (existingStudent) {
          existingStudent.courses.push({
            id: course.course_id,
            name: course.course_title,
            progress: student.progress,
          })
        }
      }
    })
  })

  return allStudents
}

// Update the statistics calculation in the component
export default function AllStudentsPage({studentsData} : {studentsData : data}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  const allStudents = useMemo(() => getAllStudents(studentsData), [])

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
          return sortOrder === "asc" ? a.averageProgress - b.averageProgress : b.averageProgress - a.averageProgress
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
  const totalStudents = Number.parseInt(studentsData.total_students)
  const bannedStudents = Number.parseInt(studentsData.banned_students)
  const activeStudents = totalStudents - bannedStudents

  // Calculate average progress across all students
  const averageProgress = Math.round(
    allStudents.reduce((sum, student) => sum + student.averageProgress, 0) / allStudents.length,
  )

  // Update the Select component for course filtering
  const courseOptions = useMemo(() => {
    return studentsData.studentdata.map((course) => ({
      id: course.course_id,
      title: course.course_title,
    }))
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
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
                  <div className="text-2xl font-bold">{bannedStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((bannedStudents / totalStudents) * 100)}% of total
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
                    {courseOptions.map((course) => (
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
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
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
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${student.averageProgress}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.averageProgress}%</span>
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

