import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { TabsProvider } from "@/components/dashboard/tabs-context"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Telegram Subscription Admin Dashboard",
  description: "Admin dashboard for managing digital subscription services",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-black text-white antialiased`}>
        <TabsProvider>
          {children}
        </TabsProvider>
        <Toaster />
      </body>
    </html>
  )
}
