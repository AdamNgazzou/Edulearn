import CoursesPageClient from "@/components/teacher/CoursesPageClient"
import { cookies } from "next/headers";


export default async function TeacherCoursesPage() {
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/courses/${id}`)
  const coursesData = await response.json()
  console.log(coursesData);
  return <CoursesPageClient coursesData={coursesData.data} />
}


