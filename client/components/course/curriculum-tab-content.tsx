import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import CurriculumContent from "@/components/course/curriculum-content"

// This is a server component that fetches its own data
export default async function CurriculumTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { modules } = await getCurriculumData(courseId)

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Curriculum</CardTitle>
            <CardDescription>Manage your course modules and lessons</CardDescription>
          </div>
          <Button>
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
                <Button className="mt-4">Add First Module</Button>
              </div>
            </div>
          ) : (
            <CurriculumContent modules={modules} courseId={courseId} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Mock function to get curriculum data
// In a real app, this would be a database query
async function getCurriculumData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const modules = [
    {
      id: "m1",
      title: "Introduction to Advanced JavaScript",
      description: "Overview of advanced JavaScript concepts and course structure",
      isPublished: true,
      lessons: [
        {
          id: "l1",
          title: "Course Overview",
          type: "video",
          duration: "15 min",
        },
        {
          id: "l2",
          title: "JavaScript Fundamentals Recap",
          type: "text",
          duration: "30 min",
        },
      ],
    },
    {
      id: "m2",
      title: "Advanced Functions and Closures",
      description: "Deep dive into JavaScript functions, closures, and execution context",
      isPublished: true,
      lessons: [
        {
          id: "l3",
          title: "Higher-Order Functions",
          type: "video",
          duration: "25 min",
        },
        {
          id: "l4",
          title: "Understanding Closures",
          type: "video",
          duration: "30 min",
        },
        {
          id: "l5",
          title: "Closure Exercises",
          type: "assignment",
          duration: "1 hour",
        },
      ],
    },
    {
      id: "m3",
      title: "Asynchronous JavaScript",
      description: "Working with Promises, async/await, and handling asynchronous operations",
      isPublished: false,
      lessons: [
        {
          id: "l6",
          title: "Introduction to Promises",
          type: "video",
          duration: "35 min",
        },
        {
          id: "l7",
          title: "Async/Await Patterns",
          type: "video",
          duration: "40 min",
        },
        {
          id: "l8",
          title: "Asynchronous JavaScript Quiz",
          type: "quiz",
          duration: "20 min",
        },
      ],
    },
  ]

  return { modules }
}

