import TeachersPageClient from "@/components/TeachersPageClient"


export default async function TeachersPage() {
  const id = 8
  const response = await fetch(`http://localhost:3001/student/teachers/${id}`)
  const teachers = await response.json()
  console.log(teachers);
  return <TeachersPageClient teachers={teachers} />
}