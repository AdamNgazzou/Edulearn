"use client"

import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />

    </ThemeProvider>
    </>
  )
}

