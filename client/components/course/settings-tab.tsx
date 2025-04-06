"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SettingsTabProps {
  course: any
  isEditing: boolean
  editedCourse: any
  handleSwitchChange: (name: string, checked: boolean) => void
  handleCourseChange: (e: { target: { name: any; value: any } }) => void
  setCourse: (course: any) => void
}

export function SettingsTab({
  course,
  isEditing,
  editedCourse,
  handleSwitchChange,
  handleCourseChange,
  setCourse,
}: SettingsTabProps) {
  const router = useRouter()

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
          <CardDescription>Configure additional settings for your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isPublished">Publish Course</Label>
              <p className="text-sm text-muted-foreground">Make this course visible to students</p>
            </div>
            <Switch
              id="isPublished"
              checked={isEditing ? editedCourse.isPublished : course.isPublished}
              onCheckedChange={(checked) => {
                if (isEditing) {
                  handleSwitchChange("isPublished", checked)
                } else {
                  setCourse((prev: any) => ({ ...prev, isPublished: checked }))
                  toast({
                    title: checked ? "Course published" : "Course unpublished",
                    description: checked
                      ? "Your course is now visible to students"
                      : "Your course is now hidden from students",
                  })
                }
              }}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
            <Input
              id="enrollmentLimit"
              name="enrollmentLimit"
              value={isEditing ? editedCourse.enrollmentLimit : course.enrollmentLimit}
              onChange={isEditing ? handleCourseChange : undefined}
              disabled={!isEditing}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of students who can enroll. Leave empty for unlimited enrollment.
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Danger Zone</h3>
            <div className="rounded-md border border-destructive/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-destructive">Delete Course</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete this course and all its content</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
                      toast({
                        title: "Course deleted",
                        description: "The course has been permanently deleted",
                      })
                      router.push("/teacher/courses")
                    }
                  }}
                >
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

