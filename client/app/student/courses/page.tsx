"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, Clock, User, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for student classes
const studentClasses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. John Smith",
    progress: 75,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lessons: 12,
    completedLessons: 9,
    nextClass: "Monday, 10:00 AM",
    duration: "1.5 hours",
    assignments: [
      { id: 1, title: "HTML Basics Quiz", dueDate: "Oct 15, 2024", status: "completed" },
      { id: 2, title: "CSS Layout Project", dueDate: "Oct 22, 2024", status: "pending" },
    ],
    description: "Learn the fundamentals of web development including HTML, CSS, and basic JavaScript.",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    instructor: "Prof. Sarah Johnson",
    progress: 45,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lessons: 15,
    completedLessons: 7,
    nextClass: "Wednesday, 2:00 PM",
    duration: "2 hours",
    assignments: [
      { id: 3, title: "Promises and Async/Await", dueDate: "Oct 18, 2024", status: "completed" },
      { id: 4, title: "Advanced DOM Manipulation", dueDate: "Oct 25, 2024", status: "pending" },
    ],
    description:
      "Dive deep into advanced JavaScript concepts including closures, prototypes, and modern ES6+ features.",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Brown",
    progress: 100,
    status: "completed",
    image: "/placeholder.svg?height=200&width=300",
    lessons: 10,
    completedLessons: 10,
    nextClass: "Course Completed",
    duration: "N/A",
    assignments: [
      { id: 5, title: "User Persona Creation", dueDate: "Sep 10, 2024", status: "completed" },
      { id: 6, title: "Final UI Design Project", dueDate: "Sep 30, 2024", status: "completed" },
    ],
    description: "Learn the principles of effective UI/UX design and how to create user-centered digital experiences.",
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Emily Chen",
    progress: 100,
    status: "completed",
    image: "/placeholder.svg?height=200&width=300",
    lessons: 14,
    completedLessons: 14,
    nextClass: "Course Completed",
    duration: "N/A",
    assignments: [
      { id: 7, title: "Data Visualization Project", dueDate: "Aug 20, 2024", status: "completed" },
      { id: 8, title: "Machine Learning Basics", dueDate: "Sep 5, 2024", status: "completed" },
    ],
    description: "An introduction to using Python for data analysis, visualization, and basic machine learning.",
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "David Wilson",
    progress: 30,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    lessons: 16,
    completedLessons: 5,
    nextClass: "Thursday, 3:30 PM",
    duration: "2 hours",
    assignments: [
      { id: 9, title: "Basic App Layout", dueDate: "Oct 20, 2024", status: "pending" },
      { id: 10, title: "Navigation Implementation", dueDate: "Nov 1, 2024", status: "not-started" },
    ],
    description: "Learn to build cross-platform mobile applications using React Native and JavaScript.",
  },
]

export default function StudentClassesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClasses = studentClasses
    .filter((course) => activeTab === "all" || course.status === activeTab)
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
                <p className="text-muted-foreground">Track your class schedule, assignments, and progress</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search classes..."
                    className="w-full md:w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="all">All Classes</TabsTrigger>
                <TabsTrigger value="active">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredClasses.map((course) => (
                    <ClassCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredClasses.map((course) => (
                    <ClassCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {filteredClasses.map((course) => (
                    <ClassCard key={course.id} course={course} />
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

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  status: string;
  image: string;
  lessons: number;
  completedLessons: number;
  nextClass: string;
  duration: string;
  assignments: { id: number; title: string; dueDate: string; status: string }[];
  description: string;
}

function ClassCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute right-2 top-2">
          <Badge variant={course.status === "active" ? "default" : "secondary"}>
            {course.status === "active" ? "In Progress" : "Completed"}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Instructor: {course.instructor}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {course.completedLessons} of {course.lessons} lessons completed
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.nextClass}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Upcoming Assignments</h4>
          {course.assignments
            .filter((assignment) => assignment.status !== "completed")
            .slice(0, 2)
            .map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                <span>{assignment.title}</span>
                <span className="text-xs text-muted-foreground">Due: {assignment.dueDate}</span>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          View Class Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

