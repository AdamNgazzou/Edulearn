import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "EduLearn - Learning Management System",
  description: "A modern learning management system for students and teachers"
}

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers >
          {children}
          
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'