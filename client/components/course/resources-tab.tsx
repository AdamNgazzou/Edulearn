"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, ExternalLink, FileText, Plus, Trash } from "lucide-react"
import type { JSX } from "react"

interface ResourcesTabProps {
  course: any
  openModal: (
    type: "module" | "lesson" | "resource" | "announcement" | "none",
    mode: "add" | "edit",
    moduleId?: string,
    lessonId?: string,
    resourceId?: string,
    announcementId?: string,
  ) => void
  handleDeleteResource: (resourceId: string) => void
  getResourceIcon: (type: string) => JSX.Element
}

export function ResourcesTab({ course, openModal, handleDeleteResource, getResourceIcon }: ResourcesTabProps) {
  return (
    <div className="space-y-6 pt-4">
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
              {course.resources.map((resource: any) => (
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
    </div>
  )
}

