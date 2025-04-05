import LessonContent from "./lesson-content"

export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/courselesson/8/${lessonId}}`)
  const courseData = await response.json()
  console.log("yuri",courseData.data);
  return (
      <LessonContent courseId={courseId} lessonId={lessonId} courseData={courseData.data} />
  )
}



