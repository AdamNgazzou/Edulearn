"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Edit,
  Save,
  Plus,
  Users,
  FileText,
  Eye,
  Clock,
  Calendar,
  BarChart3,
  Upload,
  Github,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModuleModal } from "@/components/modals/module-modal"
import { LessonModal } from "@/components/modals/lesson-modal"
import { ResourceModal } from "@/components/modals/resource-modal"
import { AnnouncementModal } from "@/components/modals/announcement-modal"
import { toast } from "react-toastify"



// Types for modals
type ModalType = "module" | "lesson" | "resource" | "announcement" | "none"
type EditMode = "add" | "edit"

export default function CourseHeader({courseData}: any) {
  const params = useParams()
  const courseId = params.courseId as string

  // State for course data
  const [course, setCourse] = useState(courseData)
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



  // Handle course edit
  const handleCourseEdit = () => {
    setIsEditing(true)
  }

  const handleCourseSave = async () => {
    setCourse(editedCourse)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/infocourse/${courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title : editedCourse.title,
            description: editedCourse.description,
            category : editedCourse.category, 
            level : editedCourse.level , 
            duration : editedCourse.duration ,
            price : editedCourse.price,
            is_published : editedCourse.is_published,
          }),
        }
      )
      toast.success("Course updated");

    } catch (error) {
      toast.error("Failed to create module.");

    }

    setIsEditing(false)
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

  const handleEditResource = (resourceData: any) => {
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


  // Helper function to get icon based on resource type


  // Get modal data for editing
  const getModuleData = () => {
    if (editMode === "edit" && selectedModuleId) {
      const module = course.modules.find((m) => m.id === selectedModuleId)
      return module
    }
    return null
  }

  const getLessonData = () => {
    if (editMode === "edit" && selectedModuleId && selectedLessonId) {
      const module = course.modules.find((m) => m.id === selectedModuleId)
      if (module) {
        const lesson = module.lessons.find((l) => l.id === selectedLessonId)
        return lesson
      }
    }
    return null
  }

  const getResourceData = () => {
    if (editMode === "edit" && selectedResourceId) {
      const resource = course.resources.find((r) => r.id === selectedResourceId)
      return resource
    }
    return null
  }

  const getAnnouncementData = () => {
    if (editMode === "edit" && selectedAnnouncementId) {
      const announcement = course.announcements.find((a) => a.id === selectedAnnouncementId)
      return announcement
    }
    return null
  }

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
                  <h1 className="text-3xl font-bold tracking-tight">{editedCourse.title}</h1>
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
                  <Image src={editedCourse.image || "/placeholder.svg"} alt={editedCourse.title} fill className="object-cover" />
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
                            <Input
                              id="category"
                              name="category"
                              value={editedCourse.category}
                              onChange={handleCourseChange}
                              placeholder="Enter course category"
                            />
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
                        <Badge variant={editedCourse.is_published ? "default" : "secondary"}>
                          {editedCourse.is_published ? "Published" : "Draft"}
                        </Badge>
                        <Badge variant="outline">{editedCourse.level}</Badge>
                        <Badge variant="outline" className="capitalize">
                          {editedCourse.category.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{editedCourse.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{editedCourse.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{courseData.students} students enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{courseData.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last updated: {new Date(editedCourse.updated_at).toLocaleDateString()}</span>
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
                        <p className="text-3xl font-bold">{courseData.students}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Lessons</p>
                        <p className="text-3xl font-bold">{courseData.lessons}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Modules</p>
                        <p className="text-3xl font-bold">{courseData.modules}</p>
                      </div>
                      <div className="space-y-2 text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Assignements</p>
                        <p className="text-3xl font-bold">{courseData.assignements}</p>
                      </div>
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

          </div>
        </div>
      </main>

      {/* Modals */}
      <ModuleModal
        isOpen={modalType === "module"}
        onClose={closeModal}
        onSubmit={editMode === "add" ? handleAddModule : handleEditModule}
        editMode={editMode}
        initialData={getModuleData() || undefined}
      />

      <LessonModal
        isOpen={modalType === "lesson"}
        onClose={closeModal}
        onSubmit={editMode === "add" ? handleAddLesson : handleEditLesson}
        editMode={editMode}
        initialData={getLessonData() || undefined}
      />

      <ResourceModal
        isOpen={modalType === "resource"}
        onClose={closeModal}
        onSubmit={editMode === "add" ? handleAddResource : handleEditResource}
        editMode={editMode}
        initialData={getResourceData() || undefined}
      />

      <AnnouncementModal
        isOpen={modalType === "announcement"}
        onClose={closeModal}
        onSubmit={editMode === "add" ? handleAddAnnouncement : handleEditAnnouncement}
        editMode={editMode}
        initialData={getAnnouncementData() || undefined}
      />
    </div>
  )
}

