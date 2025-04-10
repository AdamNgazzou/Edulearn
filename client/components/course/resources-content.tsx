"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, ExternalLink, FileText, Github, Trash } from "lucide-react"
import type { JSX } from "react"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { ResourceModal } from "@/components/modals/resource-modal"

interface ResourcesContentProps {
  resources: any[]
  courseId: string
}

export default function ResourcesContent({ resources,coursesData, courseId }: ResourcesContentProps & {coursesData:any}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<any>(null)

  const openModal = (mode: "add" | "edit", resourceId?: string) => {
    setEditMode(mode)
    setSelectedResourceId(resourceId || null)

    if (mode === "edit" && resourceId) {
      const resource = coursesData.data.find((r) => r.id === resourceId)
      setInitialData(resource)
    } else {
      setInitialData(null)
    }

    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (resourceData: any) => {
    try {
      // In a real app, you would make an API call to add/edit the resource
      // const response = await fetch(`/api/courses/${courseId}/resources`, {
      //   method: editMode === "add" ? "POST" : "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(resourceData),
      // })

      // For now, we'll just simulate success
      toast({
        title: editMode === "add" ? "Resource added" : "Resource updated",
        description:
          editMode === "add"
            ? "The resource has been added to your course"
            : "The resource has been updated successfully",
      })

      closeModal()

      // In a real app, you would refresh the data here
      // This would trigger a re-fetch of the server component
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resource",
        variant: "destructive",
      })
    }
  }

  const handleDeleteResource = async (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
      try {
        // In a real app, you would make an API call to delete the resource
        // await fetch(`/api/courses/${courseId}/resources/${resourceId}`, {
        //   method: "DELETE",
        // })

        // For now, we'll just simulate success
        toast({
          title: "Resource deleted",
          description: "The resource has been removed from your course",
        })

        // In a real app, you would refresh the data here
        // This would trigger a re-fetch of the server component
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete resource",
          variant: "destructive",
        })
      }
    }
  }

  const getResourceIcon = (type: string): JSX.Element => {
    switch (type) {
      case "file":
        return <FileText className="h-4 w-4" />
      case "link":
        return <ExternalLink className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <>
      <div className="space-y-4">
        {coursesData.data.map((resource: any) => (
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
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {resource.type === "file" && (
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => openModal("edit", resource.id)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteResource(resource.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editMode={editMode}
        initialData={initialData}
      />
    </>
  )
}

