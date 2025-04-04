"use client"

import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  BookMarked,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { coursesData } from "@/lib/course-data"
const discussions= [
  {
    id: "d1",
    title: "Help with Flexbox alignment",
    author: "Alex Johnson",
    date: "Oct 14, 2024",
    replies: 5,
    solved: true,
  },
  {
    id: "d2",
    title: "Best practices for responsive design",
    author: "Maria Garcia",
    date: "Oct 12, 2024",
    replies: 8,
    solved: false,
  },
  {
    id: "d3",
    title: "HTML form validation techniques",
    author: "James Wilson",
    date: "Oct 8, 2024",
    replies: 12,
    solved: true,
  },
]
export default function CourseInfoPage({ courseId, courseData }: { courseId: string, courseData : any }) {
  const course = coursesData[courseId]

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button asChild className="mt-4">
          <Link href="/student">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  // Calculate total lessons and completed lessons
  const totalLessons = courseData.lesson_count
  const completedLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Course Header */}

        {/* Course Information */}
        <div className="container px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Course Information</h2>
            <Button variant="outline" asChild>
              <Link href={`/student/courses/${courseId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course Content
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{courseData.description }</p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h3 className="font-medium">What You'll Learn</h3>
                          <ul className="mt-2 space-y-2">
                            {courseData.learningoutcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                                <span className="text-sm">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium">Prerequisites</h3>
                          <ul className="mt-2 space-y-2">
                            {courseData.prerequisites.map((prerequisite, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{prerequisite}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Meet Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={courseData.instructorimage_url} alt={courseData.instructorname} />
                          <AvatarFallback>{courseData.instructorname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{courseData.instructorname}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{courseData.instructorbio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Level</dt>
                          <dd>{courseData.level}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Duration</dt>
                          <dd>{courseData.duration}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Total Lessons</dt>
                          <dd>{totalLessons} lessons</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Students Enrolled</dt>
                          <dd>{courseData.total_students_enrolled}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                          <dd>{courseData.updated_at}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Includes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span>{totalLessons} lessons</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{courseData.file_resource_count} downloadable resources</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span>Discussion forum access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Full lifetime access</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BookMarked className="h-4 w-4 text-muted-foreground" />
                          <span>Certificate of completion</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>Useful materials and helpful links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">
                            {resource.type === "file" ? (
                              <FileText className="h-5 w-5" />
                            ) : resource.type === "github" ? (
                              <BookMarked className="h-5 w-5" />
                            ) : (
                              <ExternalLink className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {resource.type === "pdf" ? `PDF • ${resource.size}` : resource.type}
                            </p>
                          </div>
                        </div>
                        {resource.type === "file" ? (
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        ) : (
                          <Button asChild variant="outline" size="sm">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Discussion Forum</CardTitle>
                    <CardDescription>Ask questions and connect with other students</CardDescription>
                  </div>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Discussion
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{discussion.title}</h3>
                            {discussion.solved && (
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                Solved
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Started by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.date}</span>
                            <span>•</span>
                            <span>{discussion.replies} replies</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Thread
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-4">
                  <p className="text-center text-sm text-muted-foreground w-full">
                    Have a question? Start a new discussion thread to get help from your instructor and peers.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

