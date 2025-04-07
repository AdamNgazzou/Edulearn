"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AnnouncementModal } from "@/components/modals/announcement-modal"
import { useToast } from "@/hooks/use-toast" // ✅ fixed import

interface AnnouncementActionsProps {
  courseId: string
  showCreateButton?: boolean
}

export default function AnnouncementActions({ courseId, showCreateButton = false }: AnnouncementActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [initialData, setInitialData] = useState<any>(null)

  const { toast } = useToast(); // ✅ use the hook here

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/announcement/${courseId}`, {
        method: editMode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcementData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save announcement");
      }

      toast({
        title: editMode === "add" ? "Announcement added" : "Announcement updated",
        description:
          editMode === "add"
            ? "The announcement has been added to your course"
            : "The announcement has been updated successfully",
      });

      closeModal();
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save announcement",
        variant: "destructive",
      });
    }
  };

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
  );
}
