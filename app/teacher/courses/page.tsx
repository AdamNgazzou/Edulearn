"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users, FileText, Search, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data for teacher courses
const teacherCourses = [
  {
    id: "1",
    title: "Advanced JavaScript Programming",
    description:
      "A comprehensive course covering advanced JavaScript concepts, design patterns, and modern ES6+ features.",
    students: 45,
    lessons: 15,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "2 days ago",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    duration: "8 weeks",
  },
  {
    id: "2",
    title: "React for Beginners",
    description:
      "An introduction to React.js, covering components, state management, and building modern user interfaces.",
    students: 78,
    lessons: 12,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "1 week ago",
    schedule: "Tue, Thu - 2:00 PM",
    duration: "6 weeks",
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    description: "Learn to build scalable backend applications with Node.js, Express, and MongoDB.",
    students: 32,
    lessons: 18,
    status: "draft",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "3 days ago",
    schedule: "Mon, Wed - 4:00 PM",
    duration: "10 weeks",
  },
  {
    id: "4",
    title: "Full Stack Web Development",
    description:
      "A comprehensive course covering both frontend and backend development with modern JavaScript frameworks.",
    students: 56,
    lessons: 24,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lastUpdated: "5 days ago",
    schedule: "Tue, Thu, Sat - 1:00 PM",
    duration: "12 weeks",
  },
]

export default function TeacherCoursesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = teacherCourses
    .filter((course) => activeTab === "all" || course.status === activeTab)
    .filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
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
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="draft" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function TeacherCourseCard({ course }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute right-2 top-2">
          <Badge variant={course.status === "active" ? "default" : "secondary"}>
            {course.status === "active" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.schedule}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
      

        <Button className="flex-1" variant="outline">
          <Link href={`/teacher/courses/${course.id}`}>Edit Course</Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/teacher/students/${course.id}`}>View Students</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

