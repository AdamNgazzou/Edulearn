import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import Link from "next/link"

// This is a server component that fetches its own data
export default async function StudentsTabContent({ courseId }: { courseId: string }) {
  // Fetch data for this tab specifically
  const { enrolledStudents, StudentsData } = await getStudentsData(courseId)

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Enrolled Students</CardTitle>
            <CardDescription>Manage and track student progress</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/teacher/students/${courseId}`}>
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {StudentsData.data.students.length === 0 ? (
            <div className="flex items-center justify-center border-2 border-dashed rounded-md p-12">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No students enrolled yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Students will appear here once they enroll in your course
                </p>
              </div>
            </div>
           ) : (
            <div className="space-y-4">
              {StudentsData.data.students.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.image_url} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.round((student.lessonscompleted / StudentsData.data.lessonscount)*100)} className="h-2 w-24" />
                        <span className="text-sm">{Math.round((student.lessonscompleted / StudentsData.data.lessonscount)*100)}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/teacher/students/${courseId}/${student.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Mock function to get students data
// In a real app, this would be a database query
async function getStudentsData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/studentsCourse/${courseId}`)
  const StudentsData = await response.json()
  const enrolledStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      progress: 65,
      joinDate: "2024-09-15",
      lastActive: "2024-10-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      progress: 78,
      joinDate: "2024-09-10",
      lastActive: "2024-10-02",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      progress: 23,
      joinDate: "2024-09-20",
      lastActive: "2024-09-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return { enrolledStudents,StudentsData }
}

