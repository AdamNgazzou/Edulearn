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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { coursesData } from "@/lib/course-data"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select2"

// Find lesson and module by lesson ID
const findLessonAndModule = (courseId: string, lessonId: string) => {
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
}

// YouTube Player Component with enhanced controls
const EnhancedVideoPlayer = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(80)
  const [showNotes, setShowNotes] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showTranscript, setShowTranscript] = useState(false)
  const [captionsEnabled, setCaptionsEnabled] = useState(false)

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

  // Mock transcript data
  const transcriptData = [
    { time: "0:00", text: "Hello and welcome to this lesson on web development." },
    { time: "0:15", text: "Today we'll be covering the fundamentals of HTML and CSS." },
    { time: "0:30", text: "Let's start by understanding what HTML is and how it structures web content." },
    { time: "1:00", text: "HTML stands for HyperText Markup Language." },
    {
      time: "1:15",
      text: "It's the standard markup language for documents designed to be displayed in a web browser.",
    },
    { time: "1:45", text: "HTML elements are represented by tags, written using angle brackets." },
    { time: "2:15", text: "Let's look at some examples of basic HTML tags." },
    { time: "2:45", text: "The <html> tag is the root element of an HTML page." },
    { time: "3:15", text: "The <head> element contains meta information about the document." },
    { time: "3:45", text: "The <body> element contains the visible page content." },
  ]

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black">
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&cc_load_policy=${captionsEnabled ? 1 : 0}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex flex-col gap-2">
            <Progress value={45} className="h-1" />

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="w-20"
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>

                <span className="text-xs">4:25 / 10:30</span>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setCaptionsEnabled(!captionsEnabled)}
                      >
                        <span className="text-xs font-bold">CC</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Captions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setShowTranscript(!showTranscript)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Transcript</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Select
                  value={playbackSpeed.toString()}
                  onValueChange={(value) => setPlaybackSpeed(Number.parseFloat(value))}
                >
                  <SelectTrigger className="h-8 w-16 text-white bg-transparent border-0 hover:bg-white/20">
                    <SelectValue placeholder="Speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{title}</h2>

          <div className="flex items-center gap-4 mt-2">
            <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)}>
              {showNotes ? <X className="mr-2 h-4 w-4" /> : <MessageSquare className="mr-2 h-4 w-4" />}
              {showNotes ? "Hide Notes" : "Take Notes"}
            </Button>

            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmark
            </Button>

            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {showNotes && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Take notes on this video..."
                className="min-h-[150px]"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="flex justify-end">
                <Button size="sm">Save Notes</Button>
              </div>
            </div>
          )}
        </div>

        {showTranscript && (
          <Card className="w-full md:w-80 h-[300px] overflow-y-auto">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Transcript</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-0">
              <div className="space-y-2">
                {transcriptData.map((item, index) => (
                  <div key={index} className="flex gap-2 text-sm">
                    <span className="text-muted-foreground w-10">{item.time}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Reading Content Component
const ReadingContent = ({ title, content }: { title: string; content: string }) => {
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(false)

  // Mock table of contents
  const tableOfContents = [
    { id: "section-1", title: "Introduction" },
    { id: "section-2", title: "Basic Concepts" },
    { id: "section-3", title: "Advanced Techniques" },
    { id: "section-4", title: "Practical Examples" },
    { id: "section-5", title: "Summary" },
  ]

  // Mock content sections
  const contentSections = [
    {
      id: "section-1",
      title: "Introduction",
      content:
        "Welcome to this comprehensive guide on CSS layout techniques. In this reading, we'll explore various methods for positioning elements on a webpage, from basic to advanced approaches. By the end of this lesson, you'll have a solid understanding of how to create complex layouts using CSS.",
    },
    {
      id: "section-2",
      title: "Basic Concepts",
      content:
        "Before diving into complex layouts, it's important to understand the fundamental concepts of CSS positioning. Elements in HTML flow naturally from top to bottom in what's called the 'normal flow.' CSS allows us to modify this flow using various positioning properties.\n\nThe position property is the cornerstone of CSS positioning. It can take several values: static (default), relative, absolute, fixed, and sticky. Each value affects how an element is positioned on the page.\n\nThe display property is another crucial concept. It determines how an element behaves in the document flow. Common values include block, inline, inline-block, flex, and grid.",
    },
    {
      id: "section-3",
      title: "Advanced Techniques",
      content:
        "Now that we understand the basics, let's explore some advanced layout techniques.\n\nFlexbox is a one-dimensional layout method designed for laying out items in rows or columns. It's particularly useful for creating responsive designs that adapt to different screen sizes.\n\nCSS Grid is a two-dimensional layout system that allows for complex grid-based layouts. Unlike Flexbox, Grid enables precise control over both rows and columns simultaneously.\n\nMulti-column layout allows content to flow into multiple columns, similar to newspaper layouts. This can improve readability for long text passages on wide screens.",
    },
    {
      id: "section-4",
      title: "Practical Examples",
      content:
        "Let's look at some practical examples of these techniques in action.\n\nExample 1: Creating a card layout with Flexbox\n```css\n.card-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n\n.card {\n  flex: 1 1 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n}\n```\n\nExample 2: Building a dashboard layout with CSS Grid\n```css\n.dashboard {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  grid-template-rows: auto;\n  gap: 20px;\n}\n\n.widget {\n  padding: 20px;\n  border-radius: 8px;\n  background-color: #f5f5f5;\n}\n```",
    },
    {
      id: "section-5",
      title: "Summary",
      content:
        "In this reading, we've covered various CSS layout techniques, from basic positioning to advanced methods like Flexbox and Grid. We've seen how these techniques can be applied to create responsive, complex layouts for modern web applications.\n\nRemember that the best layout method depends on your specific design requirements. Often, a combination of techniques will yield the best results. Practice implementing these methods in your own projects to gain a deeper understanding of how they work.",
    },
  ]

  return (
    <div
      className={cn("rounded-lg overflow-hidden transition-colors", darkMode ? "bg-gray-900 text-white" : "bg-white")}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
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
            <Label htmlFor="dark-mode" className="text-sm">
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
          <h3 className="font-medium mb-2">Table of Contents</h3>
          <ul className="space-y-1">
            {tableOfContents.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={cn(
                    "block py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
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
          <div style={{ fontSize: `${fontSize}px` }} className="prose max-w-none dark:prose-invert">
            {contentSections.map((section) => (
              <div key={section.id} id={section.id} className="mb-8">
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                {section.content.split("\n\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("```")) {
                    const code = paragraph.replace(/```css\n|\n```/g, "")
                    return (
                      <pre
                        key={idx}
                        className={cn("p-4 rounded-md overflow-x-auto my-4", darkMode ? "bg-gray-800" : "bg-gray-100")}
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
  title,
  dueDate,
  description,
  requirements,
}: {
  title: string
  dueDate?: string
  description: string
  requirements: string[]
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
            <h2 className="text-xl font-bold">{title}</h2>
            {dueDate && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="mr-1 h-4 w-4" />
                <span>Due: {dueDate}</span>
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
              <p className="text-muted-foreground">{description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Requirements</h3>
              <ul className="space-y-2 list-disc pl-5">
                {requirements.map((req, index) => (
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

            <div>
              <h3 className="text-lg font-medium mb-2">Grading Criteria</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Functionality</span>
                  <span className="font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />

                <div className="flex justify-between items-center">
                  <span>Code Quality</span>
                  <span className="font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />

                <div className="flex justify-between items-center">
                  <span>Documentation</span>
                  <span className="font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />

                <div className="flex justify-between items-center">
                  <span>Creativity</span>
                  <span className="font-medium">10%</span>
                </div>
                <Progress value={10} className="h-2" />
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

export default function LessonContent({courseId,lessonId , courseData}: {courseId: string , lessonId: string, courseData:any}) {
  const router = useRouter()
  const course = coursesData[courseId]
  const { lesson, module, nextLesson, prevLesson } = findLessonAndModule(courseId, lessonId)

  if (!course || !lesson || !module) {
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
                  <h1 className="text-lg font-bold">{course.title}</h1>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{module.title}</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span>{lesson.title}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevLesson}
                  onClick={() => prevLesson && handleNavigateToLesson(prevLesson.id)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  size="sm"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && handleNavigateToLesson(nextLesson.id)}
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
              {lesson.type === "video" && lesson.videoUrl ? (
                <EnhancedVideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />
              ) : lesson.type === "reading" ? (
                <ReadingContent title={lesson.title} content="This is a reading lesson content." />
              ) : (
                <AssignmentContent
                  title={lesson.title}
                  dueDate={lesson.dueDate}
                  description="In this assignment, you will create a responsive layout using CSS Flexbox and Grid. You'll implement a dashboard interface that adapts to different screen sizes."
                  requirements={[
                    "Create a responsive navigation bar using Flexbox",
                    "Implement a grid-based dashboard layout with at least 4 widgets",
                    "Ensure the layout works on mobile, tablet, and desktop screen sizes",
                    "Use proper semantic HTML elements",
                    "Include appropriate comments in your code",
                    "Submit both HTML and CSS files",
                  ]}
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
                      <span className="text-sm font-medium">{module.title}</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {module.lessons.filter((l) => l.completed).length} of {module.lessons.length} lessons completed
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {module.lessons.map((moduleLesson) => (
                      <div
                        key={moduleLesson.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer",
                          moduleLesson.id === lesson.id ? "bg-primary/10" : "hover:bg-muted/50",
                        )}
                        onClick={() => handleNavigateToLesson(moduleLesson.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "rounded-md p-1.5",
                              moduleLesson.completed
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {moduleLesson.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : moduleLesson.type === "video" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <span className={cn("text-sm", moduleLesson.id === lesson.id ? "font-medium" : "")}>
                            {moduleLesson.title}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{moduleLesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
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

