import { Suspense } from "react"
import CourseInfoPage from "./course-info"
import CourseInfoSkeleton from "../course-info-skeleton"

export default async function CourseInfo({ params }: { params: { courseId: string } }) {
  const {courseId} = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/courseinfo/8/${courseId}`)
  const courseData = await response.json()
  console.log("hey",courseId);
  return (
    <Suspense fallback={<CourseInfoSkeleton />}>
      <CourseInfoPage courseId={courseId} courseData={courseData.data} />
    </Suspense>
  )
}

