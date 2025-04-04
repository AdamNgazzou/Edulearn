export interface Lesson {
  id: string
  title: string
  type: "video" | "assignment" | "reading"
  duration: string
  completed: boolean
  videoUrl?: string
  dueDate?: string
}

export interface Module {
  id: string
  title: string
  description: string
  progress: number
  lessons: Lesson[]
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "github"
  size?: string
  url?: string
}

export interface Announcement {
  id: string
  title: string
  date: string
  content: string
}

export interface Discussion {
  id: string
  title: string
  author: string
  date: string
  replies: number
  solved: boolean
}

export interface Course {
  id: string
  title: string
  instructor: string
  instructorAvatar: string
  instructorBio: string
  progress: number
  image: string
  description: string
  rating: number
  reviews: number
  students: number
  lastUpdated: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  prerequisites: string[]
  learningOutcomes: string[]
  modules: Module[]
  resources: Resource[]
  announcements: Announcement[]
  discussions: Discussion[]
}

export interface CoursesData {
  [key: string]: Course
}

// Mock course data
export const coursesData: CoursesData = {
  "10": {
    id: "1",
    title: "Introduction to Web Development",
    instructor: "Dr. John Smith",
    instructorAvatar: "/placeholder.svg?height=50&width=50",
    instructorBio:
      "Ph.D. in Computer Science with 10+ years of industry experience. Specializes in web development and JavaScript frameworks.",
    progress: 75,
    image: "/placeholder.svg?height=300&width=800",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and basic JavaScript. This course is designed for beginners with no prior experience in web development.",
    rating: 4.8,
    reviews: 245,
    students: 1250,
    lastUpdated: "October 2024",
    duration: "8 weeks",
    level: "Beginner",
    prerequisites: ["Basic computer skills", "No prior coding experience required"],
    learningOutcomes: [
      "Build responsive websites using HTML and CSS",
      "Implement interactive features with JavaScript",
      "Understand web development best practices",
      "Deploy websites to a hosting service",
    ],
    modules: [
      {
        id: "m1",
        title: "Getting Started with HTML",
        description: "Learn the basics of HTML and document structure",
        progress: 100,
        lessons: [
          {
            id: "l1",
            title: "Introduction to HTML",
            type: "video",
            duration: "15 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l2",
            title: "HTML Document Structure",
            type: "video",
            duration: "20 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=QLXnwpL8C9s",
          },
          {
            id: "l3",
            title: "HTML Elements and Attributes",
            type: "reading",
            duration: "25 min",
            completed: true,
          },
          {
            id: "l4",
            title: "HTML Practice Exercise",
            type: "assignment",
            duration: "45 min",
            completed: true,
          },
        ],
      },
      {
        id: "m2",
        title: "CSS Fundamentals",
        description: "Learn how to style web pages with CSS",
        progress: 100,
        lessons: [
          {
            id: "l5",
            title: "Introduction to CSS",
            type: "video",
            duration: "18 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l6",
            title: "CSS Selectors",
            type: "reading",
            duration: "22 min",
            completed: true,
          },
          {
            id: "l7",
            title: "CSS Box Model",
            type: "video",
            duration: "20 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l8",
            title: "CSS Styling Exercise",
            type: "assignment",
            duration: "60 min",
            completed: true,
          },
        ],
      },
      {
        id: "m3",
        title: "CSS Layout and Positioning",
        description: "Learn advanced CSS layout techniques",
        progress: 75,
        lessons: [
          {
            id: "l9",
            title: "CSS Flexbox",
            type: "video",
            duration: "25 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l10",
            title: "CSS Grid",
            type: "video",
            duration: "30 min",
            completed: true,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l11",
            title: "Responsive Design",
            type: "reading",
            duration: "28 min",
            completed: true,
          },
          {
            id: "l12",
            title: "CSS Layout Project",
            type: "assignment",
            duration: "120 min",
            completed: false,
            dueDate: "Oct 22, 2024",
          },
        ],
      },
      {
        id: "m4",
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming",
        progress: 0,
        lessons: [
          {
            id: "l13",
            title: "JavaScript Basics",
            type: "video",
            duration: "30 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l14",
            title: "JavaScript Variables and Data Types",
            type: "reading",
            duration: "25 min",
            completed: false,
          },
          {
            id: "l15",
            title: "JavaScript Functions",
            type: "video",
            duration: "35 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l16",
            title: "DOM Manipulation",
            type: "video",
            duration: "40 min",
            completed: false,
            videoUrl: "https://www.youtube.com/watch?v=FCh6AB0jTS0&t=6906s",
          },
          {
            id: "l17",
            title: "JavaScript Exercise",
            type: "assignment",
            duration: "90 min",
            completed: false,
          },
        ],
      },
    ],
    resources: [
      {
        id: "r1",
        title: "HTML Cheat Sheet",
        type: "pdf",
        size: "1.2 MB",
      },
      {
        id: "r2",
        title: "CSS Reference Guide",
        type: "pdf",
        size: "2.5 MB",
      },
      {
        id: "r3",
        title: "Web Development Tools",
        type: "link",
        url: "https://example.com/tools",
      },
      {
        id: "r4",
        title: "Course Code Repository",
        type: "github",
        url: "https://github.com/example/web-dev-course",
      },
    ],
    announcements: [
      {
        id: "a1",
        title: "Office Hours Schedule Update",
        date: "Oct 10, 2024",
        content:
          "Office hours will now be held on Tuesdays and Thursdays from 3-5 PM. Please sign up for a slot if you need assistance with your assignments.",
      },
      {
        id: "a2",
        title: "CSS Layout Project Extension",
        date: "Oct 15, 2024",
        content:
          "Due to the complexity of the CSS Layout Project, the deadline has been extended by 3 days. The new due date is October 22, 2024.",
      },
    ],
    discussions: [
      {
        id: "d1",
        title: "Help with Flexbox alignment",
        author: "Alex Johnson",
        date: "Oct 14, 2024",
        replies: 5,
        solved: true,
      },
      {
        id: "d2",
        title: "Best practices for responsive design",
        author: "Maria Garcia",
        date: "Oct 12, 2024",
        replies: 8,
        solved: false,
      },
      {
        id: "d3",
        title: "HTML form validation techniques",
        author: "James Wilson",
        date: "Oct 8, 2024",
        replies: 12,
        solved: true,
      },
    ],
  },
}

