


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
const mockCourseData = {
  id: "1",
  title: "Advanced JavaScript Programming",
  description:
    "A comprehensive course covering advanced JavaScript concepts, design patterns, and modern ES6+ features.",
  instructor: "Dr. John Smith",
  instructorAvatar: "/placeholder.svg?height=40&width=40",
  status: "published",
  students: 45,
  lessons: 15,
  duration: "8 weeks",
  level: "Intermediate",
  category: "web-development",
  price: "49.99",
  rating: 4.8,
  reviews: 32,
  image: "/placeholder.svg?height=300&width=500",
  lastUpdated: "2024-10-01",
  enrollmentLimit: "100",
  isPublished: true,
  modules: [
    {
      id: "m1",
      title: "Introduction to Advanced JavaScript",
      description: "Overview of advanced JavaScript concepts and course structure",
      isPublished: true,
      lessons: [
        {
          id: "l1",
          title: "Course Overview",
          type: "video",
          duration: "15 min",
          content: {
            videoUrl: "https://example.com/video1",
          },
        },
        {
          id: "l2",
          title: "JavaScript Fundamentals Recap",
          type: "text",
          duration: "30 min",
          content: {
            textContent: "This lesson reviews key JavaScript fundamentals that will be built upon in this course...",
          },
        },
      ],
    },
    {
      id: "m2",
      title: "Advanced Functions and Closures",
      description: "Deep dive into JavaScript functions, closures, and execution context",
      isPublished: true,
      lessons: [
        {
          id: "l3",
          title: "Higher-Order Functions",
          type: "video",
          duration: "25 min",
          content: {
            videoUrl: "https://example.com/video2",
          },
        },
        {
          id: "l4",
          title: "Understanding Closures",
          type: "video",
          duration: "30 min",
          content: {
            videoUrl: "https://example.com/video3",
          },
        },
        {
          id: "l5",
          title: "Closure Exercises",
          type: "assignment",
          duration: "1 hour",
          content: {
            assignmentDetails: {
              description: "Practice exercises on closures",
              dueDate: new Date("2024-10-15"),
              points: "100",
              instructions: "Complete the following exercises to demonstrate your understanding of closures...",
            },
          },
        },
      ],
    },
    {
      id: "m3",
      title: "Asynchronous JavaScript",
      description: "Working with Promises, async/await, and handling asynchronous operations",
      isPublished: false,
      lessons: [
        {
          id: "l6",
          title: "Introduction to Promises",
          type: "video",
          duration: "35 min",
          content: {
            videoUrl: "https://example.com/video4",
          },
        },
        {
          id: "l7",
          title: "Async/Await Patterns",
          type: "video",
          duration: "40 min",
          content: {
            videoUrl: "https://example.com/video5",
          },
        },
        {
          id: "l8",
          title: "Asynchronous JavaScript Quiz",
          type: "quiz",
          duration: "20 min",
          content: {
            quizQuestions: [
              {
                question: "What is a Promise in JavaScript?",
                options: [
                  "A built-in function",
                  "An object representing eventual completion of an asynchronous operation",
                  "A type of loop",
                  "A data structure",
                ],
                correctAnswer: 1,
              },
            ],
          },
        },
      ],
    },
  ],
  resources: [
    {
      id: "r1",
      title: "JavaScript Cheat Sheet",
      type: "file",
      description: "Quick reference guide for JavaScript syntax and methods",
      content: {
        fileUrl: "/files/js-cheatsheet.pdf",
        fileName: "js-cheatsheet.pdf",
        fileSize: "1.2 MB",
      },
    },
    {
      id: "r2",
      title: "MDN JavaScript Documentation",
      type: "link",
      description: "Official Mozilla Developer Network JavaScript documentation",
      content: {
        linkUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    },
    {
      id: "r3",
      title: "Course Code Repository",
      type: "github",
      description: "GitHub repository with all code examples from the course",
      content: {
        githubUrl: "https://github.com/example/advanced-js-course",
      },
    },
  ],
  enrolledStudents: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      progress: 65,
      joinDate: "2024-09-15",
      lastActive: "2024-10-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      progress: 78,
      joinDate: "2024-09-10",
      lastActive: "2024-10-02",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james.w@example.com",
      progress: 23,
      joinDate: "2024-09-20",
      lastActive: "2024-09-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  announcements: [
    {
      id: "a1",
      title: "Welcome to the course!",
      content: "Welcome to Advanced JavaScript Programming! I'm excited to have you all in this course...",
      date: "2024-09-01",
    },
    {
      id: "a2",
      title: "Assignment deadline extended",
      content: "Due to multiple requests, I've extended the deadline for the Closure Exercises assignment...",
      date: "2024-10-10",
    },
  ],
}
// This is the main page component (server component)
export default async function CourseManagementPage({ params }: { params: { courseId: string } }) {
  const {courseId} = params
  // Fetch basic course data (this would come from your database)
  // In a real app, you would use a database query here
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
