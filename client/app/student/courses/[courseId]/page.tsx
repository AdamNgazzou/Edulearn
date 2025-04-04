import { Suspense } from "react"
import CourseContentPage from "./course-content"
import CourseInfoSkeleton from "./course-info-skeleton"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return (
    <Suspense fallback={<CourseInfoSkeleton />}>
      <CourseContentPage courseId={params.courseId} />
    </Suspense>
  )
}

