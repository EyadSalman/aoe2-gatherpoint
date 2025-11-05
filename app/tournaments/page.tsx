"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Trophy, Banknote, Clock, ExternalLink, Loader2 } from "lucide-react"

function TournamentCard({ tournament }: { tournament: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "registration":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "announced":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "Professional"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  }

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{tournament.name}</CardTitle>
            <CardDescription>Organized by {tournament.organizer}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(tournament.status)}>{tournament.status}</Badge>
            <Badge className={getTypeColor(tournament.type)}>{tournament.type}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* 🗓️ Start Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Begins: {new Date(tournament.date).toLocaleDateString()}</span>
          </div>

          {/* 💰 Prize Pool */}
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            <span>${tournament.prizePool.amount.toLocaleString()}</span>
          </div>

          {/* 🏆 Format */}
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span>{tournament.format}</span>
          </div>

          {/* ⏰ Dynamic Info */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {tournament.status === "ongoing"
                ? `Playoffs started: ${tournament.playoffsStarted ? "Yes" : "No"}`
                : tournament.status === "registration" || tournament.status === "announced"
                ? tournament.registrationDeadline
                  ? `Deadline: ${new Date(tournament.registrationDeadline).toLocaleDateString()}`
                  : "Deadline: TBD"
                : tournament.status === "completed"
                ? "Tournament Completed"
                : "Coming Soon"}
            </span>
          </div>
        </div>

        {/* 📝 Registration Button */}
        {tournament.status === "registration" && tournament.registrationLink && (
          <div className="mt-4">
            <Button className="w-full" asChild>
              <a href={tournament.registrationLink} target="_blank" rel="noopener noreferrer">
                Register Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function TournamentsPage() {
  const [currentTournaments, setCurrentTournaments] = useState<any[]>([])
  const [upcomingTournaments, setUpcomingTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Fetch tournaments (ongoing & registration)
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const [ongoingRes, registrationRes] = await Promise.all([
          fetch("/api/tournaments?status=ongoing"),
          fetch("/api/tournaments?status=registration"),
        ])

        const ongoingData = await ongoingRes.json()
        const registrationData = await registrationRes.json()

        setCurrentTournaments(ongoingData.data || [])
        setUpcomingTournaments(registrationData.data || [])
      } catch (err) {
        console.error("Error fetching tournaments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Community Tournaments</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover current and upcoming Age of Empires 2 tournaments from the community
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Tournaments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Tournaments</TabsTrigger>
          </TabsList>

          {/* 🟢 Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
              <p className="text-muted-foreground">Loading tournaments...</p>
            </div>
          ) : (
            <>
              <TabsContent value="current" className="mt-6">
                {currentTournaments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No current tournaments found.
                  </p>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {currentTournaments.map((t) => (
                      <TournamentCard key={t._id} tournament={t} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingTournaments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No upcoming tournaments found.
                  </p>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {upcomingTournaments.map((t) => (
                      <TournamentCard key={t._id} tournament={t} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  )
}
