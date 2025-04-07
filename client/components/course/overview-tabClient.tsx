// components/OverviewTabContentClient.tsx
'use client';

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Trash, Edit, MoreHorizontal, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { AnnouncementModal } from "../modals/announcement-modal"
import AnnouncementActions from "@/components/course/announcement-actions"

export default function OverviewTabContentClient({ courseId, AnnouncementData }: { courseId: string, AnnouncementData: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [index, setIndex] = useState(0)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null)

// Make AnnouncementData stateful so we can modify it dynamically
  const [announcementData, setAnnouncementData] = useState(AnnouncementData);

  const openAddModal = (index: number) => {
    setEditMode("edit")
    setIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

   const handleSubmit = async (formData: any) => {
    const isEdit = editMode === "edit";
    const announcementId = announcementData.data[index]?.id;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/announcement/${announcementId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
          }),
        }
      );

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Something went wrong");
      }

      toast.success(isEdit ? "Announcement updated!" : "Announcement added!");
      closeModal();
      
      // Update AnnouncementData without reloading the page
      const updatedData = [...announcementData.data];
      if (isEdit) {
        updatedData[index] = { ...updatedData[index], title: formData.title, content: formData.content };
      } else {
        updatedData.push(resData.announcement);  // Add new announcement at the end
      }
      setAnnouncementData({ data: updatedData });
    } catch (error: any) {
      toast.error(error.message || "Failed to save announcement");
    }
  };

  const handleDelete = async () => {
    if (!announcementToDelete) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/announcement/${announcementToDelete}`,
        {
          method: "DELETE",
        }
      )

      const resData = await response.json()

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Failed to delete the announcement")
      }

      toast.success("Announcement deleted successfully")
      setShowDeleteDialog(false)
      setAnnouncementToDelete(null)
      // Update the AnnouncementData by filtering out the deleted announcement
      AnnouncementData.data = AnnouncementData.data.filter(
      (announcement: any) => announcement.id !== announcementToDelete)    
    } catch (error: any) {
      toast.error(error.message || "Failed to delete announcement")
      setShowDeleteDialog(false)
      setAnnouncementToDelete(null)
    }
  }

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Announcements</CardTitle>
            <CardDescription>Communicate important information to your students</CardDescription>
          </div>
          <AnnouncementActions courseId={courseId} />
        </CardHeader>
        <CardContent>
          {announcementData.data.length === 0 ? (
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No announcements yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create announcements to keep your students informed
                </p>
                <AnnouncementActions courseId={courseId} showCreateButton />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {announcementData.data.map((announcement: any, index: number) => (
                <div key={announcement.id} className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openAddModal(index)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setAnnouncementToDelete(announcement.id)
                              setShowDeleteDialog(true)
                            }}
                          >
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

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editMode={editMode}
        initialData={announcementData.data[index]}
      />
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this announcement?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The announcement will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
