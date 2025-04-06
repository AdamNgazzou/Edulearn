import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import SettingsActions from "@/components/course/settings-actions"

// This is a server component that fetches its own data
export default async function SettingsTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { course } = await getSettingsData(courseId)

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
          <CardDescription>Configure additional settings for your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingsActions course={course} courseId={courseId} />

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Danger Zone</h3>
            <div className="rounded-md border border-destructive/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-destructive">Delete Course</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete this course and all its content</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Course
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock function to get settings data
// In a real app, this would be a database query
async function getSettingsData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const course = {
    id: courseId,
    title: "Advanced JavaScript Programming",
    isPublished: true,
    enrollmentLimit: "100",
  }

  return { course }
}

