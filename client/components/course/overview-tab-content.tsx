import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Edit, FileText, MoreHorizontal, Trash, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AnnouncementActions from "@/components/course/announcement-actions"

// This is a server component that fetches its own data
export default async function OverviewTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { course, totalLessons, completedModules } = await getOverviewData(courseId)

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
          {course.announcements.length === 0 ? (
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
                          <DropdownMenuItem>
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
    </div>
  )
}

// Mock function to get overview data
// In a real app, this would be a database query
async function getOverviewData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const course = {
    id: courseId,
    modules: [
      {
        id: "m1",
        title: "Introduction to Advanced JavaScript",
        description: "Overview of advanced JavaScript concepts and course structure",
        isPublished: true,
        lessons: [{ id: "l1" }, { id: "l2" }],
      },
      {
        id: "m2",
        title: "Advanced Functions and Closures",
        description: "Deep dive into JavaScript functions, closures, and execution context",
        isPublished: true,
        lessons: [{ id: "l3" }, { id: "l4" }, { id: "l5" }],
      },
      {
        id: "m3",
        title: "Asynchronous JavaScript",
        description: "Working with Promises, async/await, and handling asynchronous operations",
        isPublished: false,
        lessons: [{ id: "l6" }, { id: "l7" }, { id: "l8" }],
      },
    ],
    resources: [{ id: "r1" }, { id: "r2" }, { id: "r3" }],
    announcements: [
      {
        id: "a1",
        title: "Welcome to the course!",
        content: "Welcome to Advanced JavaScript Programming! I'm excited to have you all in this course...",
        date: "2024-09-01",
      },
      {
        id: "a2",
        title: "Assignment deadline extended",
        content: "Due to multiple requests, I've extended the deadline for the Closure Exercises assignment...",
        date: "2024-10-10",
      },
    ],
  }

  // Calculate derived data
  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completedModules = course.modules.filter((module) => module.isPublished).length

  return { course, totalLessons, completedModules }
}

