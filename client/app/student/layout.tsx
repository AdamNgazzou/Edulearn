'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, BookOpen, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"


export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { theme, setTheme } = useTheme()


  useEffect(() => {
      setIsHydrated(true); // Ensures the component is only modified after hydration

      const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return null;
      };

      const token = getCookie("token");
      const role = getCookie("role");

      if (!token) {
          router.push("/auth/login");
      } else if (role !== "student") {
          router.push("/");
      } else {
          setIsAuthenticated(true);
      }
  }, []);

  if (!isHydrated) return null; // Avoids mismatch before hydration
  if (!isAuthenticated) return null; // Waits for authentication
  return (
    <>
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <Link href="/" className="text-xl font-bold">
              EduLearn
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 mx-auto">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
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
            
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
                variant="outline"
                size="sm"
                
                onClick={() => {
                  // Clear cookies by setting them to expire in the past
                  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                  document.cookie = "id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

                  // Optionally redirect to the home page or login page
                  window.location.href = "/";
                }}
              >
               <ArrowLeft className="mr-2 h-4 w-4" />
                Log out
              </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">{children}</main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduLearn</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 EduLearn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}