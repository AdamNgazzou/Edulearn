"use client"

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
import { Switch } from "@/components/ui/switch"

interface AddModuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (moduleData: ModuleData) => void
}

export interface ModuleData {
  id: string
  title: string
  description: string
  isPublished: boolean
  lessons: LessonData[]
}

export interface LessonData {
  id: string
  title: string
  type: "video" | "text" | "quiz" | "assignment"
  duration: string
  content: {
    videoUrl?: string
    textContent?: string
    quizQuestions?: any[]
    assignmentDetails?: {
      description: string
      dueDate: Date | null
      points: string
      instructions: string
    }
  }
}

export function AddModuleModal({ isOpen, onClose, onSave }: AddModuleModalProps) {
  const [moduleData, setModuleData] = useState<Omit<ModuleData, "id" | "lessons">>({
    title: "",
    description: "",
    isPublished: true,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setModuleData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setModuleData(prev => ({ ...prev, isPublished: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!moduleData.title.trim()) {
      return // Don't submit if title is empty
    }
    
    setIsLoading(true)
    
    // Create a new module with a unique ID
    const newModule: ModuleData = {
      ...moduleData,
      id: `module-${Date.now()}`,
      lessons: []
    }
    
    // Simulate API delay
    setTimeout(() => {
      onSave(newModule)
      setIsLoading(false)
      resetForm()
      onClose()
    }, 500)
  }
  
  const resetForm = () => {
    setModuleData({
      title: "",
      description: "",
      isPublished: true,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm()
        onClose()
      }
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
            <DialogDescription>
              Create a new module for your course curriculum
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Module Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={moduleData.title}
                onChange={handleChange}
                placeholder="e.g. Introduction to JavaScript"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Module Description</Label>
              <Textarea
                id="description"
                name="description"
                value={moduleData.description}
                onChange={handleChange}
                placeholder="Describe what students will learn in this module"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isPublished">Publish Module</Label>
                <p className="text-sm text-muted-foreground">
                  Make this module visible to students
                </p>
              </div>
              <Switch
                id="isPublished"
                checked={moduleData.isPublished}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !moduleData.title.trim()}>
              {isLoading ? "Adding..." : "Add Module"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
