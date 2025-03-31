"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin, GraduationCap, Edit, Save, X, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock student profile data
const studentProfile = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 987-6543",
  location: "Boston, MA",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Computer Science student passionate about web development and artificial intelligence. Looking to expand my knowledge in full-stack development.",
  program: "Bachelor of Science in Computer Science",
  enrollmentDate: "September 2022",
  expectedGraduation: "May 2026",
  interests: ["Web Development", "Machine Learning", "Mobile Apps", "UI/UX Design"],
  achievements: [
    {
      title: "Dean's List",
      date: "Fall 2023",
      description: "Achieved a GPA of 3.8 or higher for the semester",
    },
    {
      title: "Hackathon Winner",
      date: "March 2023",
      description: "First place in the university's annual coding competition",
    },
  ],
  enrolledCourses: [
    { id: 1, title: "Introduction to Web Development", progress: 75, instructor: "Dr. John Smith" },
    { id: 2, title: "Advanced JavaScript Concepts", progress: 45, instructor: "Prof. Sarah Johnson" },
    { id: 5, title: "Mobile App Development with React Native", progress: 30, instructor: "David Wilson" },
  ],
  completedCourses: [
    { id: 3, title: "UI/UX Design Fundamentals", instructor: "Michael Brown", grade: "A" },
    { id: 4, title: "Python for Data Science", instructor: "Emily Chen", grade: "A-" },
  ],
}

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(studentProfile)
  const [tempProfile, setTempProfile] = useState(studentProfile)
  
  const handleEdit = () => {
    setTempProfile(profile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  interface Profile {
    id: number
    name: string
    email: string
    phone: string
    location: string
    avatar: string
    bio: string
    program: string
    enrollmentDate: string
    expectedGraduation: string
    interests: string[]
    achievements: Achievement[]
    enrolledCourses: Course[]
    completedCourses: Course[]
  }

  interface Achievement {
    title: string
    date: string
    description: string
  }

  interface Course {
    id: number
    title: string
    progress?: number
    instructor: string
    grade?: string
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Calculate overall progress across all enrolled courses
  const overallProgress =
    profile.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / profile.enrolledCourses.length

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and track your academic progress</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[300px_1fr]">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="mt-4">{profile.name}</CardTitle>
                    <CardDescription>{profile.program}</CardDescription>
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
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Expected graduation: {profile.expectedGraduation}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!isEditing ? (
                      <Button className="w-full" onClick={handleEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex w-full gap-2">
                        <Button variant="outline" className="flex-1" onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <div key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Course Completion</span>
                        <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {profile.enrolledCourses.length} active courses
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {profile.completedCourses.length} completed courses
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Tabs defaultValue="about">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About Me</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" name="name" value={tempProfile.name} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" name="email" value={tempProfile.email} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" value={tempProfile.phone} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                name="location"
                                value={tempProfile.location}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea id="bio" name="bio" value={tempProfile.bio} onChange={handleChange} rows={5} />
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">{profile.bio}</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="courses" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Enrolled Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {profile.enrolledCourses.map((course) => (
                            <div key={course.id} className="space-y-2 rounded-lg border p-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{course.title}</h3>
                                <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Completed Courses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {profile.completedCourses.map((course) => (
                            <div key={course.id} className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Grade:</span>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                                  {course.grade}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="achievements" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Achievements & Awards</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {profile.achievements.map((achievement, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                <h3 className="font-medium">{achievement.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <p className="text-xs text-muted-foreground">Awarded: {achievement.date}</p>
                              {index < profile.achievements.length - 1 && <Separator className="my-4" />}
                            </div>
                          ))}
                        </div>
                      </CardContent>
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

