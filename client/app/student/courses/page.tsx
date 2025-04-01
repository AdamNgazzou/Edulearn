import CoursesPageClient from "@/components/student/CoursesPageClient"


export default async function CoursesPage() {
  const id = 8
  const response = await fetch(`${process.env.BACKEND_PUBLIC_API_URL}/student/courses/${id}`)
  const courses1 = await response.json()

  return <CoursesPageClient courses1={courses1} />
}