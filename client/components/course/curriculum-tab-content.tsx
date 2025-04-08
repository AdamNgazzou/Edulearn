import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import CurriculumContent from "@/components/course/curriculum-content"

// This is a server component that fetches its own data
export default async function CurriculumTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { ModulesData } = await getCurriculumData(courseId)

  return (
    <div className="space-y-6 pt-4">
      <Card>
          <CurriculumContent moduless={ModulesData.data} courseId={courseId} />
      </Card>
    </div>
  )
}

// Mock function to get curriculum data
// In a real app, this would be a database query
async function getCurriculumData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/modulesLessons/${courseId}`)
  const ModulesData = await response.json()
  

  return { ModulesData }
}

