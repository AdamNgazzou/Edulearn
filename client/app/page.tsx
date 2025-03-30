'use client'
import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Helper function to get a cookie value by name
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    // Check if a token exists in cookies
    const token = getCookie("token");
    const userRole = getCookie("role");

    setIsLoggedIn(!!token); // Set `isLoggedIn` to true if token exists
    setRole(userRole ?? null); // Set the role from cookies, defaulting undefined to null
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">EduLearn</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            {role === "student" && (
              <>
                <Link href="/student" className="text-sm font-medium text-primary">
                  Dashboard
                </Link>
                <Link href="/student/courses" className="text-sm font-medium transition-colors hover:text-primary">
                  My Courses
                </Link>
                <Link href="/student/teachers" className="text-sm font-medium transition-colors hover:text-primary">
                  My Teachers
                </Link>
                <Link href="/student/profile" className="text-sm font-medium transition-colors hover:text-primary">
                  Profile
                </Link>
              </>
            )}
            {role === "teacher" && (
              <>
                <Link href="/teacher" className="text-sm font-medium text-primary">
                  Dashboard
                </Link>
                <Link href="/teacher/courses" className="text-sm font-medium transition-colors hover:text-primary">
                  My Courses
                </Link>
                <Link href="/teacher/students" className="text-sm font-medium transition-colors hover:text-primary">
                  My Students
                </Link>
                <Link href="/teacher/profile" className="text-sm font-medium transition-colors hover:text-primary">
                  Profile
                </Link>
              </>
            )}
            {role === "admin" && (
              <Link href="/admin" className="text-sm font-medium text-primary">
                Admin Dashboard
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="outline" size="sm">
                  <Link href="/auth/login" className="text-sm font-medium transition-colors hover:text-primary">
                    Log in
                  </Link>
                </Button>
                <Button size="sm">
                  <Link href="/auth/register" className="text-sm font-medium transition-colors hover:text-primary">
                    Sign up
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Clear cookies by setting them to expire in the past
                  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                  
                  // Update state
                  setIsLoggedIn(false);
                  setRole(null);

                  // Optionally redirect to the home page or login page
                  window.location.href = "/";
                }}
              >
                Log out
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Learn at your own pace, anywhere, anytime
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Access high-quality courses taught by expert instructors. Enhance your skills and advance your
                    career with our comprehensive learning platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Explore Courses
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Hero Image"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Courses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular courses and start learning today
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Web Development",
                  description: "Learn HTML, CSS, and JavaScript to build modern websites",
                  icon: <BookOpen className="h-10 w-10" />,
                },
                {
                  title: "Data Science",
                  description: "Master data analysis, visualization, and machine learning",
                  icon: <Users className="h-10 w-10" />,
                },
                {
                  title: "Digital Marketing",
                  description: "Develop skills in SEO, social media, and content marketing",
                  icon: <Award className="h-10 w-10" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">{item.icon}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                  <Button variant="outline" className="mt-auto">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Learning Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with thousands of learners and instructors from around the world
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  Sign Up Now
                </Button>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduLearn</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 EduLearn. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

