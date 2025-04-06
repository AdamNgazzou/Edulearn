"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Users, FileText, Search, Signal  , Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Course{
    id: string
    title: string
    description: string
    duration: string,
    enrolled_students: number
    is_published: string
    lesson_count: number
    status: string
    image: string
    level: string
}
export default function TeacherCoursesPage({coursesData} : {coursesData: any}) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = coursesData
    .filter((course : Course) => activeTab === "all" || course.is_published === activeTab)
    .filter((course : Course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
          <div className="flex justify-end">
              <Button asChild className="text-sm px-6 py-2 ">
                <Link href="courses/create">Create Course</Link>
              </Button>
            </div>
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
                <TabsTrigger value="active">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course : Course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course : Course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="draft" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredCourses.map((course : Course) => (
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

function TeacherCourseCard({ course } : any ) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={course.image_url || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute right-2 top-2">
          <Badge variant={course.is_published === "active" ? "default" : "secondary"}>
            {course.is_published === "active" ? "Published" : "Draft"}
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
            <span>{course.enrolled_students} students</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.lesson_count} lessons</span>
          </div>
          <div className="flex items-center text-sm">
            <Signal   className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.level}</span>
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