import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExternalLink, Users, Calendar, Trophy, Zap, Heart } from "lucide-react"
import Link from "next/link"

const discordServers = [
  {
    name: "AoeLeagues",
    description: "Premier competitive Age of Empires 2 tournaments and leagues",
    url: "https://discord.gg/5dkUe5xtzq",
    featured: true,
  },
  {
    name: "T90 Community Tournaments",
    description: "Community-driven tournaments hosted by T90Official",
    url: "https://discord.com/invite/vMpPuPjba8",
    featured: true,
  },
  {
    name: "Practice Squad",
    description: "Find practice partners and improve your gameplay",
    url: "https://discord.gg/SzUxGRK3Ez",
    featured: true,
  },
  {
    name: "Akkal",
    description: "Competitive tournaments and strategic discussions",
    url: "https://discord.gg/6PedAG6vGv",
    featured: true,
  },
  {
    name: "Alchemy AOE Community",
    description: "High-level competitive play and tournament organization",
    url: "https://discord.gg/gd5rht665X",
    featured: true,
  },
  {
    name: "Low Elo Legion",
    description: "Tournaments and community for players of all skill levels",
    url: "https://discord.gg/etdpkXuyzK",
    featured: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Welcome to <span className="text-primary">Aoe2 GatherPoint</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Your ultimate hub for Age of Empires 2 Community tournaments, player statistics, strategic insights, and
              community connections. Join the most active tournament communities and elevate your gameplay.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/tournaments">
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Tournaments
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/maps">
                  <Trophy className="mr-2 h-4 w-4" />
                  Explore Maps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Discord Communities Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-balance">Join Community Tournaments</h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Connect with the most active Age of Empires 2 tournament Discord servers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discordServers.map((server) => (
              <Card
                key={server.name}
                className={cn("relative transition-all hover:shadow-lg", server.featured && "ring-2 ring-primary/20")}
              >
                {server.featured && (
                  <Badge className="absolute -top-2 left-4 bg-primary">
                    <Zap className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {server.name}
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="text-pretty">{server.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Button size="sm" asChild>
                      <a href={server.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Join Discord
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Active Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground">Registered Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Tournament Maps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Patreon Support Section */}
      <section className="py-16 px-4 border-t">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary mr-3" />
                  <CardTitle className="text-2xl font-bold">Support the Community</CardTitle>
                </div>
                <CardDescription className="text-lg text-pretty">
                  Help <span className="font-semibold text-foreground">superhero55</span> continue building amazing
                  tools and content for the Age of Empires 2 community. Your support helps maintain servers, develop new
                  features, and create valuable content for players worldwide.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-primary">🛠️</div>
                    <div className="text-sm font-medium mt-2">Tool Development</div>
                    <div className="text-xs text-muted-foreground mt-1">New features & improvements</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-primary">🎥</div>
                    <div className="text-sm font-medium mt-2">Content Creation</div>
                    <div className="text-xs text-muted-foreground mt-1">Tutorials & guides</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-primary">⚡</div>
                    <div className="text-sm font-medium mt-2">Server Costs</div>
                    <div className="text-xs text-muted-foreground mt-1">Keeping everything running</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" asChild className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white">
                    <a
                      href="https://www.patreon.com/superhero55"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Support on Patreon
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <div className="text-sm text-muted-foreground">Every contribution helps! ❤️</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
