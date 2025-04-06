"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Edit, FileText, GripVertical, Plus, Trash, Video, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ModuleModal } from "@/components/modals/module-modal"
import { LessonModal } from "@/components/modals/lesson-modal"

interface CurriculumContentProps {
  modules: any[]
  courseId: string
}

export default function CurriculumContent({ modules, courseId }: CurriculumContentProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<any>(null)

  const openModuleModal = (mode: "add" | "edit", moduleId?: string) => {
    setEditMode(mode)
    setSelectedModuleId(moduleId || null)

    if (mode === "edit" && moduleId) {
      const module = modules.find((m) => m.id === moduleId)
      setInitialData(module)
    } else {
      setInitialData(null)
    }

    setIsModuleModalOpen(true)
  }

  const openLessonModal = (mode: "add" | "edit", moduleId: string, lessonId?: string) => {
    setEditMode(mode)
    setSelectedModuleId(moduleId)
    setSelectedLessonId(lessonId || null)

    if (mode === "edit" && lessonId) {
      const module = modules.find((m) => m.id === moduleId)
      if (module) {
        const lesson = module.lessons.find((l: any) => l.id === lessonId)
        setInitialData(lesson)
      }
    } else {
      setInitialData(null)
    }

    setIsLessonModalOpen(true)
  }

  const closeModuleModal = () => {
    setIsModuleModalOpen(false)
  }

  const closeLessonModal = () => {
    setIsLessonModalOpen(false)
  }

  const handleModuleSubmit = async (moduleData: any) => {
    try {
      // In a real app, you would make an API call to add/edit the module
      // const response = await fetch(`/api/courses/${courseId}/modules`, {
      //   method: editMode === "add" ? "POST" : "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(moduleData),
      // })

      // For now, we'll just simulate success
      toast({
        title: editMode === "add" ? "Module added" : "Module updated",
        description:
          editMode === "add" ? "The module has been added to your course" : "The module has been updated successfully",
      })

      closeModuleModal()

      // In a real app, you would refresh the data here
      // This would trigger a re-fetch of the server component
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save module",
        variant: "destructive",
      })
    }
  }

  const handleLessonSubmit = async (lessonData: any) => {
    try {
      // In a real app, you would make an API call to add/edit the lesson
      // const response = await fetch(`/api/courses/${courseId}/modules/${selectedModuleId}/lessons`, {
      //   method: editMode === "add" ? "POST" : "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(lessonData),
      // })

      // For now, we'll just simulate success
      toast({
        title: editMode === "add" ? "Lesson added" : "Lesson updated",
        description:
          editMode === "add" ? "The lesson has been added to the module" : "The lesson has been updated successfully",
      })

      closeLessonModal()

      // In a real app, you would refresh the data here
      // This would trigger a re-fetch of the server component
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save lesson",
        variant: "destructive",
      })
    }
  }

  const handleDeleteModule = async (moduleId: string) => {
    if (confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
      try {
        // In a real app, you would make an API call to delete the module
        // await fetch(`/api/courses/${courseId}/modules/${moduleId}`, {
        //   method: "DELETE",
        // })

        // For now, we'll just simulate success
        toast({
          title: "Module deleted",
          description: "The module has been removed from your course",
        })

        // In a real app, you would refresh the data here
        // This would trigger a re-fetch of the server component
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete module",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      try {
        // In a real app, you would make an API call to delete the lesson
        // await fetch(`/api/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`, {
        //   method: "DELETE",
        // })

        // For now, we'll just simulate success
        toast({
          title: "Lesson deleted",
          description: "The lesson has been removed from the module",
        })

        // In a real app, you would refresh the data here
        // This would trigger a re-fetch of the server component
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete lesson",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <>
      <Accordion type="single" collapsible value={expandedModule} onValueChange={setExpandedModule} className="w-full">
        {modules.map((module) => (
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
                  <Button variant="outline" size="sm" onClick={() => openModuleModal("edit", module.id)}>
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
                    {module.lessons.map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 rounded-md border">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          {lesson.type === "video" && <Video className="h-4 w-4 text-muted-foreground" />}
                          {lesson.type === "text" && <FileText className="h-4 w-4 text-muted-foreground" />}
                          {lesson.type === "quiz" && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
                          {lesson.type === "assignment" && <FileText className="h-4 w-4 text-muted-foreground" />}
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
                            onClick={() => openLessonModal("edit", module.id, lesson.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteLesson(module.id, lesson.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No lessons in this module yet</p>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => openLessonModal("add", module.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={closeModuleModal}
        onSubmit={handleModuleSubmit}
        editMode={editMode}
        initialData={initialData}
      />

      <LessonModal
        isOpen={isLessonModalOpen}
        onClose={closeLessonModal}
        onSubmit={handleLessonSubmit}
        editMode={editMode}
        initialData={initialData}
      />
    </>
  )
}

