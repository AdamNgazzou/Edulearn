"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface SettingsActionsProps {
  course: any
  courseId: string
}

export default function SettingsActions({ course, courseId }: SettingsActionsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCourse, setEditedCourse] = useState(course)

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditedCourse((prev: any) => ({
      ...prev,
      [name]: checked,
    }))

    if (!isEditing) {
      // If not in edit mode, save the change immediately
      saveChange(name, checked)
    }
  }

  const handleCourseChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setEditedCourse((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveChange = async (name: string, value: any) => {
    try {
      // In a real app, you would make an API call to update the course setting
      // await fetch(`/api/courses/${courseId}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ [name]: value }),
      // })

      // For now, we'll just simulate success
      toast({
        title: "Setting updated",
        description: `The ${name} setting has been updated`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    try {
      // In a real app, you would make an API call to update all course settings
      // await fetch(`/api/courses/${courseId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(editedCourse),
      // })

      // For now, we'll just simulate success
      toast({
        title: "Settings saved",
        description: "Your course settings have been updated",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="isPublished">Publish Course</Label>
          <p className="text-sm text-muted-foreground">Make this course visible to students</p>
        </div>
        <Switch
          id="isPublished"
          checked={isEditing ? editedCourse.isPublished : course.isPublished}
          onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
        <div className="flex items-center gap-2">
          <Input
            id="enrollmentLimit"
            name="enrollmentLimit"
            value={isEditing ? editedCourse.enrollmentLimit : course.enrollmentLimit}
            onChange={handleCourseChange}
            disabled={!isEditing}
          />
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <Button onClick={handleSave}>Save</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Maximum number of students who can enroll. Leave empty for unlimited enrollment.
        </p>
      </div>
    </>
  )
}

