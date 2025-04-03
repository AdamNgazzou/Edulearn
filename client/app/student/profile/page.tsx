import ProfilePageClient from "@/components/student/ProfilePageClient"
import { cookies } from "next/headers";


export default async function ProfilePage() {
  const cookieStore = await cookies();
  const id = cookieStore.get("id")?.value;

  if (!id) {
    // Handle the case where the id is not available
    return <div>Unauthorized</div>;
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/profile/${id}`)
  const profileData = await response.json()

  const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/profile/courses/${id}`)
  const profileCourses = await response2.json()
  console.log(profileCourses);
  return <ProfilePageClient profileData={profileData.data[0]} profileCourses={profileCourses} />

}