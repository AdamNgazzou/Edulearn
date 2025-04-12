"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (lessonData: any) => void
  editMode: "add" | "edit"
  initialData?: {
    description: string
    id?: string
    title: string
    type: string
    duration: string
    content: any
  }
}

const defaultContent = {
  videoUrl: "",
  sections: [{ title: "", content: "" }],
  assignmentDetails: {
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    points: "100",
    instructions: [""],
  },
  quizQuestions: [],
}

const defaultData = {
  title: "",
  description: "", 
  type: "video",
  duration: "",
  content: defaultContent,
}

export function LessonModal({ isOpen, onClose, onSubmit, editMode, initialData }: LessonModalProps) {
  const [formData, setFormData] = useState({ ...defaultData })
  const [loading, setLoading] = useState(false) 

  // Sync with initialData when it changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultData,
        ...initialData,
        description: initialData.description  || "" , 
        content: {
          ...defaultContent,
          ...initialData.content,
          assignmentDetails: {
            ...defaultContent.assignmentDetails,
            ...(initialData.content?.assignmentDetails || {}),
          },
          sections: initialData.content?.sections || defaultContent.sections,
        },
      })
    } else {
      setFormData({ ...defaultData })
    }
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const keys = name.split(".")

    setFormData((prev) => {
      const updatedContent = { ...prev.content }

      if (keys.length === 2) {
        updatedContent[keys[0]] = {
          ...updatedContent[keys[0]],
          [keys[1]]: value,
        }
      } else {
        updatedContent[name] = value
      }

      return {
        ...prev,
        content: updatedContent,
      }
    })
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const cleanedData = {
        ...formData,
        content: {
          ...formData.content,
          assignmentDetails: {
            ...formData.content.assignmentDetails,
            instructions: formData.content.assignmentDetails.instructions.filter(
              (ins) => ins.trim() !== ""
            ),
          },
        },
      };
  
      await onSubmit(cleanedData); 
    } catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...formData.content.assignmentDetails.instructions]
    updatedInstructions[index] = value
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        assignmentDetails: {
          ...prev.content.assignmentDetails,
          instructions: updatedInstructions,
        },
      },
    }))
  }
  
  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        assignmentDetails: {
          ...prev.content.assignmentDetails,
          instructions: [...prev.content.assignmentDetails.instructions, ""],
        },
      },
    }))
  }
  
  const removeInstruction = (index: number) => {
    const updated = [...formData.content.assignmentDetails.instructions]
    updated.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        assignmentDetails: {
          ...prev.content.assignmentDetails,
          instructions: updated,
        },
      },
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode === "add" ? "Add New Lesson" : "Edit Lesson"}</DialogTitle>
          <DialogDescription>
            {editMode === "add"
              ? "Create a new lesson for this module."
              : "Make changes to your existing lesson."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[65vh] pr-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Lesson Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Lesson Type</Label>
                {editMode === "edit" ? (
                  <Input value={formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} disabled />
                ) : (
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
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Lesson Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the lesson"
                  rows={3}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 30 min"
                  required
                />
              </div>

              {formData.type === "video" && (
                <div className="grid gap-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.content.videoUrl}
                    onChange={handleContentChange}
                    placeholder="Enter video URL"
                    required
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
                        required
                      />
                      <Textarea
                        placeholder="Section Content"
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                        rows={4}
                        required
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
                      value={formData.content.assignmentDetails.description}
                      onChange={handleContentChange}
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="assignmentDetails.dueDate">Due Date</Label>
                    <Input
                      id="assignmentDetails.dueDate"
                      name="assignmentDetails.dueDate"
                      type="date"
                      value={formData.content.assignmentDetails.dueDate}
                      onChange={handleContentChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="assignmentDetails.points">Points</Label>
                    <Input
                      id="assignmentDetails.points"
                      name="assignmentDetails.points"
                      type="number"
                      value={formData.content.assignmentDetails.points}
                      onChange={handleContentChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Instructions</Label>
                    {formData.content.assignmentDetails.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <Textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          rows={3}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeInstruction(index)}
                          className="mt-1"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addInstruction}>
                      Add Instruction
                    </Button>
              </div>
                </>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? editMode === "add"
                  ? "Adding..."
                  : "Saving..."
                  : editMode === "add"
                  ? "Add lesson"
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
