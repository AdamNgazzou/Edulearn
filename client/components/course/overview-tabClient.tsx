"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Edit, FileText, MoreHorizontal, Trash, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AnnouncementActions from "@/components/course/announcement-actions"
import { AnnouncementModal } from "../modals/announcement-modal"
import { useState } from "react"
import { toast } from "react-toastify"

// This is a server component that fetches its own data
export default  function OverviewTabContentClient({ courseId,AnnouncementData }: { courseId: string , AnnouncementData : any}) {
  // Fetch data for this tab specifically
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit">("add")
  const [initialData, setInitialData] = useState<any>(null)
  const [index, setIndex] = useState(0);
  const openAddModal = (index : number) => {
    setEditMode("edit")
    setIndex(index);
    setInitialData(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleSubmit = async (formData: any) => {
    try {
      const isEdit = editMode === "edit";
      const announcementId =  AnnouncementData.data[index]?.id ;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/announcement/${announcementId}`, {
        method:  "PUT" ,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content
        }),
      });
  
      const resData = await response.json();
  
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Something went wrong");
      }
  
      toast({
        title: isEdit ? "Announcement updated" : "Announcement added",
        description: isEdit
          ? "The announcement has been updated successfully"
          : "The announcement has been added to your course",
      });
  
      closeModal();
      window.location.reload(); // Refresh to show updated data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save announcement",
        variant: "destructive",
      });
    }
  };
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
          {AnnouncementData.data.length === 0 ? (
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
              {AnnouncementData.data.map((announcement: any,index : number) => (
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
                          <DropdownMenuItem onClick={()=>openAddModal(index)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
          initialData={AnnouncementData.data[index]}
        />
    </div>
  )
}

