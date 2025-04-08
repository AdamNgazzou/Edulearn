"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Edit, FileText, GripVertical, Plus, Trash, Video, Clock } from "lucide-react"
import { toast } from "react-toastify"
import { ModuleModal } from "@/components/modals/module-modal"
import { LessonModal } from "@/components/modals/lesson-modal"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

interface CurriculumContentProps {
  moduless: any[]
  courseId: string
}

export default function CurriculumContent({ moduless, courseId }: CurriculumContentProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)

  const [modules, setModules] = useState(moduless)

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
      const id = editMode === "add" ? courseId : selectedModuleId
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/module/${id}`,
        {
          method: editMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(moduleData),
        }
      )

    if (response.status === 200) {
      toast.success(editMode === "add" ? "Module created successfully!" : "Module edited successfully!" )
      if (editMode === "add") {
        // Add the new module to the existing modules array
        setModules((prevModules) => [...prevModules, { ...moduleData, id }]);
      } else if (editMode === "edit" && selectedModuleId) {
        // Update the specific module in the state
        setModules((prevModules) => prevModules.map(module =>
          module.id === selectedModuleId ? { ...module, ...moduleData } : module
        ));
      }
    } else {
      toast.error("Failed to create module.")
    }
      window.location.reload();
      closeModuleModal()
      // Reload page or data
  
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.")
    }
  }

  const handleLessonSubmit = async (lessonData: any) => {
    try {
       //const response = await fetch(`/api/courses/${courseId}/modules/${selectedModuleId}/lessons`, {
         //method: editMode === "add" ? "POST" : "PUT",
        //headers: { "Content-Type": "application/json" },
         //body: JSON.stringify(lessonData),
       //})

      // For now, we'll just simulate success
      /*if (response.status === 200) {
        toast.success(editMode === "add" ? "Module created successfully!" : "Module edited successfully!" )
      } else {
        toast.error("Failed to create module.")
      }*/
      closeLessonModal()


        // Reload page or data
    
      } catch (error) {
        console.error(error)
        toast.error("Something went wrong.")
      }
    }

  const handleDeleteModule = async () => {
    if (!moduleToDelete) return
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/module/${moduleToDelete}`, {
        method: "DELETE",
      })
  
      if (response.status === 200) {
        toast.success("Module has been Deleted Successfully!" )
        setModules((prev) => prev.filter((module) => module.id !== moduleToDelete))

      } else {
        toast.error("Failed to delete module.")
      }
  
      setShowDeleteDialog(false)
      setModuleToDelete(null)
  
    } catch (error: any) {
      toast.error("Something went wrong.")
      setShowDeleteDialog(false)
      setModuleToDelete(null)
    }
  }
  

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      try {
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
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Curriculum</CardTitle>
            <CardDescription>Manage your course modules and lessons</CardDescription>
          </div>
          <Button  onClick={() => openModuleModal("add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
      </CardHeader>
      <CardContent>
        {modules.length === 0 ? (
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No modules yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Start building your course by adding modules and lessons
                </p>
                <Button className="mt-4" onClick={() => openModuleModal("add")}>Add First Module</Button>
              </div>
            </div>
          ) : (
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
                  <Badge variant={module.is_published ? "default" : "secondary"}>
                    {module.is_published ? "Published" : "Draft"}
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setModuleToDelete(module.id)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>

                {module.lessons[0].id == null ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No lessons in this module yet</p>
                ) : (
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
      )}
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
<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this module?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently remove the module and all its lessons.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteModule}>
        Yes, Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</CardContent>

    </>
  )
}

