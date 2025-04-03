"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  BookOpen,
  ArrowLeft,
  FileText,
  Video,
  Download,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Play,
  ChevronRight,
  Bell,
  ExternalLink,
  Star,
  BookMarked,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// YouTube Player Component
const YouTubePlayer = ({ videoUrl }: { videoUrl: string }) => {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    )
  }

  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

// Mock course data
const coursesData = {
  "1": {
    id: "1",
    title: "Introduction to Web Development",
    instructor: "Dr. John Smith",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    instructorBio:
      "Ph.D. in Computer Science with 10+ years of industry experience. Specializes in web development and JavaScript frameworks.",
    progress: 75,
    image: "/placeholder.svg?height=300&width=800",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and basic JavaScript. This course is designed for beginners with no prior experience in web development.",
    rating: 4.8,
    reviews: 245,
    students: 1250,
    lastUpdated: "October 2024",
    duration: "8 weeks",
    level: "Beginner",
    prerequisites: ["Basic computer skills", "No prior coding experience required"],
    learningOutcomes: [
      "Build responsive websites using HTML and CSS",
      "Implement interactive features with JavaScript",
      "Understand web development best practices",
      "Deploy websites to a hosting service",
    ],
    modules: [
      {
        id: "m1",
        title: "Getting Started with HTML",
        description: "Learn the basics of HTML and document structure",
        progress: 100,
        lessons: [
          {
            id: "l1",
            title: "Introduction to HTML",
            type: "video",
            duration: "15 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l2",
            title: "HTML Document Structure",
            type: "video",
            duration: "20 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l3",
            title: "HTML Elements and Attributes",
            type: "video",
            duration: "25 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l4",
            title: "HTML Practice Exercise",
            type: "assignment",
            duration: "45 min",
            completed: true,
          },
        ],
      },
      {
        id: "m2",
        title: "CSS Fundamentals",
        description: "Learn how to style web pages with CSS",
        progress: 100,
        lessons: [
          {
            id: "l5",
            title: "Introduction to CSS",
            type: "video",
            duration: "18 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l6",
            title: "CSS Selectors",
            type: "video",
            duration: "22 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l7",
            title: "CSS Box Model",
            type: "video",
            duration: "20 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l8",
            title: "CSS Styling Exercise",
            type: "assignment",
            duration: "60 min",
            completed: true,
          },
        ],
      },
      {
        id: "m3",
        title: "CSS Layout and Positioning",
        description: "Learn advanced CSS layout techniques",
        progress: 75,
        lessons: [
          {
            id: "l9",
            title: "CSS Flexbox",
            type: "video",
            duration: "25 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l10",
            title: "CSS Grid",
            type: "video",
            duration: "30 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l11",
            title: "Responsive Design",
            type: "video",
            duration: "28 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l12",
            title: "CSS Layout Project",
            type: "assignment",
            duration: "120 min",
            completed: false,
            dueDate: "Oct 22, 2024",
          },
        ],
      },
      {
        id: "m4",
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming",
        progress: 0,
        lessons: [
          {
            id: "l13",
            title: "JavaScript Basics",
            type: "video",
            duration: "30 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l14",
            title: "JavaScript Variables and Data Types",
            type: "video",
            duration: "25 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l15",
            title: "JavaScript Functions",
            type: "video",
            duration: "35 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l16",
            title: "DOM Manipulation",
            type: "video",
            duration: "40 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l17",
            title: "JavaScript Exercise",
            type: "assignment",
            duration: "90 min",
            completed: false,
          },
        ],
      },
    ],
    resources: [
      {
        id: "r1",
        title: "HTML Cheat Sheet",
        type: "pdf",
        size: "1.2 MB",
      },
      {
        id: "r2",
        title: "CSS Reference Guide",
        type: "pdf",
        size: "2.5 MB",
      },
      {
        id: "r3",
        title: "Web Development Tools",
        type: "link",
        url: "https://example.com/tools",
      },
      {
        id: "r4",
        title: "Course Code Repository",
        type: "github",
        url: "https://github.com/example/web-dev-course",
      },
    ],
    announcements: [
      {
        id: "a1",
        title: "Office Hours Schedule Update",
        date: "Oct 10, 2024",
        content:
          "Office hours will now be held on Tuesdays and Thursdays from 3-5 PM. Please sign up for a slot if you need assistance with your assignments.",
      },
      {
        id: "a2",
        title: "CSS Layout Project Extension",
        date: "Oct 15, 2024",
        content:
          "Due to the complexity of the CSS Layout Project, the deadline has been extended by 3 days. The new due date is October 22, 2024.",
      },
    ],
    discussions: [
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
    ],
  },
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [activeTab, setActiveTab] = useState("content")
  const [currentModuleId, setCurrentModuleId] = useState("m3")
  const [currentLessonId, setCurrentLessonId] = useState("l9")
  const [currentLesson, setCurrentLesson] = useState<{
    id: string
    title: string
    type: string
    duration: string
    completed: boolean
    dueDate?: string
    videoUrl?: string
  } | null>(null)

  const course = coursesData[courseId]

  // Use useEffect to update currentLesson when dependencies change
  useEffect(() => {
    if (course) {
      const module = course.modules.find((m) => m.id === currentModuleId)
      if (module) {
        const lesson = module.lessons.find((l) => l.id === currentLessonId)
        if (lesson) {
          setCurrentLesson({
            ...lesson,
            videoUrl:
              lesson.type === "video"
                ? lesson.videoUrl || "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s"
                : undefined,
          })
        }
      }
    }
  }, [currentModuleId, currentLessonId, course])

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
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  // Find next incomplete lesson
  const findNextLesson = () => {
    let foundCurrentModule = false
    let nextLesson = null
    let nextModule = null

    for (const module of course.modules) {
      if (foundCurrentModule || module.id === currentModuleId) {
        foundCurrentModule = true

        if (module.id === currentModuleId) {
          // Look for the next incomplete lesson in the current module
          const currentLessonIndex = module.lessons.findIndex((lesson) => lesson.id === currentLessonId)
          const nextLessonInModule = module.lessons[currentLessonIndex + 1]

          if (nextLessonInModule) {
            nextLesson = nextLessonInModule
            nextModule = module
            break
          }
        } else {
          // Look for the first lesson in the next module
          if (module.lessons.length > 0) {
            nextLesson = module.lessons[0]
            nextModule = module
            break
          }
        }
      }
    }

    return { nextLesson, nextModule }
  }

  const { nextLesson, nextModule } = findNextLesson()

  // Handle lesson selection
  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId)
    setCurrentLessonId(lessonId)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Course Header */}
        <div className="relative">
          <div className="relative h-[200px] md:h-[300px] w-full">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container relative -mt-20 px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4 bg-background p-6 rounded-lg shadow-sm">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{course.level}</Badge>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{course.students} students</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500" />
                      <span>
                        {course.rating} ({course.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Instructor: {course.instructor}</p>
                    <p className="text-xs text-muted-foreground">Last updated: {course.lastUpdated}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedLessons} of {totalLessons} lessons completed
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Continue Learning</CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    {nextLesson && nextModule ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{nextModule.title}</p>
                        <div className="flex items-start gap-3 rounded-md border p-3">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">
                            {nextLesson.type === "video" ? (
                              <Video className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{nextLesson.title}</p>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{nextLesson.duration}</span>
                            </div>
                            {nextLesson.dueDate && (
                              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>Due: {nextLesson.dueDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                        <p className="mt-2 font-medium">Course completed!</p>
                        <p className="text-sm text-muted-foreground">You've completed all lessons in this course.</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      disabled={!nextLesson}
                      onClick={() => {
                        if (nextLesson && nextModule) {
                          handleLessonSelect(nextModule.id, nextLesson.id)
                        }
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {nextLesson ? "Continue Learning" : "Course Completed"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
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
                        <span>{course.resources.length} downloadable resources</span>
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
          </div>
        </div>

        {/* Course Content */}
        <div className="container px-4 py-8 md:px-6">
          <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="mt-6">
              <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Content</CardTitle>
                      <CardDescription>
                        {totalLessons} lessons • {course.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {course.modules.map((module) => (
                          <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex flex-1 items-center justify-between pr-4">
                                <div>
                                  <h3 className="text-base font-medium">{module.title}</h3>
                                  <p className="text-sm text-muted-foreground">{module.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{module.lessons.length} lessons</Badge>
                                  <div className="flex items-center gap-1">
                                    <Progress value={module.progress} className="h-2 w-16" />
                                    <span className="text-xs">{module.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 pt-2">
                                {module.lessons.map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className={`flex items-center justify-between rounded-md p-2 ${
                                      currentLessonId === lesson.id ? "bg-primary/10" : "hover:bg-muted/50"
                                    } cursor-pointer`}
                                    onClick={() => handleLessonSelect(module.id, lesson.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`rounded-md p-1.5 ${
                                          lesson.completed
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                      >
                                        {lesson.completed ? (
                                          <CheckCircle className="h-4 w-4" />
                                        ) : lesson.type === "video" ? (
                                          <Video className="h-4 w-4" />
                                        ) : (
                                          <FileText className="h-4 w-4" />
                                        )}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">{lesson.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Badge variant="outline" className="text-xs">
                                            {lesson.type === "video" ? "Video" : "Assignment"}
                                          </Badge>
                                          <span>{lesson.duration}</span>
                                          {lesson.dueDate && (
                                            <>
                                              <span>•</span>
                                              <span>Due: {lesson.dueDate}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Play className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>

                  {/* Announcements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Announcements</CardTitle>
                      <CardDescription>Important updates from your instructor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {course.announcements.map((announcement) => (
                          <div key={announcement.id} className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{announcement.title}</h3>
                              <span className="text-xs text-muted-foreground">{announcement.date}</span>
                            </div>
                            <p className="mt-2 text-sm">{announcement.content}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Lesson */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Lesson</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentLesson ? (
                        <div className="space-y-4">
                          {currentLesson.type === "video" && currentLesson.videoUrl ? (
                            <div className="space-y-4">
                              <div className="rounded-lg overflow-hidden aspect-video">
                                <YouTubePlayer videoUrl={currentLesson.videoUrl} />
                              </div>
                              <div>
                                <h3 className="font-medium">{currentLesson.title}</h3>
                                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                  <Badge variant="outline">Video</Badge>
                                  <span>{currentLesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="rounded-lg bg-muted aspect-video flex items-center justify-center">
                                <div className="text-center">
                                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                  <p className="mt-2 text-sm font-medium">View Assignment</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium">{currentLesson.title}</h3>
                                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                  <Badge variant="outline">Assignment</Badge>
                                  <span>{currentLesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm" disabled={!currentLesson.completed}>
                              {currentLesson.completed ? "Completed" : "Mark as Complete"}
                            </Button>
                            <Button
                              size="sm"
                              disabled={!nextLesson}
                              onClick={() => {
                                if (nextLesson && nextModule) {
                                  handleLessonSelect(nextModule.id, nextLesson.id)
                                }
                              }}
                            >
                              Next Lesson
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Select a lesson to view</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{course.description}</p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h3 className="font-medium">What You'll Learn</h3>
                          <ul className="mt-2 space-y-2">
                            {course.learningOutcomes.map((outcome, index) => (
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
                            {course.prerequisites.map((prerequisite, index) => (
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
                          <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                          <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{course.instructor}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{course.instructorBio}</p>
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
                          <dd>{course.level}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Duration</dt>
                          <dd>{course.duration}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Total Lessons</dt>
                          <dd>{totalLessons} lessons</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Students Enrolled</dt>
                          <dd>{course.students}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                          <dd>{course.lastUpdated}</dd>
                        </div>
                      </dl>
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
                  <CardDescription>Downloadable materials and helpful links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-primary/10 p-2 text-primary">
                            {resource.type === "pdf" ? (
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
                        <Button variant="outline" size="sm">
                          {resource.type === "pdf" ? (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </>
                          ) : (
                            <>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit
                            </>
                          )}
                        </Button>
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
                    {course.discussions.map((discussion) => (
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

