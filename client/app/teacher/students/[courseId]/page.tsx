import StudentsOfSignleCoursePageClient from "@/components/teacher/StudentsOfSignleCoursePageClient"
import { cookies } from "next/headers";


export default async function TeacherProfilePage({ params }: { params: { courseId: string } }) {
    const cookieStore = await cookies();
    const { courseId } = params; // Get teacherid from the URL
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/studentsOfCourse/${courseId}`)
  const studentsData = await response.json()
  console.log(studentsData.data);
  return <StudentsOfSignleCoursePageClient studentsData={studentsData.data} />
}


