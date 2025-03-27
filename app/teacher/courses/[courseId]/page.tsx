"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  BookOpen,
  ArrowLeft,
  Edit,
  Save,
  Plus,
  Trash,
  Users,
  FileText,
  Eye,
  Clock,
  Calendar,
  GripVertical,
  Video,
  CheckCircle,
  BarChart3,
  Upload,
  Download,
  ExternalLink,
  Github,
  LinkIcon,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock course data
const mockCourseData = {
  id: "1",
  title: "Advanced JavaScript Programming",
  description:
    "A comprehensive course covering advanced JavaScript concepts, design patterns, and modern ES6+ features.",
  instructor: "Dr. John Smith",
  instructorAvatar: "/placeholder.svg?height=40&width=40",
  status: "published",
  students: 45,
  lessons: 15,
  duration: "8 weeks",
  level: "Intermediate",
  category: "web-development",
  price: "49.99",
  rating: 4.8,
  reviews: 32,
  image: "/placeholder.svg?height=300&width=500",
  lastUpdated: "2024-10-01",
  enrollmentLimit: "100",
  isPublished: true,
  modules: [
    {
      id: "m1",
      title: "Introduction to Advanced JavaScript",
      description: "Overview of advanced JavaScript concepts and course structure",
      isPublished: true,
      lessons: [
        {
          id: "l1",
          title: "Course Overview",
          type: "video",
          duration: "15 min",
          content: {
            videoUrl: "https://example.com/video1",
          },
        },
        {
          id: "l2",
          title: "JavaScript Fundamentals Recap",
          type: "text",
          duration: "30 min",
          content: {
            textContent: "This lesson reviews key JavaScript fundamentals that will be built upon in this course...",
          },
        },
      ],
    },
    {
      id: "m2",
      title: "Advanced Functions and Closures",
      description: "Deep dive into JavaScript functions, closures, and execution context",
      isPublished: true,
      lessons: [
        {
          id: "l3",
          title: "Higher-Order Functions",
          type: "video",
          duration: "25 min",
          content: {
            videoUrl: "https://example.com/video2",
          },
        },
        {
          id: "l4",
          title: "Understanding Closures",
          type: "video",
          duration: "30 min",
          content: {
            videoUrl: "https://example.com/video3",
          },
        },
        {
          id: "l5",
          title: "Closure Exercises",
          type: "assignment",
          duration: "1 hour",
          content: {
            assignmentDetails: {
              description: "Practice exercises on closures",
              dueDate: new Date("2024-10-15"),
              points: "100",
              instructions: "Complete the following exercises to demonstrate your understanding of closures...",
            },
          },
        },
      ],
    },
    {
      id: "m3",
      title: "Asynchronous JavaScript",
      description: "Working with Promises, async/await, and handling asynchronous operations",
      isPublished: false,
      lessons: [
        {
          id: "l6",
          title: "Introduction to Promises",
          type: "video",
          duration: "35 min",
          content: {
            videoUrl: "https://example.com/video4",
          },
        },
        {
          id: "l7",
          title: "Async/Await Patterns",
          type: "video",
          duration: "40 min",
          content: {
            videoUrl: "https://example.com/video5",
          },
        },
        {
          id: "l8",
          title: "Asynchronous JavaScript Quiz",
          type: "quiz",
          duration: "20 min",
          content: {
            quizQuestions: [
              {
                question: "What is a Promise in JavaScript?",
                options: [
                  "A built-in function",
                  "An object representing eventual completion of an asynchronous operation",
                  "A type of loop",
                  "A data structure",
                ],
                correctAnswer: 1,
              },
            ],
          },
        },
      ],
    },
  ],
  resources: [
    {
      id: "r1",
      title: "JavaScript Cheat Sheet",
      type: "file",
      description: "Quick reference guide for JavaScript syntax and methods",
      content: {
        fileUrl: "/files/js-cheatsheet.pdf",
        fileName: "js-cheatsheet.pdf",
        fileSize: "1.2 MB",
      },
    },
    {
      id: "r2",
      title: "MDN JavaScript Documentation",
      type: "link",
      description: "Official Mozilla Developer Network JavaScript documentation",
      content: {
        linkUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    },
    {
      id: "r3",
      title: "Course Code Repository",
      type: "github",
      description: "GitHub repository with all code examples from the course",
      content: {
        githubUrl: "https://github.com/example/advanced-js-course",
      },
    },
  ],
  enrolledStudents: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      progress: 65,
      joinDate: "2024-09-15",
      lastActive: "2024-10-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      progress: 78,
      joinDate: "2024-09-10",
      lastActive: "2024-10-02",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      progress: 23,
      joinDate: "2024-09-20",
      lastActive: "2024-09-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  announcements: [
    {
      id: "a1",
      title: "Welcome to the course!",
      content: "Welcome to Advanced JavaScript Programming! I'm excited to have you all in this course...",
      date: "2024-09-01",
    },
    {
      id: "a2",
      title: "Assignment deadline extended",
      content: "Due to multiple requests, I've extended the deadline for the Closure Exercises assignment...",
      date: "2024-10-10",
    },
  ],
}

