import { Suspense } from "react"
import CourseContentPage from "./course-content"
import CourseInfoSkeleton from "./course-info-skeleton"

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const {courseId} = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/coursemodles/8/${courseId}`)
  const courseData = await response.json()
  console.log("hey",courseData.data);
  return (
      <CourseContentPage courseId={courseId} courseData={courseData.data} />
  )
}

