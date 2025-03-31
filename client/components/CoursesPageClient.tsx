"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default function CoursesPageClient({ courses1 }: { courses1: any }) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredCourses =
    activeTab === "all"
      ? courses1.data
      : activeTab === "active"
      ? courses1.data.filter((course : any) => course.progress > 0 && course.progress < 100)
      : courses1.data.filter((course : any) => course.progress === 100)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
              <p className="text-muted-foreground">
                Manage and track your enrolled courses
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="active">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <CourseGrid courses={courses1.data} />
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <CourseGrid courses={filteredCourses} />
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <CourseGrid courses={filteredCourses} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function CourseGrid({ courses }: { courses: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Instructor: {course.instructor_name}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="mr-1 h-4 w-4" />
            {course.lessons_count} lessons
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
      <Link href={`/student/course/${course.id}`} >
        <Button className="w-full">
            {course.progress === 100 ? "View Certificate" : "Continue Learning"}
        </Button>
      </Link>

      </CardFooter>
    </Card>
  )
}
