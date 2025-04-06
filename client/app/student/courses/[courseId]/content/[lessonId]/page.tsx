import { cookies } from "next/headers";
import LessonContent from "./lesson-content"

export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
  
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/courselesson/${id}/${lessonId}}`)
  const courseData = await response.json()
  console.log("yuri",courseData.data);
  return (
      <LessonContent courseId={courseId} lessonId={lessonId} studentId={id} courseData={courseData.data}  />
  )
}



