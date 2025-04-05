"use client"
import Link from "next/link"
import { BookOpen, ArrowLeft, FileText, Video, Clock, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { coursesData } from "@/lib/course-data"

export default function CourseContentPage({ courseId, courseData }: { courseId: string , courseData : any}) {
  const course = coursesData[courseId]

  if (!courseData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button asChild className="mt-4">
          <Link href="/student">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  // Calculate total lessons and completed lessons
  const totalLessons = courseData.reduce(
    (acc, course) => acc + course.lessons.length,
    0
  );
  const completedLessons = courseData.reduce(
    (acc, course) =>
      acc + course.lessons.filter((lesson) => lesson.isCompleted).length,
    0
  );

  const overallProgress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Course Header */}

        {/* Course Content */}
        <div className="container px-4 py-8 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Course Content</h2>
            <Button variant="outline" asChild>
              <Link href={`/student/courses/${courseId}/info`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Course Information
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                  • {totalLessons} lessons • 
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {courseData.map((module) => {
                    const totalLessonsPerModule = module.lessons.length;
                    const completedLessons = module.lessons.filter((lesson) => lesson.isCompleted).length;
                    const progress = totalLessonsPerModule > 0 ? Math.round((completedLessons / totalLessonsPerModule) * 100) : 0;
                    return (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex flex-1 items-center justify-between pr-4">
                            <div>
                              <h3 className="text-base font-medium">{module.title}</h3>
                              <p className="text-sm text-muted-foreground">{module.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{totalLessonsPerModule} lessons</Badge>
                              <div className="flex items-center gap-1">
                                <Progress value={progress} className="h-2 w-16" />
                                <span className="text-xs">{progress}%</span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {module.lessons.map((lesson) => (
                              <Link
                                key={lesson.id}
                                href={`/student/courses/${courseId}/content/${lesson.id}`}
                                className="block"
                              >
                                <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50 cursor-pointer">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`rounded-md p-1.5 ${
                                        lesson.isCompleted
                                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                          : "bg-muted text-muted-foreground"
                                      }`}
                                    >
                                      {lesson.isCompleted ? (
                                        <CheckCircle className="h-4 w-4" />
                                      ) : lesson.type === "video" ? (
                                        <Video className="h-4 w-4" />
                                      ) : (
                                        <FileText className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{lesson.title}</p>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge variant="outline" className="text-xs">
                                          {lesson.type === "video"
                                            ? "Video"
                                            : lesson.type === "reading"
                                            ? "Reading"
                                            : "Assignment"}
                                        </Badge>
                                        <span>{lesson.duration}</span>
                                        {lesson.due_date && (
                                          <>
                                            <span>•</span>
                                            <span>Due: {lesson.due_date}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Play className="h-4 w-4" />
                                  </Button>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
              </Card>

              {/* Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Important updates from your instructor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.announcements.map((announcement) => (
                      <div key={announcement.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <span className="text-xs text-muted-foreground">{announcement.date}</span>
                        </div>
                        <p className="mt-2 text-sm">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Continue Learning */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  {/* Find the next incomplete lesson */}
                  {(() => {
                    const nextLesson = courseData
                      .flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleName: m.title })))
                      .find((l) => !l.isCompleted)

                    if (nextLesson) {
                      return (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{nextLesson.moduleName}</p>
                          <div className="flex items-start gap-3 rounded-md border p-3">
                            <div className="rounded-md bg-primary/10 p-2 text-primary">
                              {nextLesson.type === "video" ? (
                                <Video className="h-5 w-5" />
                              ) : nextLesson.type === "reading" ? (
                                <BookOpen className="h-5 w-5" />
                              ) : (
                                <FileText className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{nextLesson.title}</p>
                              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{nextLesson.duration}</span>
                              </div>
                              {nextLesson.dueDate && (
                                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>Due: {nextLesson.dueDate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="text-center py-4">
                          <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                          <p className="mt-2 font-medium">Course completed!</p>
                          <p className="text-sm text-muted-foreground">You've completed all lessons in this course.</p>
                        </div>
                      )
                    }
                  })()}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link
                      href={`/student/courses/${courseId}/content/${
                        courseData
                          .flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })))
                          .find((l) => !l.completed)?.id || courseData[0].lessons[0].id
                      }`}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Overall Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-medium">{overallProgress}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>

                    {/* Module Progress */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Module Progress</h4>
                      {courseData.map((course) => {
                        const moduleTotal = course.lessons.length;
                        const moduleCompleted = course.lessons.filter(
                          (lesson) => lesson.isCompleted
                        ).length;
                        const moduleProgress =
                          moduleTotal > 0
                            ? Math.round((moduleCompleted / moduleTotal) * 100)
                            : 0;

                        return (
                          <div key={course.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">{course.title}</span>
                              <span className="text-xs">{moduleProgress}%</span>
                            </div>
                            <Progress value={moduleProgress} className="h-1.5" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

