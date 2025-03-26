"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users, FileText, Plus, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for teacher courses
const teacherCourses = [
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

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = teacherCourses
    .filter((course) => activeTab === "all" || course.status === activeTab)
    .filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()))

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
            <Link href="/teacher/students" className="text-sm font-medium transition-colors hover:text-primary">
              My Students
            </Link>
            <Link href="/teacher/profile" className="text-sm font-medium text-primary">
              Profile
            </Link>
          </nav>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Manage your courses and track student progress</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full md:w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="draft" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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

interface Course {
  id: string;
  title: string;
  students: number;
  lessons: number;
  status: string;
  image: string;
  lastUpdated: string;
}

function TeacherCourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <div className="relative h-48 w-full">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute right-2 top-2">
          <Badge variant={course.status === "active" ? "default" : "secondary"}>
            {course.status === "active" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{course.title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Course</DropdownMenuItem>
              <DropdownMenuItem>View Students</DropdownMenuItem>
              <DropdownMenuItem>Add Lesson</DropdownMenuItem>
              <DropdownMenuItem>Delete Course</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>Last updated: {course.lastUpdated}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="mr-1 h-4 w-4" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="mr-1 h-4 w-4" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" variant="outline">
          Manage Content
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/teacher/students/${course.id}`}>View Students</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

