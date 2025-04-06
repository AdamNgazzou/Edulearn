"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { ReactNode } from "react"

interface CourseTabsProps {
  courseId: string
  tabComponents: {
    overview: ReactNode
    curriculum: ReactNode
    resources: ReactNode
    students: ReactNode
    settings: ReactNode
  }
}

export default function CourseTabs({ courseId, tabComponents }: CourseTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">{tabComponents.overview}</TabsContent>

      <TabsContent value="curriculum">{tabComponents.curriculum}</TabsContent>

      <TabsContent value="resources">{tabComponents.resources}</TabsContent>

      <TabsContent value="students">{tabComponents.students}</TabsContent>

      <TabsContent value="settings">{tabComponents.settings}</TabsContent>
    </Tabs>
  )
}

