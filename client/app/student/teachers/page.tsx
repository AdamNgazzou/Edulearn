import TeachersPageClient from "@/components/student/TeachersPageClient"


export default async function TeachersPage() {
  const id = 8
  const response = await fetch(`${process.env.BACKEND_PUBLIC_API_URL}/student/teachers/${id}`)
  const teachers = await response.json()
  console.log(teachers);
  return <TeachersPageClient teachers={teachers} />
}