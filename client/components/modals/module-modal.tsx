"use client"

import React, { useEffect, useState } from "react"
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

interface ModuleFormData {
  id?: string
  title: string
  description: string
  is_published: boolean
}

interface ModuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (moduleData: ModuleFormData) => Promise<void> | void
  editMode: "add" | "edit"
  initialData?: ModuleFormData
}

export function ModuleModal({ isOpen, onClose, onSubmit, editMode, initialData }: ModuleModalProps) {
  const defaultData: ModuleFormData = {
    title: "",
    description: "",
    is_published: false,
  }

  const [formData, setFormData] = useState<ModuleFormData>(initialData || defaultData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData(initialData || defaultData)
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_published: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode === "add" ? "Add New Module" : "Edit Module"}</DialogTitle>
          <DialogDescription>
            {editMode === "add" ? "Create a new module for your course." : "Edit your module."}
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
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading
                ? editMode === "add"
                  ? "Adding..."
                  : "Saving..."
                : editMode === "add"
                ? "Add Module"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
