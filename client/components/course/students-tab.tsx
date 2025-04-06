import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import Link from "next/link"

interface StudentsTabProps {
  course: any
  courseId: string
}

export function StudentsTab({ course, courseId }: StudentsTabProps) {
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
          {course.enrolledStudents.length === 0 ? (
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
              {course.enrolledStudents.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
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
                        <Progress value={student.progress} className="h-2 w-24" />
                        <span className="text-sm">{student.progress}%</span>
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

