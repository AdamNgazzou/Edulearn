"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  Users,
  BookMarked,
  BarChart3,
  Settings,
  Search,
  Download,
  MoreHorizontal,
  Plus,
  Trash,
  Edit,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import the AddCourseModal and EditCourseModal components
import { AddCourseModal } from "./add-course-modal"
import { EditCourseModal } from "./edit-course-modal"

// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. John Smith",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 245,
    lessons: 12,
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-10-01",
  },
  {
    id: 2,
    title: "React for Beginners",
    instructor: "Prof. Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 189,
    lessons: 15,
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-25",
  },
  {
    id: 3,
    title: "Advanced JavaScript Concepts",
    instructor: "Prof. Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 156,
    lessons: 18,
    duration: "8 weeks",
    level: "Intermediate",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-20",
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Emily Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 132,
    lessons: 14,
    duration: "7 weeks",
    level: "Intermediate",
    rating: 4.6,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-15",
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "David Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 98,
    lessons: 16,
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.5,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-10",
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Brown",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "published",
    students: 87,
    lessons: 10,
    duration: "5 weeks",
    level: "Beginner",
    rating: 4.4,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-05",
  },
  {
    id: 7,
    title: "Full Stack Web Development",
    instructor: "Dr. John Smith",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "draft",
    students: 0,
    lessons: 24,
    duration: "12 weeks",
    level: "Advanced",
    rating: 0,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-10-02",
  },
  {
    id: 8,
    title: "Machine Learning Basics",
    instructor: "Emily Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    status: "draft",
    students: 0,
    lessons: 20,
    duration: "9 weeks",
    level: "Intermediate",
    rating: 0,
    image: "/placeholder.svg?height=100&width=150",
    lastUpdated: "2024-09-30",
  },
]

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  // Add state for the modals inside the AdminCoursesPage component
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<(typeof coursesData)[0] | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Add mock data for instructors
  const instructors = [
    { id: 1, name: "Dr. John Smith", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Prof. Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Emily Chen", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Add functions to handle saving courses
  const handleAddCourse = (newCourse: any) => {
    // In a real app, this would make an API call
    // For now, we'll just show an alert
    alert(`Course "${newCourse.title}" created successfully!`)
  }

  const handleSaveCourse = (updatedCourse: (typeof coursesData)[0]) => {
    // In a real app, this would make an API call
    // For now, we'll just show an alert
    alert(`Course "${updatedCourse.title}" updated successfully!`)
  }

  const handleDeleteCourse = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      // In a real app, this would make an API call
      // For now, we'll just show an alert
      alert(`Course with ID ${courseId} would be deleted in a real application.`)
    }
  }

  // Apply filters
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter

    return matchesSearch && matchesStatus && matchesLevel
  })

  // Stats
  const totalCourses = coursesData.length
  const publishedCourses = coursesData.filter((course) => course.status === "published").length
  const draftCourses = coursesData.filter((course) => course.status === "draft").length
  const totalStudents = coursesData.reduce((sum, course) => sum + course.students, 0)

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
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
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
                <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
                <p className="text-muted-foreground">Manage courses, content, and enrollments</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCourses}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{publishedCourses}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Draft Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{draftCourses}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalStudents}</div>
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
                      placeholder="Search courses..."
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
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </div>
              </div>

              {/* Courses Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No courses found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-16 overflow-hidden rounded-md">
                                <Image
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{course.title}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{course.duration}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <BookMarked className="mr-1 h-3 w-3" />
                                    <span>{course.lessons} lessons</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                                <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{course.instructor}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={course.status === "published" ? "default" : "secondary"}>
                              {course.status === "published" ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{course.level}</Badge>
                          </TableCell>
                          <TableCell>{course.students}</TableCell>
                          <TableCell>{new Date(course.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedCourse(course)
                                    setIsEditModalOpen(true)
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="text-destructive"
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCourse}
        instructors={instructors}
      />

      <EditCourseModal
        course={selectedCourse}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCourse}
        instructors={instructors}
      />
    </div>
  )
}

