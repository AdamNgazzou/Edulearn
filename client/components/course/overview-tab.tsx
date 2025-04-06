"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertCircle, Edit, FileText, MoreHorizontal, Plus, Trash, Video } from "lucide-react"

interface OverviewTabProps {
  course: any
  openModal: (
    type: "module" | "lesson" | "resource" | "announcement" | "none",
    mode: "add" | "edit",
    moduleId?: string,
    lessonId?: string,
    resourceId?: string,
    announcementId?: string,
  ) => void
  handleDeleteAnnouncement: (announcementId: string) => void
  totalLessons: number
  completedModules: number
}

export function OverviewTab({
  course,
  openModal,
  handleDeleteAnnouncement,
  totalLessons,
  completedModules,
}: OverviewTabProps) {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Announcements</CardTitle>
            <CardDescription>Communicate important information to your students</CardDescription>
          </div>
          <Button onClick={() => openModal("announcement", "add")}>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </CardHeader>
        <CardContent>
          {course.announcements.length === 0 ? (
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No announcements yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create announcements to keep your students informed
                </p>
                <Button className="mt-4" onClick={() => openModal("announcement", "add")}>
                  Create Announcement
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {course.announcements.map((announcement: any) => (
                <div key={announcement.id} className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString()}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openModal("announcement", "edit", null, null, null, announcement.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteAnnouncement(announcement.id)}>
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

      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
          <CardDescription>Summary of your course structure and content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Modules</h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                  <span className="text-2xl font-bold">{course.modules.length}</span>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Lessons</h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                  <span className="text-2xl font-bold">{totalLessons}</span>
                  <Video className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resources</h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                  <span className="text-2xl font-bold">{course.resources.length}</span>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Module Completion</h3>
              <div className="space-y-4">
                {course.modules.map((module: any) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{module.title}</span>
                      <Badge variant={module.isPublished ? "default" : "secondary"}>
                        {module.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <Progress value={module.isPublished ? 100 : 0} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

