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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, LinkIcon, FileText, Github } from 'lucide-react'

export interface ResourceData {
  id: string
  title: string
  type: "file" | "link" | "text" | "github"
  description: string
  content: {
    fileUrl?: string
    fileName?: string
    fileSize?: string
    linkUrl?: string
    textContent?: string
    githubUrl?: string
  }
}

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (resourceData: ResourceData) => void
}

export function AddResourceModal({ isOpen, onClose, onSave }: AddResourceModalProps) {
  const [resourceData, setResourceData] = useState<Omit<ResourceData, "id">>({
    title: "",
    type: "file",
    description: "",
    content: {
      fileUrl: "",
      fileName: "",
      fileSize: "",
      linkUrl: "",
      textContent: "",
      githubUrl: "",
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Handle nested content fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setResourceData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [child]: value
        }
      }))
    } else {
      setResourceData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (value: string) => {
    setResourceData(prev => ({ ...prev, type: value as ResourceData["type"] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resourceData.title.trim()) {
      return // Don't submit if title is empty
    }
    
    setIsLoading(true)
    
    // Create a new resource with a unique ID
    const newResource: ResourceData = {
      ...resourceData,
      id: `resource-${Date.now()}`
    }
    
    // Simulate API delay
    setTimeout(() => {
      onSave(newResource)
      setIsLoading(false)
      resetForm()
      onClose()
    }, 500)
  }
  
  const resetForm = () => {
    setResourceData({
      title: "",
      type: "file",
      description: "",
      content: {
        fileUrl: "",
        fileName: "",
        fileSize: "",
        linkUrl: "",
        textContent: "",
        githubUrl: "",
      }
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
            <DialogTitle>Add Course Resource</DialogTitle>
            <DialogDescription>
              Add supplementary materials for your students
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Resource Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={resourceData.title}
                onChange={handleChange}
                placeholder="e.g. JavaScript Cheat Sheet"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Resource Type</Label>
              <Select 
                value={resourceData.type} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">File Upload</SelectItem>
                  <SelectItem value="link">External Link</SelectItem>
                  <SelectItem value="text">Text/Notes</SelectItem>
                  <SelectItem value="github">GitHub Repository</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={resourceData.description}
                onChange={handleChange}
                placeholder="Brief description of this resource"
                rows={2}
              />
            </div>

            {/* Conditional fields based on resource type */}
            {resourceData.type === "file" && (
              <div className="grid gap-2">
                <Label>Upload File</Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOCX, XLSX, ZIP up to 50MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {resourceData.type === "link" && (
              <div className="grid gap-2">
                <Label htmlFor="content.linkUrl">URL</Label>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="content.linkUrl"
                    name="content.linkUrl"
                    value={resourceData.content.linkUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/resource"
                  />
                </div>
              </div>
            )}

            {resourceData.type === "text" && (
              <div className="grid gap-2">
                <Label htmlFor="content.textContent">Text Content</Label>
                <Textarea
                  id="content.textContent"
                  name="content.textContent"
                  value={resourceData.content.textContent}
                  onChange={handleChange}
                  placeholder="Enter notes, code snippets, or other text content here..."
                  rows={6}
                />
              </div>
            )}

            {resourceData.type === "github" && (
              <div className="grid gap-2">
                <Label htmlFor="content.githubUrl">GitHub Repository URL</Label>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="content.githubUrl"
                    name="content.githubUrl"
                    value={resourceData.content.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repository"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !resourceData.title.trim()}>
              {isLoading ? "Adding..." : "Add Resource"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
