import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get user role from cookies
  const role = request.cookies.get("role")?.value;

  // Define role-based access rules
  const protectedRoutes: Record<string, string> = {
    "/student": "student",
    "/teacher": "teacher",
    "/admin": "admin",
  };

  // Find which protected path matches the request
  for (const [path, requiredRole] of Object.entries(protectedRoutes)) {
    if (request.nextUrl.pathname.startsWith(path)) {
      // Redirect if the user does not have the required role
      if (role !== requiredRole) {
        return NextResponse.redirect(request.nextUrl.clone().origin + "/");
      }
    }
  }

  // Allow request to proceed if role matches
  return NextResponse.next();
}

// Define protected routes for middleware
export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/admin/:path*"],
};
