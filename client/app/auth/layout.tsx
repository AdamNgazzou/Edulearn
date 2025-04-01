"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
      };
        
      const token = getCookie("token");
      if (token) {
        router.push("/"); // Redirect if not authenticated
      }else {
        setIsAuthenticated(true);
      }
    }, []);
        
          // Wait for authentication to resolve (Next.js will show loading.tsx automatically)
    if (!isAuthenticated) return null;
  return (<>{children}</>)
}