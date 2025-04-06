"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (moduleData: any) => void
  editMode: "add" | "edit"
  initialData?: {
    id?: string
    title: string
    description: string
    isPublished: boolean
  }
}

export function ModuleModal({ isOpen, onClose, onSubmit, editMode, initialData }: ModuleModalProps) {
  const defaultData = {
    title: "",
    description: "",
    isPublished: false,
  }

  const [formData, setFormData] = useState(initialData || defaultData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isPublished: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode === "add" ? "Add New Module" : "Edit Module"}</DialogTitle>
          <DialogDescription>
            {editMode === "add" ? "Create a new module for your course." : "Make changes to your existing module."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter module title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter module description"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isPublished" checked={formData.isPublished} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="isPublished">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editMode === "add" ? "Add Module" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

