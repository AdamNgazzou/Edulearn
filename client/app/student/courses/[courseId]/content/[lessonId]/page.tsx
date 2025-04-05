import { Suspense } from "react"
import LessonContent from "./lesson-content"
import LessonContentSkeleton from "./lesson-content-skeleton"

export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/coursemodles/8/10}`)
  const courseData = await response.json()
  console.log("hey",courseId);
  return (
    <Suspense fallback={<LessonContentSkeleton />}>
      <LessonContent courseId={courseId} lessonId={lessonId} courseData={courseData.data} />
    </Suspense>
  )
}



