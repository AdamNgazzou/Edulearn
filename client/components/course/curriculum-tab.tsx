"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Edit, FileText, GripVertical, Plus, Trash, Video, Clock } from "lucide-react"

interface CurriculumTabProps {
  course: any
  expandedModule: string | null
  setExpandedModule: (moduleId: string | null) => void
  openModal: (
    type: "module" | "lesson" | "resource" | "announcement" | "none",
    mode: "add" | "edit",
    moduleId?: string,
    lessonId?: string,
    resourceId?: string,
    announcementId?: string,
  ) => void
  handleDeleteModule: (moduleId: string) => void
  handleDeleteLesson: (moduleId: string, lessonId: string) => void
}

export function CurriculumTab({
  course,
  expandedModule,
  setExpandedModule,
  openModal,
  handleDeleteModule,
  handleDeleteLesson,
}: CurriculumTabProps) {
  return (
    <div className="space-y-6 pt-4">
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
              {course.modules.map((module: any) => (
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
                        <Button variant="outline" size="sm" onClick={() => openModal("module", "edit", module.id)}>
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
                        <p className="text-sm text-muted-foreground text-center py-4">No lessons in this module yet</p>
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
    </div>
  )
}

