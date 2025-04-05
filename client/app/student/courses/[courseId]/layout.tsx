import CourseHeaderClient from "@/components/student/SignleCoursePageClient"
import { cookies } from "next/headers";


export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  /*const cookieStore = await cookies();
  const id = cookieStore.get("id")?.value;

  if (!id) {
    // Handle the case where the id is not available
    return <div>Unauthorized</div>;
  }*/
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/course/8/10`)
  const course = await response.json()
  console.log("hihihi",course);
  return (
  <>
    <CourseHeaderClient course={course.data}  />
    {children}
  </>
  )

}