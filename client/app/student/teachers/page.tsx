import TeachersPageClient from "@/components/student/TeachersPageClient"
import { cookies } from "next/headers";


export default async function TeachersPage() {
    const cookieStore = await cookies();
    const id = cookieStore.get("id")?.value;
  
    if (!id) {
      // Handle the case where the id is not available
      return <div>Unauthorized</div>;
    }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/teachers/${id}`)
  const teachers = await response.json()
  console.log(teachers);
  return <TeachersPageClient teachers={teachers} />
}