import CoursesPageClient from "@/components/student/CoursesPageClient"
import { cookies } from "next/headers";


export default async function CoursesPage() {
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
  
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/courses/${id}`)
  const courses1 = await response.json()

  return <CoursesPageClient courses1={courses1} />
}