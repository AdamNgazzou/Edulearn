"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (lessonData: any) => void
  editMode: "add" | "edit"
  initialData?: {
    id?: string
    title: string
    type: string
    duration: string
    content: any
  }
}

export function LessonModal({ isOpen, onClose, onSubmit, editMode, initialData }: LessonModalProps) {
  const defaultData = {
    title: "",
    type: "video",
    duration: "",
    content: {
      videoUrl: "",
      sections: [{ title: "", content: "" }],
      assignmentDetails: {
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
        points: "100",
        instructions: "",
      },
      quizQuestions: [],
    }    
  }

  const [formData, setFormData] = useState(initialData || defaultData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [parent]: {
            ...prev.content[parent],
            [child]: value,
          },
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [name]: value,
        },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }
  const handleSectionChange = (index: number, field: "title" | "content", value: string) => {
    const updatedSections = [...formData.content.sections]
    updatedSections[index][field] = value
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: updatedSections,
      },
    }))
  }
  
  const handleAddSection = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, { title: "", content: "" }],
      },
    }))
  }
  
  const handleRemoveSection = (index: number) => {
    const updatedSections = [...formData.content.sections]
    updatedSections.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: updatedSections,
      },
    }))
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode === "add" ? "Add New Lesson" : "Edit Lesson"}</DialogTitle>
          <DialogDescription>
            {editMode === "add" ? "Create a new lesson for this module." : "Make changes to your existing lesson."}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[65vh] pr-2">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter lesson title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Lesson Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select lesson type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 30 min"
              />
            </div>

            {formData.type === "video" && (
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.content.videoUrl || ""}
                  onChange={handleContentChange}
                  placeholder="Enter video URL"
                />
              </div>
            )}

{formData.type === "text" && (
  <div className="grid gap-2">
    <Label>Sections</Label>
    {formData.content.sections.map((section, index) => (
      <div key={index} className="border p-2 rounded-md space-y-2">
        <Input
          placeholder="Section Title"
          value={section.title}
          onChange={(e) => handleSectionChange(index, "title", e.target.value)}
        />
        <Textarea
          placeholder="Section Content"
          value={section.content}
          onChange={(e) => handleSectionChange(index, "content", e.target.value)}
          rows={4}
        />
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleRemoveSection(index)}
          className="w-fit"
        >
          Remove Section
        </Button>
      </div>
    ))}
    <Button type="button" onClick={handleAddSection}>
      Add Section
    </Button>
  </div>
)}

            {formData.type === "assignment" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.description">Assignment Description</Label>
                  <Textarea
                    id="assignmentDetails.description"
                    name="assignmentDetails.description"
                    value={formData.content.assignmentDetails?.description || ""}
                    onChange={handleContentChange}
                    placeholder="Enter assignment description"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.dueDate">Due Date</Label>
                  <Input
                    id="assignmentDetails.dueDate"
                    name="assignmentDetails.dueDate"
                    type="date"
                    value={
                      formData.content.assignmentDetails?.dueDate instanceof Date
                        ? formData.content.assignmentDetails.dueDate.toISOString().split("T")[0]
                        : formData.content.assignmentDetails?.dueDate || ""
                    }
                    onChange={handleContentChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.points">Points</Label>
                  <Input
                    id="assignmentDetails.points"
                    name="assignmentDetails.points"
                    type="number"
                    value={formData.content.assignmentDetails?.points || ""}
                    onChange={handleContentChange}
                    placeholder="e.g., 100"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.instructions">Instructions</Label>
                  <Textarea
                    id="assignmentDetails.instructions"
                    name="assignmentDetails.instructions"
                    value={formData.content.assignmentDetails?.instructions || ""}
                    onChange={handleContentChange}
                    placeholder="Enter detailed instructions"
                    rows={5}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editMode === "add" ? "Add Lesson" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
        </div>  
      </DialogContent>
    </Dialog>
  )
}

