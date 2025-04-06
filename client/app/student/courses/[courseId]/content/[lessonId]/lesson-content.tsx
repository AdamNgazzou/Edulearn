"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Play,
  Settings,
  Share2,
  ThumbsUp,
  Video,
  Volume2,
  CheckCircle,
  Bookmark,
  List,
  X,
  Upload,
  Send,
  Pause,
  Maximize,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select2"

// Find lesson and module by lesson ID
/*const findLessonAndModule = (courseId: string, lessonId: string) => {
  const course = coursesData[courseId]
  if (!course) return { lesson: null, module: null, nextLesson: null, prevLesson: null }

  let foundLesson = null
  let foundModule = null
  let nextLesson = null
  let prevLesson = null

  // Flatten all lessons for easier navigation
  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleName: module.title,
    })),
  )

  const lessonIndex = allLessons.findIndex((lesson) => lesson.id === lessonId)

  if (lessonIndex !== -1) {
    foundLesson = allLessons[lessonIndex]
    foundModule = course.modules.find((m) => m.id === foundLesson?.moduleId)

    if (lessonIndex > 0) {
      prevLesson = allLessons[lessonIndex - 1]
    }

    if (lessonIndex < allLessons.length - 1) {
      nextLesson = allLessons[lessonIndex + 1]
    }
  }

  return {
    lesson: foundLesson,
    module: foundModule,
    nextLesson,
    prevLesson,
  }
}*/

