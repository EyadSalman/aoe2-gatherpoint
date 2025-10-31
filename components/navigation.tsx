"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Trophy, Users, Map, Calendar, Home } from "lucide-react"
import { Award } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tournaments", href: "/tournaments", icon: Calendar },
  { name: "Players", href: "/players", icon: Users },
  { name: "Maps", href: "/maps", icon: Map },
  { name: "Leaderboard", href: "/leaderboard", icon: Award },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-balance">Aoe2 GatherPoint</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
