"use client";

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
interface Profile {
    id: number
    name: string
    email: string
    phone: string
    location: string
    image_url: string
    bio: string
    program: string
    enrollmentdate: string
    interests: string[]
    achievements: Achievement[]
  }

  interface Achievement {
    title: string
    date: string
    description: string
  }

  interface Course {
    sucess: boolean
    completedCourses : CompletedCourse[]
    inCompletedCourses : IncompletedCourse[]
  }
  interface CompletedCourse{
    id: number
    title: string
    name: string
    grade?: string;

  }
  interface IncompletedCourse{
    id: number
    title: string
    name: string
    progress: number;

  }


export default function StudentProfilePage({ profileData, profileCourses}: { profileData: Profile; profileCourses: Course}) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(profileData)
  const [tempProfile, setTempProfile] = useState(profileData)
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

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Calculate overall progress across all enrolled courses
  let overallProgress =
    profileCourses.inCompletedCourses.reduce((sum, course) => sum + course.progress, 0) / profileCourses.inCompletedCourses.length || 0
    overallProgress += ((100*profileCourses.completedCourses.length) / profileCourses.completedCourses.length)

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
                        <AvatarImage src={profile.image_url || "/placeholder.svg?height=200&width=200"} alt={profile.name} />
                        <AvatarFallback>
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="mt-4">{profileData.name}</CardTitle>
                    <CardDescription>{profile.program}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Enrollment Date : {profileData.enrollmentdate}</span>
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
                      {profileData.interests.map((interest : any , index : number ) => (
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
                              <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
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
                              <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={5} />
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">{profileData.bio}</p>
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
                          {profileCourses.inCompletedCourses.map((course) => (
                            <div key={course.id} className="space-y-2 rounded-lg border p-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{course.title}</h3>
                                <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Instructor: {course.name}</p>
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
                          {profileCourses.completedCourses.map((course,index) => (
                            <div key={`${course.id}-${index}`} className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <p className="text-sm text-muted-foreground">Instructor: {course.name}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Grade:</span>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                                {isNaN(parseFloat(course.grade)) ? course.grade : parseFloat(course.grade).toFixed(0)}
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
                          {profileData.achievements.map((achievement : any, index : number) => (
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


