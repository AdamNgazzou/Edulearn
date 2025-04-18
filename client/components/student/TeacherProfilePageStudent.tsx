"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin, Briefcase, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

// Mock teacher profile data
const teacherProfile = {
  id: 1,
  name: "Dr. John Smith",
  email: "john.smith@edulearn.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  image_url: "/placeholder.svg?height=200&width=200",
  bio: "Ph.D. in Computer Science with 10+ years of industry experience. Specializes in web development and JavaScript frameworks.",
  department: "Computer Science",
  joinDate: "January 2020",
  expertise: ["JavaScript", "React", "Node.js", "Web Development", "Data Structures"],
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Stanford University",
      year: "2015",
    },
    {
      degree: "M.S. in Computer Science",
      institution: "MIT",
      year: "2010",
    },
    {
      degree: "B.S. in Computer Engineering",
      institution: "UC Berkeley",
      year: "2008",
    },
  ],
  courses: [
    { id: "1", title: "Advanced JavaScript Programming" },
    { id: "4", title: "Full Stack Web Development" },
  ],
}

export default function TeacherProfilePageStudent({ profileData }: { profileData: any }) {
  const [profile, setProfile] = useState(profileData)

  return (
    <div className="flex min-h-screen flex-col">
    
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Teacher Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and credentials</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={profile.image_url} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="mt-4">{profile.name}</CardTitle>
                    <CardDescription>{profile.department}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>

                  </CardContent>           
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((skill, index) => (
                        <div key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Tabs defaultValue="about">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About Me</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">{profile.bio}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="education" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Education</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {profile.education.map((edu, index) => (
                            <div key={index} className="space-y-2">
                              <h3 className="font-medium">{edu.degree}</h3>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground">{edu.year}</p>
                              </div>
                              {index < profile.education.length - 1 && <Separator className="my-4" />}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="courses" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>My Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {profile.courses.map((course) => (
                            <div key={course.id} className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">Course ID: {course.id}</p>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/student/course/${course.id}`}>View Course</Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/teacher/courses">View All Courses</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

