import { Suspense } from "react"
import LessonContent from "./lesson-content"
import LessonContentSkeleton from "./lesson-content-skeleton"

export default function LessonPage({params,}: { params: { courseId: string; lessonId: string }}) {
  const {courseId,lessonId} = params;
  return (
    <Suspense fallback={<LessonContentSkeleton />}>
      <LessonContent courseId={courseId} lessonId={lessonId} />
    </Suspense>
  )
}

