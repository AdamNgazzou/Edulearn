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
import { FileText, LinkIcon, Github, Upload } from "lucide-react"

interface ResourceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (resourceData: any) => void
  editMode: "add" | "edit"
  initialData?: {
    id?: string
    title: string
    type: string
    description: string
    content: any
  }
}

export function ResourceModal({ isOpen, onClose, onSubmit, editMode, initialData }: ResourceModalProps) {
  const defaultData = {
    title: "",
    type: "file",
    description: "",
    content: {
      fileUrl: "",
      fileName: "",
      fileSize: "",
      linkUrl: "",
      githubUrl: "",
    },
  }

  const [formData, setFormData] = useState(initialData || defaultData)
  const [file, setFile] = useState<File | null>(null)

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

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [name]: value,
      },
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Update form data with file details
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          fileName: selectedFile.name,
          fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
          // In a real app, you would upload the file to a server and get a URL
          fileUrl: URL.createObjectURL(selectedFile),
        },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle file upload here
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode === "add" ? "Add New Resource" : "Edit Resource"}</DialogTitle>
          <DialogDescription>
            {editMode === "add" ? "Add a new resource to your course." : "Make changes to your existing resource."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Resource Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter resource title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>File</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="link">
                    <div className="flex items-center">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <span>Link</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="github">
                    <div className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub Repository</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter resource description"
                rows={3}
              />
            </div>

            {formData.type === "file" && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input id="file" type="file" onChange={handleFileChange} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file")?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {file ? "Change File" : "Select File"}
                    </Button>
                  </div>
                </div>
                {file && (
                  <div className="text-sm">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}
                {!file && formData.content.fileName && (
                  <div className="text-sm">
                    <p className="font-medium">{formData.content.fileName}</p>
                    <p className="text-muted-foreground">{formData.content.fileSize}</p>
                  </div>
                )}
              </div>
            )}

            {formData.type === "link" && (
              <div className="grid gap-2">
                <Label htmlFor="linkUrl">URL</Label>
                <Input
                  id="linkUrl"
                  name="linkUrl"
                  value={formData.content.linkUrl || ""}
                  onChange={handleContentChange}
                  placeholder="https://example.com"
                  required
                />
              </div>
            )}

            {formData.type === "github" && (
              <div className="grid gap-2">
                <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.content.githubUrl || ""}
                  onChange={handleContentChange}
                  placeholder="https://github.com/username/repository"
                  required
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editMode === "add" ? "Add Resource" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

