import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import ResourcesContent from "@/components/course/resources-content"

// This is a server component that fetches its own data
export default async function ResourcesTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { resources,coursesData } = await getResourcesData(courseId)

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Resources</CardTitle>
            <CardDescription>Manage supplementary materials for your students</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </CardHeader>
        <CardContent>
          {resources.length === 0 ? (
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No resources yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add files, links, or other resources to support your course
                </p>
                <Button className="mt-4">Add First Resource</Button>
              </div>
            </div>
          ) : (
            <ResourcesContent resources={resources} coursesData={coursesData} courseId={courseId} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Mock function to get resources data
// In a real app, this would be a database query
async function getResourcesData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/resourcesCourse/10`)
  const coursesData = await response.json()
  const resources = [
    {
      id: "r1",
      title: "JavaScript Cheat Sheet",
      type: "file",
      description: "Quick reference guide for JavaScript syntax and methods",
      content: {
        fileUrl: "/files/js-cheatsheet.pdf",
        fileName: "js-cheatsheet.pdf",
        fileSize: "1.2 MB",
      },
    },
    {
      id: "r2",
      title: "MDN JavaScript Documentation",
      type: "link",
      description: "Official Mozilla Developer Network JavaScript documentation",
      content: {
        linkUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    },
    {
      id: "r3",
      title: "Course Code Repository",
      type: "github",
      description: "GitHub repository with all code examples from the course",
      content: {
        githubUrl: "https://github.com/example/advanced-js-course",
      },
    },
  ]

  return { resources,coursesData }
}

