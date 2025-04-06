"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AnnouncementModal } from "@/components/modals/announcement-modal"
import { toast } from "@/hooks/use-toast"

interface AnnouncementActionsProps {
  courseId: string
  showCreateButton?: boolean
}

export default function AnnouncementActions({ courseId, showCreateButton = false }: AnnouncementActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [initialData, setInitialData] = useState<any>(null)

  const openAddModal = () => {
    setEditMode("add")
    setInitialData(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (announcementData: any) => {
    try {
      // In a real app, you would make an API call to add/edit the announcement
      // const response = await fetch(`/api/courses/${courseId}/announcements`, {
      //   method: editMode === "add" ? "POST" : "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(announcementData),
      // })

      // For now, we'll just simulate success
      toast({
        title: editMode === "add" ? "Announcement added" : "Announcement updated",
        description:
          editMode === "add"
            ? "The announcement has been added to your course"
            : "The announcement has been updated successfully",
      })

      closeModal()

      // In a real app, you would refresh the data here
      // This would trigger a re-fetch of the server component
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save announcement",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {showCreateButton ? (
        <Button className="mt-4" onClick={openAddModal}>
          Create Announcement
        </Button>
      ) : (
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      )}

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editMode={editMode}
        initialData={initialData}
      />
    </>
  )
}

