import ProfilePageClient from "@/components/teacher/ProfilePageClient"
import { cookies } from "next/headers";


export default async function TeacherProfilePage() {
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/profile/${id}`)
  const profileData = await response.json()
  console.log(profileData);
  return <ProfilePageClient profileData={profileData.data} />
}


