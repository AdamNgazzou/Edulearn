'use client'
import Image from "next/image"
import { Clock, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { usePathname } from "next/navigation"


export default function CourseHeaderClient({course}: {course : any}) {
  const pathname = usePathname();
  const hideHeader = pathname.includes('/content/');

  return (
    <>
    {!hideHeader && <div className="relative">
      <div className="relative h-[200px] md:h-[300px] w-full">
        <Image
          src={ "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative -mt-20 px-4 md:px-6">
        <div className="bg-background p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{course.level}</Badge>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{course.numberofstudents} students</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                <span>
                  {course.rating} ({course.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={course.instructor_image_url} alt={course.instructor_name} />
              <AvatarFallback>{course.instructor_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Instructor: {course.instructor_name}</p>
              <p className="text-xs text-muted-foreground">Last updated: {course.updated_at}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.totalcompleted} of {course.totallessons} lessons completed
            </p>
          </div>
        </div>
      </div>
    </div>}
  </>
  )
}

