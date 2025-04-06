import { Suspense } from "react"
import CourseContentPage from "./course-content"
import { cookies } from "next/headers";

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const {courseId} = await params;
  const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
    
    if (!id) {
     // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/coursemodles/${id}/${courseId}`)
  const courseData = await response.json()
  console.log("hey",courseData.data);
  return (
      <CourseContentPage courseId={courseId} courseData={courseData.data} />
  )
}

