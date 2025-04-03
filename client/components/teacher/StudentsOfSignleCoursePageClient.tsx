"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowLeft, Search, Mail, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for courses
const courses = [
  {
    id: "10",
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



export default function StudentsOfSignleCoursePageClient({studentsData}: {studentsData: any}) {
    if (!studentsData) {
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
  const [searchQuery, setSearchQuery] = useState("")


  const filteredStudents = studentsData.students.filter(
    (student: { name: string; email: string }) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/teacher/courses">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{studentsData.course_title}</h1>
                <p className="text-muted-foreground">Students enrolled in this course</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {studentsData.students.length} Students
                </Badge>
                <Badge variant={studentsData.is_published === "active" ? "default" : "secondary"} className="text-sm">
                  {studentsData.is_published.status === "active" ? "Published" : "Draft"}
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
                    filteredStudents.map((student: { student_id: number; name: string; email: string; status: string; progress: number; image_url: string }) => (
                      <TableRow key={student.student_id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.image_url} alt={student.name} />
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
    </div>
  )
}