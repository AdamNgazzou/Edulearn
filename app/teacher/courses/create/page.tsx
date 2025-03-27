"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  ArrowLeft,
  Upload,
  Info,
  Save,
  Plus,
  FileText,
  Video,
  CheckCircle,
  Trash,
  GripVertical,
  Edit,
  LinkIcon,
  Github,
  Calendar,
  Clock,
  ExternalLink,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { AddModuleModal, type ModuleData, type LessonData } from "./add-module-modal"
import { AddLessonModal } from "./add-lesson-modal"
import { AddResourceModal, type ResourceData } from "./add-resource-modal"

export default function CreateCoursePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Form state
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    level: "beginner",
    category: "web-development",
    duration: "",
    lessons: "",
    price: "",
    isPublished: false,
    enrollmentLimit: "",
    prerequisites: "",
    learningOutcomes: "",
    targetAudience: "",
    courseImage: null,
    modules: [] as ModuleData[],
    resources: [] as ResourceData[],
  })

  // Add state for modals
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false)
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false)
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "") }))
  }

  const handleSelectChange = (name, value) => {
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setCourseData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddModule = (moduleData: ModuleData) => {
    setCourseData((prev) => ({
      ...prev,
      modules: [...prev.modules, moduleData],
    }))
    toast({
      title: "Module added",
      description: "The module has been added to your course",
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
    toast({
      title: "Module deleted",
      description: "The module has been removed from your course",
    })
  }

  const handleAddLesson = (lessonData: LessonData) => {
    if (!selectedModuleId) return

    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === selectedModuleId ? { ...module, lessons: [...module.lessons, lessonData] } : module,
      ),
    }))

    toast({
      title: "Lesson added",
      description: "The lesson has been added to the module",
    })
  }

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    }))
  }

  const handleAddResource = (resourceData: ResourceData) => {
    setCourseData((prev) => ({
      ...prev,
      resources: [...prev.resources, resourceData],
    }))

    toast({
      title: "Resource added",
      description: "The resource has been added to your course",
    })
  }

  const handleDeleteResource = (resourceId: string) => {
    setCourseData((prev) => ({
      ...prev,
      resources: prev.resources.filter((resource) => resource.id !== resourceId),
    }))

    toast({
      title: "Resource deleted",
      description: "The resource has been removed from your course",
    })
  }

  const getSelectedModule = () => {
    return courseData.modules.find((module) => module.id === selectedModuleId)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!courseData.title) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success",
        description: "Course created successfully",
      })
      router.push("/teacher/courses")
    }, 1500)
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

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/teacher/courses">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                <p className="text-muted-foreground">
                  <Link href="/teacher/courses" className="hover:underline">
                    My Courses
                  </Link>{" "}
                  &gt; Create New Course
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-[1fr_250px]">
                <div className="space-y-6">
                  <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    {/* Basic Info Tab */}
                    <TabsContent value="basic" className="space-y-6 pt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Course Information</CardTitle>
                          <CardDescription>Provide the basic information about your course</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">
                              Course Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              placeholder="e.g. Advanced JavaScript Programming"
                              value={courseData.title}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Course Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Provide a detailed description of your course"
                              value={courseData.description}
                              onChange={handleChange}
                              rows={5}
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="level">Course Level</Label>
                              <Select
                                value={courseData.level}
                                onValueChange={(value) => handleSelectChange("level", value)}
                              >
                                <SelectTrigger id="level">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select
                                value={courseData.category}
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
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="duration">
                                Duration <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="duration"
                                name="duration"
                                placeholder="e.g. 8 weeks"
                                value={courseData.duration}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="lessons">Number of Lessons</Label>
                              <Input
                                id="lessons"
                                name="lessons"
                                type="text"
                                placeholder="e.g. 12"
                                value={courseData.lessons}
                                onChange={handleNumberChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="courseImage">Course Image</Label>
                            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                                  >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  PNG, JPG, GIF up to 10MB (1280x720px recommended)
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" type="button" asChild>
                            <Link href="/teacher/courses">Cancel</Link>
                          </Button>
                          <Button type="button" onClick={() => setActiveTab("details")}>
                            Continue to Details
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    {/* Details Tab */}
                    <TabsContent value="details" className="space-y-6 pt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Course Details</CardTitle>
                          <CardDescription>Provide additional details about your course</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="prerequisites">Prerequisites</Label>
                            <Textarea
                              id="prerequisites"
                              name="prerequisites"
                              placeholder="What should students know before taking this course?"
                              value={courseData.prerequisites}
                              onChange={handleChange}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
                            <Textarea
                              id="learningOutcomes"
                              name="learningOutcomes"
                              placeholder="What will students learn by the end of this course?"
                              value={courseData.learningOutcomes}
                              onChange={handleChange}
                              rows={3}
                            />
                            <p className="text-xs text-muted-foreground">
                              Tip: List specific skills and knowledge students will gain
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Textarea
                              id="targetAudience"
                              name="targetAudience"
                              placeholder="Who is this course for?"
                              value={courseData.targetAudience}
                              onChange={handleChange}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                              id="price"
                              name="price"
                              type="text"
                              placeholder="e.g. 49.99"
                              value={courseData.price}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9.]/g, "")
                                setCourseData((prev) => ({ ...prev, price: value }))
                              }}
                            />
                            <p className="text-xs text-muted-foreground">Leave empty if the course is free</p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
                            <Input
                              id="enrollmentLimit"
                              name="enrollmentLimit"
                              type="text"
                              placeholder="e.g. 50"
                              value={courseData.enrollmentLimit}
                              onChange={handleNumberChange}
                            />
                            <p className="text-xs text-muted-foreground">Leave empty for unlimited enrollment</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" type="button" onClick={() => setActiveTab("basic")}>
                            Back
                          </Button>
                          <Button type="button" onClick={() => setActiveTab("curriculum")}>
                            Continue to Curriculum
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    {/* Curriculum Tab */}
                    <TabsContent value="curriculum" className="space-y-6 pt-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Course Curriculum</CardTitle>
                            <CardDescription>Outline the structure and content of your course</CardDescription>
                          </div>
                          <Button onClick={() => setIsAddModuleModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Module
                          </Button>
                        </CardHeader>
                        <CardContent>
                          {courseData.modules.length === 0 ? (
                            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                              <div className="text-center">
                                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">No modules added yet</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Start building your course by adding modules and lessons
                                </p>
                                <Button className="mt-4" onClick={() => setIsAddModuleModalOpen(true)}>
                                  Add First Module
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {courseData.modules.map((module) => (
                                <div key={module.id} className="border rounded-md">
                                  <div className="flex items-center justify-between p-4 bg-muted/50">
                                    <div className="flex items-center gap-2">
                                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                                      <div>
                                        <h3 className="font-medium">{module.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                          {module.description}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {!module.isPublished && <Badge variant="outline">Draft</Badge>}
                                      <Button variant="ghost" size="icon" onClick={() => handleDeleteModule(module.id)}>
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="p-4 space-y-2">
                                    {module.lessons.length > 0 ? (
                                      <div className="space-y-2">
                                        {module.lessons.map((lesson) => (
                                          <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                                          >
                                            <div className="flex items-center gap-3">
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
                                                  {lesson.type === "assignment" &&
                                                    lesson.content.assignmentDetails.dueDate && (
                                                      <p className="text-xs text-muted-foreground flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Due:{" "}
                                                        {new Date(
                                                          lesson.content.assignmentDetails.dueDate,
                                                        ).toLocaleDateString()}
                                                      </p>
                                                    )}
                                                </div>
                                              </div>
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                            >
                                              <Trash className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground text-center py-2">
                                        No lessons added yet
                                      </p>
                                    )}

                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full mt-2"
                                      onClick={() => {
                                        setSelectedModuleId(module.id)
                                        setIsAddLessonModalOpen(true)
                                      }}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Lesson
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                            Back
                          </Button>
                          <Button type="button" onClick={() => setActiveTab("resources")}>
                            Continue to Resources
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    {/* Resources Tab */}
                    <TabsContent value="resources" className="space-y-6 pt-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Course Resources</CardTitle>
                            <CardDescription>Add supplementary materials for your students</CardDescription>
                          </div>
                          <Button onClick={() => setIsAddResourceModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Resource
                          </Button>
                        </CardHeader>
                        <CardContent>
                          {courseData.resources.length === 0 ? (
                            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
                              <div className="text-center">
                                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">No resources added yet</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  Add files, links, or other resources to support your course
                                </p>
                                <Button className="mt-4" onClick={() => setIsAddResourceModalOpen(true)}>
                                  Add First Resource
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {courseData.resources.map((resource) => (
                                <div
                                  key={resource.id}
                                  className="flex items-center justify-between p-4 border rounded-md"
                                >
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
                                      onClick={() => handleDeleteResource(resource.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" type="button" onClick={() => setActiveTab("curriculum")}>
                            Back
                          </Button>
                          <Button type="button" onClick={() => setActiveTab("settings")}>
                            Continue to Settings
                          </Button>
                        </CardFooter>
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
                              checked={courseData.isPublished}
                              onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                            />
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label>Course Access</Label>
                            <RadioGroup defaultValue="enrollment" className="space-y-3">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="enrollment" id="enrollment" className="mt-1" />
                                <div>
                                  <Label htmlFor="enrollment" className="font-normal">
                                    Enrollment Required
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    Students must enroll to access course content
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="open" id="open" className="mt-1" />
                                <div>
                                  <Label htmlFor="open" className="font-normal">
                                    Open Access
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    Anyone can view course content without enrolling
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label>Certificate Options</Label>
                            <RadioGroup defaultValue="completion" className="space-y-3">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="completion" id="completion" className="mt-1" />
                                <div>
                                  <Label htmlFor="completion" className="font-normal">
                                    Course Completion
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    Issue certificate when all lessons are completed
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="assessment" id="assessment" className="mt-1" />
                                <div>
                                  <Label htmlFor="assessment" className="font-normal">
                                    Assessment Based
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    Issue certificate when final assessment is passed
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="none" id="none" className="mt-1" />
                                <div>
                                  <Label htmlFor="none" className="font-normal">
                                    No Certificate
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    Do not issue certificates for this course
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" type="button" onClick={() => setActiveTab("resources")}>
                            Back
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <>Creating Course...</>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Create Course
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Creation Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Tips for Success</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Use clear, descriptive titles</li>
                          <li>• Include detailed course descriptions</li>
                          <li>• Break content into manageable modules</li>
                          <li>• Add variety in content types (video, text, quizzes)</li>
                          <li>• Set clear learning objectives</li>
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Required Fields</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Course title</li>
                          <li>• Course duration</li>
                          <li>• At least one module</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                          {courseData.courseImage ? (
                            <img
                              src={URL.createObjectURL(courseData.courseImage) || "/placeholder.svg"}
                              alt="Course preview"
                              className="rounded-md object-cover w-full h-full"
                            />
                          ) : (
                            <Upload className="h-10 w-10 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{courseData.title || "Course Title"}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {courseData.description || "Course description will appear here"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="capitalize">{courseData.level || "Beginner"}</span>
                          <span>{courseData.lessons ? `${courseData.lessons} lessons` : "0 lessons"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <AddModuleModal
        isOpen={isAddModuleModalOpen}
        onClose={() => setIsAddModuleModalOpen(false)}
        onSave={handleAddModule}
      />

      <AddLessonModal
        isOpen={isAddLessonModalOpen}
        onClose={() => setIsAddLessonModalOpen(false)}
        onSave={handleAddLesson}
        moduleTitle={getSelectedModule()?.title || ""}
      />

      <AddResourceModal
        isOpen={isAddResourceModalOpen}
        onClose={() => setIsAddResourceModalOpen(false)}
        onSave={handleAddResource}
      />
    </div>
  )
}

