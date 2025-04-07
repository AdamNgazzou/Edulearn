import OverviewTabContentServer from "./OverviewTabContentServer"

// This is a server component that fetches its own data
export default async function OverviewTabWrapper({ courseId }: { courseId: string }) {
  const { AnnouncementData } = await getOverviewData(courseId)
  return <OverviewTabContentServer courseId={courseId} AnnouncementData={AnnouncementData} />
}

// Mock function to get overview data
// In a real app, this would be a database query
async function getOverviewData(courseId: string) {
  // Simulate database fetch with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/announcement/${courseId}`)
  const AnnouncementData = await response.json()



  return { AnnouncementData }
}

