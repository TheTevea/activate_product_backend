import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TabsProvider>
            {children}
          </TabsProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
