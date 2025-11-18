import type React from "react"
import type { Metadata } from "next"
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Aoe2 GatherPoint - Tournament Hub",
  description: "Your ultimate destination for Age of Empires 2 tournaments, player stats, and strategic insights",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          {/* 🌗 Global Theme Toggle */}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