// YouTube Player Component with enhanced controls
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Reading Content Component
const ReadingContent = ({ title, content ,courseData}: { title: string; content: string,courseData:any }) => {
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(true)
  const response = JSON.parse(courseData.text_sections);
  return (
    <div
      className={cn("rounded-lg overflow-hidden transition-colors", darkMode ? "bg-gray-900 text-white" : "bg-white")}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className={cn("text-xl font-bold",  darkMode ? " text-white" : "text-black")}>{courseData.lesson_title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            >
              <span className="text-xs">A-</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            >
              <span className="text-base font-bold">A+</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="dark-mode" className={cn("text-sm",  darkMode ? " text-white" : "text-black")}>
              Dark Mode
            </Label>
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmark
          </Button>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Table of Contents Sidebar */}
        <div
          className={cn(
            "w-full md:w-64 p-4 border-r overflow-y-auto",
            darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
          )}
        >
          <h3 className={cn("font-medium mb-2",  darkMode ? " text-white" : "text-black")}>Table of Contents</h3>
          <ul className="space-y-1">
            {response.map((section : {title:string,content:string},index:number) => (
              <li key={index}>
                <a
                  href={`#${index}`}
                  className={cn(
                    "block py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                    darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-black",
                  )}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[600px]">
        <div
            style={{ fontSize: `${fontSize}px` }}
            className={cn(
              "prose max-w-none",
              darkMode ? "dark:prose-invert text-white" : "text-black"
            )}
          >
            {response.map((section : {title:string,content:string},index:number) => (
              <div key={index} id={index} className="mb-8">
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                {section.content.split("\n\n").map((paragraph:string, idx:number) => {
                  if (paragraph.startsWith("```")) {
                    const code = paragraph.replace(/```css\n|\n```/g, "")
                    return (
                      <pre
                        key={idx}
                        className={cn(
                          "p-4 rounded-md overflow-x-auto my-4",
                          darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                        )}
                      >

                        <code>{code}</code>
                      </pre>
                    )
                  }
                  return (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Assignment Content Component
const AssignmentContent = ({

  courseData
}: {
  courseData:any
}) => {
  const [activeTab, setActiveTab] = useState<"instructions" | "submission">("instructions")
  const [files, setFiles] = useState<File[]>([])
  const [submissionText, setSubmissionText] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = () => {
    console.log("Submitting assignment:", {
      files,
      submissionText,
    })
    // Here you would typically upload the files and text to your backend
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="p-4 bg-muted">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">{courseData.lesson_title}</h2>
            {courseData.due_date && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="mr-1 h-4 w-4" />
                <span>Due: {courseData.due_date}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={activeTab === "instructions" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Badge>
            <Badge
              variant={activeTab === "submission" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTab("submission")}
            >
              Submission
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "instructions" ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{courseData.assignment_description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">instructions</h3>
              <ul className="space-y-2 list-disc pl-5">
                {courseData.instructions.map((req : string, index : number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Resources</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>Assignment Brief.pdf</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>Starter Code.zip</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={() => setActiveTab("submission")}>Submit Assignment</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Upload Files</h3>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Input type="file" multiple className="hidden" id="file-upload" onChange={handleFileChange} />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">Support for ZIP, PDF, HTML, CSS, JS files</p>
                  </div>
                </Label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Selected Files:</h4>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{file.name}</span>
                          <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Comments</h3>
              <Textarea
                placeholder="Add any comments or notes about your submission..."
                className="min-h-[150px]"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setActiveTab("instructions")}>
                Back to Instructions
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit Assignment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LessonContent({courseId,lessonId, studentId, courseData}: {courseId: string ,studentId:string, lessonId: string, courseData:any}) {
  const lessonsCompleted = courseData.module_lessons.filter((l) => l.isCompleted).length;
  const router = useRouter()
  const [loading, setLoading] = useState(false)

    const handleMarkAsComplete = async () => {
      try {
        setLoading(true)
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/lessoncomplete/${studentId}/${lessonId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        const data = await res.json()
  
        if (data.success) {
          // ✅ Refresh the page after successful completion
          window.location.reload()
        } else {
          console.error("Error:", data.message)
        }
      } catch (err) {
        console.error("Failed to mark as complete:", err)
      } finally {
        setLoading(false)
      }
    }
  if (!courseData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Button asChild className="mt-4">
          <Link href={`/student/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
      </div>
    )
  }

  const handleNavigateToLesson = (lessonId: string) => {
    router.push(`/student/courses/${courseId}/content/${lessonId}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Course Navigation Header */}
        <div className="bg-muted py-4 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/student/courses/${courseId}`}>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-lg font-bold">{courseData.course_title}</h1>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{courseData.module_title}</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span>{courseData.lesson_title}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!courseData.prev_lesson_id}
                  onClick={() => courseData.prev_lesson_id && handleNavigateToLesson(courseData.prev_lesson_id)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  size="sm"
                  disabled={!courseData.next_lesson_id }
                  onClick={() => courseData.next_lesson_id && handleNavigateToLesson(courseData.next_lesson_id)}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="container px-4 py-8 md:px-6">
          <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              {/* Render different content based on lesson type */}
              {courseData.lesson_type === "video" && courseData.video_url ? (
              <iframe
                width="100%"
                height="500"
                style={{ borderRadius: '12px' }}
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(courseData.video_url)}`}
                title={courseData.lesson_title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />          
            ) : courseData.lesson_type === "text" ? (
                <ReadingContent title={courseData.lesson_title} courseData={courseData} content="This is a reading lesson content." />
              ) : (
                <AssignmentContent
                  courseData={courseData}
                />
              )}

              {/* Lesson Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>Supplementary materials for this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>Lesson Notes.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>Code Examples.zip</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <span>Additional Reading</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Module Progress */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Module Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{courseData.module_title}</span>
                      <span className="text-sm font-medium">{(lessonsCompleted / courseData.module_lessons.length)*100}%</span>
                    </div>
                    <Progress value={(lessonsCompleted / courseData.module_lessons.length)*100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {lessonsCompleted} of {courseData.module_lessons.length} lessons completed
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {courseData.module_lessons.map((moduleLesson) => (
                      <div
                        key={moduleLesson.lesson_id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer",
                          moduleLesson.lesson_id === courseData.lesson_id ? "bg-primary/10" : "hover:bg-muted/50",
                        )}
                        onClick={() => handleNavigateToLesson(moduleLesson.lesson_id)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "rounded-md p-1.5",
                              moduleLesson.isCompleted
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {moduleLesson.isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : moduleLesson.type === "video" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <span className={cn("text-sm", moduleLesson.lesson_id === courseData.lesson_id ? "font-medium" : "")}>
                            {moduleLesson.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                {!courseData.module_lessons.find((lesson: { lesson_id: string }) => lesson.lesson_id == courseData.lesson_id)?.isCompleted && (
                  <CardFooter>
                    <Button
                      className="w-full"
                      disabled={loading}
                      onClick={handleMarkAsComplete}
                    >
                      {loading ? "Marking..." : "Mark as Complete"}
                    </Button>
                </CardFooter>
                )}
              </Card>

              {/* Course Navigation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Course Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/student/courses/${courseId}`}>
                      <List className="mr-2 h-4 w-4" />
                      Course Content
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/student/courses/${courseId}/info`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Course Information
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/student/courses/${courseId}/info?tab=discussions`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Discussion Forum
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

