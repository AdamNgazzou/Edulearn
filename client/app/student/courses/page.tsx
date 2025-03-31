import CoursesPageClient from "@/components/CoursesPageClient"


export default async function CoursesPage() {
  const id = 8
  const response = await fetch(`http://localhost:3001/student/courses/${id}`)
  const courses1 = await response.json()
  return <CoursesPageClient courses1={courses1} />
}