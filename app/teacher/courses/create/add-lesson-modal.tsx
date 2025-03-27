"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LessonData } from "./add-module-modal"

interface AddLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (lessonData: LessonData) => void
  moduleTitle: string
}

export function AddLessonModal({ isOpen, onClose, onSave, moduleTitle }: AddLessonModalProps) {
  const [lessonData, setLessonData] = useState<Omit<LessonData, "id">>({
    title: "",
    type: "video",
    duration: "",
    content: {
      videoUrl: "",
      textContent: "",
      quizQuestions: [],
      assignmentDetails: {
        description: "",
        dueDate: null,
        points: "",
        instructions: "",
      },
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    // Update assignment due date when calendar date changes
    if (date && lessonData.type === "assignment") {
      setLessonData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          assignmentDetails: {
            ...prev.content.assignmentDetails,
            dueDate: date,
          },
        },
      }))
    }
  }, [date])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested content fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      if (parent === "content") {
        setLessonData((prev) => ({
          ...prev,
          content: {
            ...prev.content,
            [child]: value,
          },
        }))
      } else if (parent === "assignmentDetails") {
        setLessonData((prev) => ({
          ...prev,
          content: {
            ...prev.content,
            assignmentDetails: {
              ...prev.content.assignmentDetails,
              [child]: value,
            },
          },
        }))
      }
    } else {
      setLessonData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (value: string) => {
    setLessonData((prev) => ({ ...prev, type: value as LessonData["type"] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!lessonData.title.trim()) {
      return // Don't submit if title is empty
    }

    setIsLoading(true)

    // Create a new lesson with a unique ID
    const newLesson: LessonData = {
      ...lessonData,
      id: `lesson-${Date.now()}`,
    }

    // Simulate API delay
    setTimeout(() => {
      onSave(newLesson)
      setIsLoading(false)
      resetForm()
      onClose()
    }, 500)
  }

  const resetForm = () => {
    setLessonData({
      title: "",
      type: "video",
      duration: "",
      content: {
        videoUrl: "",
        textContent: "",
        quizQuestions: [],
        assignmentDetails: {
          description: "",
          dueDate: null,
          points: "",
          instructions: "",
        },
      },
    })
    setDate(undefined)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetForm()
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[650px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Lesson</DialogTitle>
            <DialogDescription>Add a lesson to the module: {moduleTitle}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Lesson Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={lessonData.title}
                onChange={handleChange}
                placeholder="e.g. Introduction to Variables"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Lesson Type</Label>
              <Select value={lessonData.type} onValueChange={handleSelectChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select lesson type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="text">Text/Reading</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={lessonData.duration}
                onChange={handleChange}
                placeholder="e.g. 15 minutes"
              />
              <p className="text-xs text-muted-foreground">Estimated time to complete this lesson</p>
            </div>

            {/* Conditional fields based on lesson type */}
            {lessonData.type === "video" && (
              <div className="grid gap-2">
                <Label htmlFor="content.videoUrl">Video URL</Label>
                <Input
                  id="content.videoUrl"
                  name="content.videoUrl"
                  value={lessonData.content.videoUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground">YouTube, Vimeo, or other video platform URL</p>
              </div>
            )}

            {lessonData.type === "text" && (
              <div className="grid gap-2">
                <Label htmlFor="textContent">Text Content</Label>
                <Textarea
                  id="textContent"
                  name="textContent"
                  value={lessonData.content.textContent}
                  onChange={handleChange}
                  placeholder="Enter the reading content or instructions here..."
                  rows={8}
                />
                <div className="flex items-center justify-center border border-dashed rounded-md p-4 mt-2">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <div className="mt-2 flex text-sm leading-6 text-muted-foreground">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                      >
                        <span>Upload PDF</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" />
                      </label>
                      <p className="pl-1">instead of text</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {lessonData.type === "quiz" && (
              <div className="grid gap-2">
                <Label>Quiz Questions</Label>
                <div className="border rounded-md p-4 bg-muted/30">
                  <p className="text-sm text-center text-muted-foreground">
                    Quiz builder will be available in the next update. For now, please describe your quiz.
                  </p>
                  <Textarea
                    id="quizDescription"
                    name="quizDescription"
                    placeholder="Describe the quiz questions and options..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {lessonData.type === "assignment" && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.description">Assignment Description</Label>
                  <Textarea
                    id="assignmentDetails.description"
                    name="assignmentDetails.description"
                    value={lessonData.content.assignmentDetails.description}
                    onChange={handleChange}
                    placeholder="Brief description of the assignment"
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="assignmentDetails.instructions">Instructions</Label>
                  <Textarea
                    id="assignmentDetails.instructions"
                    name="assignmentDetails.instructions"
                    value={lessonData.content.assignmentDetails.instructions}
                    onChange={handleChange}
                    placeholder="Detailed instructions for completing the assignment"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assignmentDetails.points">Points</Label>
                    <Input
                      id="assignmentDetails.points"
                      name="assignmentDetails.points"
                      value={lessonData.content.assignmentDetails.points}
                      onChange={handleChange}
                      placeholder="e.g. 100"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !lessonData.title.trim()}>
              {isLoading ? "Adding..." : "Add Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

