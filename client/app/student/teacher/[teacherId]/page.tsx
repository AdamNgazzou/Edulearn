import TeacherProfilePageStudent from "@/components/student/TeacherProfilePageStudent"

export default async function TeacherProfilePage({ params }: { params: { teacherId: string } }) {
  const { teacherId } = params; // Get teacherid from the URL
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/teacher/profile/${teacherId}`)
  const profileData = await response.json()
  console.log(profileData);
  return <TeacherProfilePageStudent profileData={profileData.data} />
}