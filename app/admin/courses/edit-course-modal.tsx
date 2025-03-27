"use client"

import { useState, useEffect } from "react"
import { X, Save, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Course {
  id: number
  title: string
  description: string
  instructor: string
  instructorAvatar: string
  status: string
  students: number
  lessons: number
  duration: string
  level: string
  rating: number
  image: string
  lastUpdated: string
}

interface EditCourseModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  onSave: (course: Course) => void
  instructors: { id: number; name: string; avatar: string }[]
}

export function EditCourseModal({ course, isOpen, onClose, onSave, instructors }: EditCourseModalProps) {
  const [editedCourse, setEditedCourse] = useState<Course | null>(course)
  const [isLoading, setIsLoading] = useState(false)

  // Update local state when the course prop changes
  useEffect(() => {
    if (course) {
      setEditedCourse({ ...course })
    }
  }, [course])

  if (!editedCourse) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedCourse({ ...editedCourse, [name]: value })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedCourse({ ...editedCourse, [name]: parseInt(value) || 0 })
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedCourse({ ...editedCourse, [name]: value })
  }

  const handleStatusChange = (checked: boolean) => {
    setEditedCourse({ ...editedCourse, status: checked ? "published" : "draft" })
  }

  const handleInstructorChange = (instructorName: string) => {
    const selectedInstructor = instructors.find(i => i.name === instructorName)
    if (selectedInstructor) {
      setEditedCourse({ 
        ...editedCourse, 
        instructor: selectedInstructor.name,
        instructorAvatar: selectedInstructor.avatar
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editedCourse.title || !editedCourse.instructor || !editedCourse.duration) {
      alert("Please fill in all required fields")
      return
    }
    
    setIsLoading(true)
    
    // Update lastUpdated date
    const updatedCourse = {
      ...editedCourse,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    // Simulate API call delay
    setTimeout(() => {
      onSave(updatedCourse)
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update course information and settings
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={editedCourse.title}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editedCourse.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructor" className="text-right">
                Instructor <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Select 
                  value={editedCourse.instructor} 
                  onValueChange={(value) => handleInstructorChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.name}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select 
                value={editedCourse.level} 
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger id="level" className="col-span-3">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lessons" className="text-right">
                Lessons
              </Label>
              <Input
                id="lessons"
                name="lessons"
                type="number"
                min="0"
                value={editedCourse.lessons}
                onChange={handleNumberChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration <span className="text-red-500">*</span>
              </Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g. 8 weeks"
                value={editedCourse.duration}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="students" className="text-right">
                Students
              </Label>
              <Input
                id="students"
                name="students"
                type="number"
                min="0"
                value={editedCourse.students}
                onChange={handleNumberChange}
                className="col-span-3"
                disabled={editedCourse.status === "draft"}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Course Image
              </Label>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current image: {editedCourse.image.split('/').pop()}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Switch
                  id="status"
                  checked={editedCourse.status === "published"}
                  onCheckedChange={handleStatusChange}
                />
                <Label htmlFor="status">
                  {editedCourse.status === "published" ? "Published" : "Draft"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