// Types for modals
type ModalType = "module" | "lesson" | "resource" | "announcement" | "none"
type EditMode = "add" | "edit"

export default function CourseManagementPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  // State for course data
  const [course, setCourse] = useState(mockCourseData)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  // State for modals
  const [modalType, setModalType] = useState<ModalType>("none")
  const [editMode, setEditMode] = useState<EditMode>("add")
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null)
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null)

  // Temporary edit states
  const [editedCourse, setEditedCourse] = useState(course)

  // Fetch course data
  useEffect(() => {
    // In a real app, this would fetch the course data from an API
    // For now, we'll use the mock data
    setCourse(mockCourseData)
    setEditedCourse(mockCourseData)
  }, [courseId])

  // Handle course edit
  const handleCourseEdit = () => {
    setIsEditing(true)
  }

  const handleCourseSave = () => {
    setCourse(editedCourse)
    setIsEditing(false)
    toast({
      title: "Course updated",
      description: "Your changes have been saved successfully",
    })
  }

  const handleCourseCancel = () => {
    setEditedCourse(course)
    setIsEditing(false)
  }

  const handleCourseChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setEditedCourse((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedCourse((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditedCourse((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // Modal handlers
  const openModal = (
    type: ModalType,
    mode: EditMode,
    moduleId?: string,
    lessonId?: string,
    resourceId?: string,
    announcementId?: string,
  ) => {
    setModalType(type)
    setEditMode(mode)
    if (moduleId) setSelectedModuleId(moduleId)
    if (lessonId) setSelectedLessonId(lessonId)
    if (resourceId) setSelectedResourceId(resourceId)
    if (announcementId) setSelectedAnnouncementId(announcementId)
  }

  const closeModal = () => {
    setModalType("none")
    setSelectedModuleId(null)
    setSelectedLessonId(null)
    setSelectedResourceId(null)
    setSelectedAnnouncementId(null)
  }

  // Module handlers
  const handleAddModule = (moduleData: any) => {
    const newModule = {
      ...moduleData,
      id: `m${Date.now()}`,
      lessons: [],
    }

    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }))

    closeModal()
    toast({
      title: "Module added",
      description: "The module has been added to your course",
    })
  }

  const handleEditModule = (moduleData: any) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === selectedModuleId ? { ...module, ...moduleData } : module)),
    }))

    closeModal()
    toast({
      title: "Module updated",
      description: "The module has been updated successfully",
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    if (confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.filter((module) => module.id !== moduleId),
      }))

      toast({
        title: "Module deleted",
        description: "The module has been removed from your course",
      })
    }
  }

  // Lesson handlers
  const handleAddLesson = (lessonData: any) => {
    const newLesson = {
      ...lessonData,
      id: `l${Date.now()}`,
    }

    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === selectedModuleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    }))

    closeModal()
    toast({
      title: "Lesson added",
      description: "The lesson has been added to the module",
    })
  }

  const handleEditLesson = (lessonData: any) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === selectedLessonId ? { ...lesson, ...lessonData } : lesson,
              ),
            }
          : module,
      ),
    }))

    closeModal()
    toast({
      title: "Lesson updated",
      description: "The lesson has been updated successfully",
    })
  }

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      setCourse((prev : any) => ({
        ...prev,
        modules: prev.modules.map((module: { id: string; lessons: any[] }) =>
          module.id === moduleId
            ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
            : module,
        ),
      }))

      toast({
        title: "Lesson deleted",
        description: "The lesson has been removed from the module",
      })
    }
  }

  // Resource handlers
  const handleAddResource = (resourceData: any) => {
    const newResource = {
      ...resourceData,
      id: `r${Date.now()}`,
    }

    setCourse((prev) => ({
      ...prev,
      resources: [...prev.resources, newResource],
    }))

    closeModal()
    toast({
      title: "Resource added",
      description: "The resource has been added to your course",
    })
  }

  const handleEditResource = (resourceData : any) => {
    setCourse((prev) => ({
      ...prev,
      resources: prev.resources.map((resource) =>
        resource.id === selectedResourceId ? { ...resource, ...resourceData } : resource,
      ),
    }))

    closeModal()
    toast({
      title: "Resource updated",
      description: "The resource has been updated successfully",
    })
  }

  const handleDeleteResource = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
      setCourse((prev) => ({
        ...prev,
        resources: prev.resources.filter((resource) => resource.id !== resourceId),
      }))

      toast({
        title: "Resource deleted",
        description: "The resource has been removed from your course",
      })
    }
  }

  // Announcement handlers
  const handleAddAnnouncement = (announcementData: any) => {
    const newAnnouncement = {
      ...announcementData,
      id: `a${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }

    setCourse((prev) => ({
      ...prev,
      announcements: [...prev.announcements, newAnnouncement],
    }))

    closeModal()
    toast({
      title: "Announcement added",
      description: "The announcement has been added to your course",
    })
  }

  const handleEditAnnouncement = (announcementData: any) => {
    setCourse((prev) => ({
      ...prev,
      announcements: prev.announcements.map((announcement) =>
        announcement.id === selectedAnnouncementId ? { ...announcement, ...announcementData } : announcement,
      ),
    }))

    closeModal()
    toast({
      title: "Announcement updated",
      description: "The announcement has been updated successfully",
    })
  }

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) {
      setCourse((prev) => ({
        ...prev,
        announcements: prev.announcements.filter((announcement) => announcement.id !== announcementId),
      }))

      toast({
        title: "Announcement deleted",
        description: "The announcement has been removed from your course",
      })
    }
  }

  // Helper function to get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "file":
        return <FileText className="h-4 w-4" />
      case "link":
        return <LinkIcon className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Calculate course statistics
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completedModules = course.modules.filter((module) => module.isPublished).length
  const averageProgress =
    course.enrolledStudents.length > 0
      ? Math.round(
          course.enrolledStudents.reduce((sum, student) => sum + student.progress, 0) / course.enrolledStudents.length,
        )
      : 0

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between gap-4">
  <div className="flex items-center gap-4">
    <Button variant="outline" size="icon" asChild>
      <Link href="/teacher/courses">
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </Button>
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
      <p className="text-muted-foreground">
        <Link href="/teacher/courses" className="hover:underline">
          My Courses
        </Link>{" "}
        &gt; Course Management
      </p>
    </div>
  </div>
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" asChild>
      <Link href={`/courses/${courseId}`} target="_blank">
        <Eye className="mr-2 h-4 w-4" />
        Preview
      </Link>
    </Button>
    {!isEditing ? (
      <Button size="sm" onClick={handleCourseEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Edit Course
      </Button>
    ) : (
      <>
        <Button variant="outline" size="sm" onClick={handleCourseCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleCourseSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </>
    )}
  </div>
</div>

            {/* Course Header */}
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="relative rounded-lg overflow-hidden border">
                <div className="relative h-[200px] w-full">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button variant="secondary">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input id="title" name="title" value={editedCourse.title} onChange={handleCourseChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={editedCourse.description}
                          onChange={handleCourseChange}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="level">Level</Label>
                          <Select
                            value={editedCourse.level}
                            onValueChange={(value) => handleSelectChange("level", value)}
                          >
                            <SelectTrigger id="level">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={editedCourse.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="web-development">Web Development</SelectItem>
                              <SelectItem value="programming">Programming</SelectItem>
                              <SelectItem value="data-science">Data Science</SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            name="duration"
                            value={editedCourse.duration}
                            onChange={handleCourseChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input id="price" name="price" value={editedCourse.price} onChange={handleCourseChange} />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isPublished"
                          checked={editedCourse.isPublished}
                          onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                        />
                        <Label htmlFor="isPublished">Published</Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={course.isPublished ? "default" : "secondary"}>
                          {course.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {course.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students} students enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{totalLessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Enrolled Students</p>
                        <p className="text-3xl font-bold">{course.students}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Lessons</p>
                        <p className="text-3xl font-bold">{totalLessons}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Modules</p>
                        <p className="text-3xl font-bold">{course.modules.length}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg. Progress</p>
                        <p className="text-3xl font-bold">{averageProgress}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Course Completion</span>
                        <span className="text-sm font-medium">
                          {completedModules}/{course.modules.length} modules
                        </span>
                      </div>
                      <Progress value={(completedModules / course.modules.length) * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/teacher/students/${courseId}`}>
                          <Users className="mr-2 h-4 w-4" />
                          View Students
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/teacher/analytics/${courseId}`}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start" onClick={() => openModal("module", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Module
                    </Button>
                    <Button className="w-full justify-start" onClick={() => openModal("resource", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Resource
                    </Button>
                    <Button className="w-full justify-start" onClick={() => openModal("announcement", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Post Announcement
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/courses/${courseId}`} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview Course
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 pt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Course Announcements</CardTitle>
                      <CardDescription>Communicate important information to your students</CardDescription>
                    </div>
                    <Button onClick={() => openModal("announcement", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Announcement
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {course.announcements.length === 0 ? (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                        <div className="text-center">
                          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No announcements yet</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Create announcements to keep your students informed
                          </p>
                          <Button className="mt-4" onClick={() => openModal("announcement", "add")}>
                            Create Announcement
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {course.announcements.map((announcement) => (
                          <div key={announcement.id} className="border rounded-md p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{announcement.title}</h3>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                  {new Date(announcement.date).toLocaleDateString()}
                                </p>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() =>
                                        openModal("announcement", "edit", null, null, null, announcement.id)
                                      }
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="mt-2 text-sm">{announcement.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                    <CardDescription>Summary of your course structure and content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Modules</h3>
                          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                            <span className="text-2xl font-bold">{course.modules.length}</span>
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Lessons</h3>
                          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                            <span className="text-2xl font-bold">{totalLessons}</span>
                            <Video className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Resources</h3>
                          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                            <span className="text-2xl font-bold">{course.resources.length}</span>
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Module Completion</h3>
                        <div className="space-y-4">
                          {course.modules.map((module) => (
                            <div key={module.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{module.title}</span>
                                <Badge variant={module.isPublished ? "default" : "secondary"}>
                                  {module.isPublished ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <Progress value={module.isPublished ? 100 : 0} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-6 pt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Course Curriculum</CardTitle>
                      <CardDescription>Manage your course modules and lessons</CardDescription>
                    </div>
                    <Button onClick={() => openModal("module", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {course.modules.length === 0 ? (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No modules yet</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Start building your course by adding modules and lessons
                          </p>
                          <Button className="mt-4" onClick={() => openModal("module", "add")}>
                            Add First Module
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Accordion
                        type="single"
                        collapsible
                        value={expandedModule}
                        onValueChange={setExpandedModule}
                        className="w-full"
                      >
                        {course.modules.map((module) => (
                          <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex flex-1 items-center justify-between pr-4">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                                  <div>
                                    <h3 className="text-base font-medium text-left">{module.title}</h3>
                                    <p className="text-sm text-muted-foreground text-left">{module.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={module.isPublished ? "default" : "secondary"}>
                                    {module.isPublished ? "Published" : "Draft"}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">{module.lessons.length} lessons</span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-6 space-y-4">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openModal("module", "edit", module.id)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Module
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDeleteModule(module.id)}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Module
                                  </Button>
                                </div>

                                {module.lessons.length > 0 ? (
                                  <div className="space-y-2">
                                    {module.lessons.map((lesson) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center justify-between p-3 rounded-md border"
                                      >
                                        <div className="flex items-center gap-3">
                                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                          {lesson.type === "video" && (
                                            <Video className="h-4 w-4 text-muted-foreground" />
                                          )}
                                          {lesson.type === "text" && (
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                          )}
                                          {lesson.type === "quiz" && (
                                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                          )}
                                          {lesson.type === "assignment" && (
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                          )}
                                          <div>
                                            <p className="text-sm font-medium">{lesson.title}</p>
                                            <div className="flex items-center gap-2">
                                              <Badge variant="outline" className="text-xs">
                                                {lesson.type}
                                              </Badge>
                                              {lesson.duration && (
                                                <p className="text-xs text-muted-foreground flex items-center">
                                                  <Clock className="h-3 w-3 mr-1" />
                                                  {lesson.duration}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openModal("lesson", "edit", module.id, lesson.id)}
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                          >
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground text-center py-4">
                                    No lessons in this module yet
                                  </p>
                                )}

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-2"
                                  onClick={() => openModal("lesson", "add", module.id)}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Lesson
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-6 pt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Course Resources</CardTitle>
                      <CardDescription>Manage supplementary materials for your students</CardDescription>
                    </div>
                    <Button onClick={() => openModal("resource", "add")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Resource
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {course.resources.length === 0 ? (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No resources yet</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Add files, links, or other resources to support your course
                          </p>
                          <Button className="mt-4" onClick={() => openModal("resource", "add")}>
                            Add First Resource
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {course.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-4 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div>
                                <h3 className="font-medium">{resource.title}</h3>
                                <p className="text-sm text-muted-foreground">{resource.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{resource.type}</Badge>
                              {resource.type === "link" && (
                                <Button variant="ghost" size="icon" asChild>
                                  <a href={resource.content.linkUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {resource.type === "file" && (
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openModal("resource", "edit", null, null, resource.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteResource(resource.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-6 pt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Enrolled Students</CardTitle>
                      <CardDescription>Manage and track student progress</CardDescription>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/teacher/students/${courseId}`}>
                        <Users className="mr-2 h-4 w-4" />
                        View All Students
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {course.enrolledStudents.length === 0 ? (
                      <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                        <div className="text-center">
                          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No students enrolled yet</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Students will appear here once they enroll in your course
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {course.enrolledStudents.map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-4 border rounded-md">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{student.name}</h3>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">Progress</p>
                                <div className="flex items-center gap-2">
                                  <Progress value={student.progress} className="h-2 w-24" />
                                  <span className="text-sm">{student.progress}%</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/teacher/students/${courseId}/${student.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Settings</CardTitle>
                    <CardDescription>Configure additional settings for your course</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="isPublished">Publish Course</Label>
                        <p className="text-sm text-muted-foreground">Make this course visible to students</p>
                      </div>
                      <Switch
                        id="isPublished"
                        checked={isEditing ? editedCourse.isPublished : course.isPublished}
                        onCheckedChange={(checked) => {
                          if (isEditing) {
                            handleSwitchChange("isPublished", checked)
                          } else {
                            setCourse((prev) => ({ ...prev, isPublished: checked }))
                            toast({
                              title: checked ? "Course published" : "Course unpublished",
                              description: checked
                                ? "Your course is now visible to students"
                                : "Your course is now hidden from students",
                            })
                          }
                        }}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
                      <Input
                        id="enrollmentLimit"
                        name="enrollmentLimit"
                        value={isEditing ? editedCourse.enrollmentLimit : course.enrollmentLimit}
                        onChange={isEditing ? handleCourseChange : undefined}
                        disabled={!isEditing}
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum number of students who can enroll. Leave empty for unlimited enrollment.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Danger Zone</h3>
                      <div className="rounded-md border border-destructive/50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-destructive">Delete Course</h4>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete this course and all its content
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (
                                confirm("Are you sure you want to delete this course? This action cannot be undone.")
                              ) {
                                toast({
                                  title: "Course deleted",
                                  description: "The course has been permanently deleted",
                                })
                                router.push("/teacher/courses")
                              }
                            }}
                          >
                            Delete Course
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Modals would be implemented here */}
      {/* These would include modals for adding/editing modules, lessons, resources, and announcements */}
    </div>
  )
}

