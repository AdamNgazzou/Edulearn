import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered");

  // Get the role from cookies using Next.js's request.cookies API
  const role = request.cookies.get("role")?.value;
  console.log("Role from cookies:", role);

  // Log the requested path
  console.log("Requested path:", request.nextUrl.pathname);

  // Check if the user is trying to access a student route
  if (request.nextUrl.pathname.startsWith("/student")) {
    console.log("Accessing student route");
    // If the role is not "student", redirect to the home page
    if (role !== "student") {
      console.log("Unauthorized access to student route. Redirecting...");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the user is trying to access a teacher route
  if (request.nextUrl.pathname.startsWith("/teacher")) {
    console.log("Accessing teacher route");
    // If the role is not "teacher", redirect to the home page
    if (role !== "instructor") {
      console.log("Unauthorized access to teacher route. Redirecting...");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the user is trying to access an admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("Accessing admin route");
    // If the role is not "admin", redirect to the home page
    if (role !== "admin") {
      console.log("Unauthorized access to admin route. Redirecting...");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to proceed
  console.log("Request authorized. Proceeding...");
  return NextResponse.next();
}

// Define the routes where the middleware should apply
export const config = {
  matcher: [
    "/student/:path*", // Apply middleware to all /student/... routes
    "/teacher/:path*", // Apply middleware to all /teacher/... routes
    "/admin/:path*",   // Apply middleware to all /admin/... routes
  ],
};