"use client"

import Link from "next/link"
import { BookOpen, Mail, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for teachers
const teachersData = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@edulearn.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    courses: [
      { id: 1, title: "Advanced JavaScript Programming" },
      { id: 4, title: "Full Stack Web Development" },
    ],
    bio: "Ph.D. in Computer Science with 10+ years of industry experience. Specializes in web development and JavaScript frameworks.",
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    email: "sarah.johnson@edulearn.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=100&width=100",
    courses: [{ id: 2, title: "React for Beginners" }],
    bio: "Former tech lead at a major tech company. Expert in React and modern frontend development practices.",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@edulearn.com",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=100&width=100",
    courses: [{ id: 3, title: "Node.js Backend Development" }],
    bio: "Full-stack developer with a passion for teaching. Specializes in Node.js and backend architecture.",
  },
]

export default function MyTeachersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Teachers</h1>
              <p className="text-muted-foreground">Connect with the instructors of your enrolled courses</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teachersData.map((teacher) => (
                <Card key={teacher.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{teacher.name}</CardTitle>
                        <CardDescription>Instructor</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{teacher.bio}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Contact Information</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Courses</h4>
                      <ul className="space-y-1">
                        {teacher.courses.map((course) => (
                          <li key={course.id} className="text-sm">
                            <Link href={`/courses`} className="flex items-center gap-1 text-primary hover:underline">
                              <BookOpen className="h-3 w-3" />
                              {course.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                  <Link href={`/student/teacher/${teacher.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

