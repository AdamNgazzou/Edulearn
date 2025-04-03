import StudentsPageClient from "@/components/teacher/StudentsPageClient"
import { cookies } from "next/headers";


export default async function TeacherProfilePage() {
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/Allstudents/${id}`)
  const studentsData = await response.json()
  console.log(studentsData);
  return <StudentsPageClient studentsData={studentsData} />
}


