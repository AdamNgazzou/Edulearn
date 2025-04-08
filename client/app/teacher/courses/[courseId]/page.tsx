


import { Suspense } from "react"
import CourseHeader from "@/components/course/course-header"
import CourseTabs from "@/components/course/course-tabs"
import OverviewTabContent from "@/components/course/overview-tab-content"
import CurriculumTabContent from "@/components/course/curriculum-tab-content"
import ResourcesTabContent from "@/components/course/resources-tab-content"
import StudentsTabContent from "@/components/course/students-tab-content"
import SettingsTabContent from "@/components/course/settings-tab-content"
import { Skeleton } from "@/components/ui/skeleton"

// Mock course data

// This is the main page component (server component)
export default async function CourseManagementPage({ params }: { params: { courseId: string } }) {
  const {courseId} = await params
  const course = await getCourseBasicInfo(courseId);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Course Header - Pass only the data needed for the header */}
            <CourseHeader courseData={course} courseId={courseId} />

            {/* Course Tabs - Client component that handles tab switching */}
            <CourseTabs
              courseId={courseId}
              tabComponents={{
                overview: (
                  <Suspense fallback={<TabSkeleton />}>
                    <OverviewTabContent courseId={courseId} />
                  </Suspense>
                ),
                curriculum: (
                  <Suspense fallback={<TabSkeleton />}>
                    <CurriculumTabContent courseId={courseId} />
                  </Suspense>
                ),
                resources: (
                  <Suspense fallback={<TabSkeleton />}>
                    <ResourcesTabContent courseId={courseId} />
                  </Suspense>
                ),
                students: (
                  <Suspense fallback={<TabSkeleton />}>
                    <StudentsTabContent courseId={courseId} />
                  </Suspense>
                ),
                settings: (
                  <Suspense fallback={<TabSkeleton />}>//
                    <SettingsTabContent courseId={courseId} />
                  </Suspense>
                ),
              }}
            />
            {/* ... rest of the component ... */}
          </div>
        </div>
      </main>
    </div>
  )
}


function TabSkeleton() {
  return (
    <div className="space-y-4 pt-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

// Mock function to get course basic info
// In a real app, this would be a database query
async function getCourseBasicInfo(courseId: string) {
  // Simulate database fetch
  await new Promise((resolve) => setTimeout(resolve, 100))
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/infocourse/${courseId}`)
  const CourseData = await response.json()
  return CourseData.data
}
