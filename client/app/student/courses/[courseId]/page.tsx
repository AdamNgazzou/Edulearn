import { Suspense } from "react"
import CourseContentPage from "./course-content"
import CourseInfoSkeleton from "./course-info-skeleton"

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const {courseId} = await params;
  return (
    <Suspense fallback={<CourseInfoSkeleton />}>
      <CourseContentPage courseId={courseId} />
    </Suspense>
  )
}

