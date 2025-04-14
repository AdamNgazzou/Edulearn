"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Download, Clock, FileText, MessageSquare, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Mock data for submission details
const getSubmissionData = (assignmentId: string, submissionId: string) => {
  // This would typically come from an API call
  return {
    id: Number.parseInt(submissionId),
    assignmentId: Number.parseInt(assignmentId),
    assignmentTitle: "Promises and Async/Await",
    course: "Advanced JavaScript Programming",
    studentName: "Alex Johnson",
    studentId: "S12345",
    submittedAt: "2025-04-12T14:30:00Z",
    status: "submitted",
    grade: null,
    feedback: null,
    late: false,
    maxPoints: 100,
    rubric: [
      {
        id: 1,
        criteria: "Implementation of Promises",
        maxPoints: 30,
        description: "Proper use of Promise syntax and chaining",
        score: null,
      },
      {
        id: 2,
        criteria: "Implementation of async/await",
        maxPoints: 30,
        description: "Correct use of async/await syntax",
        score: null,
      },
      {
        id: 3,
        criteria: "Error Handling",
        maxPoints: 20,
        description: "Proper error handling with try/catch or .catch()",
        score: null,
      },
      {
        id: 4,
        criteria: "Code Quality",
        maxPoints: 20,
        description: "Clean, readable, and well-documented code",
        score: null,
      },
    ],
    submissionContent: {
      files: [
        {
          id: 1,
          name: "promises.js",
          type: "javascript",
          content: `// Implementation of Promise-based API fetching
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulating API call
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: 'User ' + userId,
          email: 'user' + userId + '@example.com'
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// Promise chaining example
fetchUserData(1)
  .then(user => {
    console.log('User data:', user);
    return fetchUserPosts(user.id);
  })
  .then(posts => {
    console.log('User posts:', posts);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to fetch user posts
function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve([
          { id: 1, title: 'Post 1', body: 'Content of post 1' },
          { id: 2, title: 'Post 2', body: 'Content of post 2' }
        ]);
      } else {
        reject(new Error('Invalid user ID for posts'));
      }
    }, 1000);
  });
}`,
        },
        {
          id: 2,
          name: "async-await.js",
          type: "javascript",
          content: `// Implementation using async/await
async function getUserData(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('Async/Await - User data:', user);
    
    const posts = await fetchUserPosts(user.id);
    console.log('Async/Await - User posts:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Async/Await - Error fetching data:', error);
    throw error;
  }
}

// Execute the async function
getUserData(1)
  .then(result => {
    console.log('All data fetched successfully:', result);
  })
  .catch(error => {
    console.error('Failed to fetch all data:', error);
  });

// Error handling example
async function getUserWithErrorHandling(userId) {
  try {
    // This will throw an error for userId <= 0
    const user = await fetchUserData(userId);
    return user;
  } catch (error) {
    console.error('Error caught in async function:', error.message);
    return { id: 0, name: 'Default User', email: 'default@example.com' };
  }
}

// Test error handling
getUserWithErrorHandling(-1)
  .then(user => {
    console.log('User (with error handling):', user);
  });`,
        },
      ],
      comments: [
        {
          id: 1,
          text: "I implemented both Promise-based and async/await approaches to demonstrate the differences between them.",
          timestamp: "2025-04-12T14:25:00Z",
        },
        {
          id: 2,
          text: "I added error handling in both implementations to show how errors can be caught and processed.",
          timestamp: "2025-04-12T14:28:00Z",
        },
      ],
    },
  }
}

export default function SubmissionGradingPage(props: {
  params: Promise<{ assignmentId: string; submissionId: string }>;
}) {
  const { assignmentId, submissionId } = use(props.params);
  const submissionData = getSubmissionData(assignmentId, submissionId);
  const [activeFile, setActiveFile] = useState(submissionData.submissionContent.files[0].id)
  const [rubricScores, setRubricScores] = useState(
    submissionData.rubric.map((item) => ({ id: item.id, score: item.score || 0 })),
  )
  const [feedback, setFeedback] = useState(submissionData.feedback || "")
  const [finalGrade, setFinalGrade] = useState(submissionData.grade || 0)
  const [isSaving, setIsSaving] = useState(false)

  // Calculate total score from rubric
  const totalRubricScore = rubricScores.reduce((total, item) => total + item.score, 0)

  // Update final grade when rubric scores change
  const updateRubricScore = (id: number, score: number) => {
    const newScores = rubricScores.map((item) => (item.id === id ? { ...item, score } : item))
    setRubricScores(newScores)
    const newTotal = newScores.reduce((total, item) => total + item.score, 0)
    setFinalGrade(newTotal)
  }

  // Handle saving the grade
  const handleSaveGrade = () => {
    setIsSaving(true)
    // This would typically be an API call to save the grade
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or redirect
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/teacher/assignments/${assignmentId}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{submissionData.assignmentTitle}</h1>
                <p className="text-muted-foreground">Student Submission</p>
              </div>
            </div>

            {/* Main content */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left column - Student info and grading */}
              <div className="space-y-6">
                {/* Student info card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={submissionData.studentName} />
                        <AvatarFallback>{submissionData.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{submissionData.studentName}</h3>
                        <p className="text-sm text-muted-foreground">ID: {submissionData.studentId}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Submitted: {new Date(submissionData.submittedAt).toLocaleString()}
                          {submissionData.late && " (Late)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{submissionData.submissionContent.files.length} files submitted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{submissionData.submissionContent.comments.length} comments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Grading rubric */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Grading Rubric</CardTitle>
                    <CardDescription>Assign points for each criteria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {submissionData.rubric.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`rubric-${item.id}`}>{item.criteria}</Label>
                            <span className="text-sm text-muted-foreground">/{item.maxPoints} points</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`rubric-${item.id}`}
                              type="number"
                              min="0"
                              max={item.maxPoints}
                              value={rubricScores.find((score) => score.id === item.id)?.score || 0}
                              onChange={(e) => updateRubricScore(item.id, Number.parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                            <p className="text-xs text-muted-foreground flex-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <Label htmlFor="final-grade" className="font-medium">
                        Final Grade
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="final-grade"
                          type="number"
                          min="0"
                          max={submissionData.maxPoints}
                          value={finalGrade}
                          onChange={(e) => setFinalGrade(Number.parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">/{submissionData.maxPoints}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Feedback</CardTitle>
                    <CardDescription>Provide feedback to the student</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter your feedback here..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={6}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setFeedback("")}>
                      Clear
                    </Button>
                    <Button onClick={handleSaveGrade} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <span className="mr-2">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Grade
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Right column - Submission content */}
              <div className="lg:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Submission</CardTitle>
                    <Tabs
                      defaultValue={submissionData.submissionContent.files[0].id.toString()}
                      onValueChange={(value) => setActiveFile(Number.parseInt(value))}
                    >
                      <TabsList className="mb-2">
                        {submissionData.submissionContent.files.map((file) => (
                          <TabsTrigger key={file.id} value={file.id.toString()}>
                            {file.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {submissionData.submissionContent.files.map((file) => (
                        <TabsContent key={file.id} value={file.id.toString()} className="flex-1">
                          <div className="relative rounded-md border bg-muted">
                            <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                              <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <span className="text-sm font-medium">{file.name}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                            <pre className="p-4 overflow-auto text-sm h-[500px]">
                              <code>{file.content}</code>
                            </pre>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Student Comments</h3>
                      <div className="space-y-3">
                        {submissionData.submissionContent.comments.map((comment) => (
                          <div key={comment.id} className="bg-muted p-3 rounded-md">
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(comment.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
