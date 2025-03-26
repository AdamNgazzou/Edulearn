"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, ArrowLeft, Search, Mail, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Advanced JavaScript Programming",
    students: 45,
    lessons: 15,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "2 days ago",
  },
  {
    id: "2",
    title: "React for Beginners",
    students: 78,
    lessons: 12,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "1 week ago",
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    students: 32,
    lessons: 18,
    status: "draft",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    title: "Full Stack Web Development",
    students: 56,
    lessons: 24,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "5 days ago",
  },
]

// Mock data for students
type Student = {
  id: number;
  name: string;
  email: string;
  status: string;
  progress: number;
  avatar: string;
};

const studentsByCourseMock: { [key: string]: Student[] } = {
  "1": [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      status: "active",
      progress: 65,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      status: "active",
      progress: 78,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      status: "inactive",
      progress: 23,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.d@example.com",
      status: "active",
      progress: 92,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.b@example.com",
      status: "active",
      progress: 45,
      avatar: "/placeholder.svg?height=40&width=40",
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
    },
    {
      id: 7,
      name: "William Taylor",
      email: "william.t@example.com",
      status: "active",
      progress: 72,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Olivia Anderson",
      email: "olivia.a@example.com",
      status: "inactive",
      progress: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Noah Thomas",
      email: "noah.t@example.com",
      status: "active",
      progress: 60,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "3": [
    { id: 10, 
      name: "Isabella Jackson", 
      email: "isabella.j@example.com", 
      status: "active", 
      progress: 55, 
      avatar: "/placeholder.svg?height=40&width=40" 
    },
    { 
      id: 11,   
      name: "Adam ngazzou", 
      email: "adam@example.com", 
      status: "active", 
      progress: 55, 
      avatar: "/placeholder.svg?height=40&width=40" 
    },
    { id: 12, 
      name: "Ethan White", 
      email: "ethan.w@example.com", 
      status: "active", 
      progress: 40, 
      avatar: "/placeholder.svg?height=40&width=40" },
    { id: 13, 
      name: "Mia Harris", 
      email: "mia.h@example.com", 
      status: "active", 
      progress: 67, 
      avatar: "/placeholder.svg?height=40&width=40" },
  ],
  "4": [
    {
      id: 14,
      name: "Charlotte Clark",
      email: "charlotte.c@example.com",
      status: "active",
      progress: 82,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 15,
      name: "Liam Lewis",
      email: "liam.l@example.com",
      status: "inactive",
      progress: 30,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 16,
      name: "Amelia Walker",
      email: "amelia.w@example.com",
      status: "active",
      progress: 75,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 17,
      name: "Benjamin Hall",
      email: "benjamin.h@example.com",
      status: "active",
      progress: 50,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 18,
      name: "Harper Young",
      email: "harper.y@example.com",
      status: "active",
      progress: 95,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
}

export default function CourseStudentsPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [searchQuery, setSearchQuery] = useState("")

  const course = courses.find((c) => c.id === courseId)
  const students = studentsByCourseMock[courseId] || []

  const filteredStudents = students.filter(
    (student: { name: string; email: string }) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button asChild className="mt-4">
          <Link href="/teacher">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teacher Dashboard
          </Link>
        </Button>
      </div>
    )
  }

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
            <Link href="/student/classes" className="text-sm font-medium transition-colors hover:text-primary">
              My Classes
            </Link>
            <Link href="/student/my-teachers" className="text-sm font-medium text-primary">
              My Teachers
            </Link>
            <Link href="/teacher" className="text-sm font-medium transition-colors hover:text-primary">
              Teacher
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/teacher">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                <p className="text-muted-foreground">Students enrolled in this course</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {students.length} Students
                </Badge>
                <Badge variant={course.status === "active" ? "default" : "secondary"} className="text-sm">
                  {course.status === "active" ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="w-full md:w-[300px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student: { id: number; name: string; email: string; status: string; progress: number; avatar: string }) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{student.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {student.status === "active" ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">Active</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-red-500">Inactive</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
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