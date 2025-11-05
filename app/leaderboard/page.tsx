"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Crown, Medal, Trophy, Sparkles } from "lucide-react"

type DivisionResult = {
  division: string
  player: string
  rating: number | null
}

type TournamentResult = {
  name: string
  date: string
  organizer: string
  winners: DivisionResult[]
  runnerUps: DivisionResult[]
}

export default function LeaderboardPage() {
  const [recentTournaments, setRecentTournaments] = useState<TournamentResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) setRecentTournaments(data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <div className="mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <h1 className="text-5xl font-bold tracking-tight text-balance">Community Leaderboard</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore tournament results and top player performances
            across different divisions.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <Trophy className="h-7 w-7 text-accent" />
            <h2 className="text-3xl font-bold">Recent Tournaments</h2>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading tournament results...</p>
            </div>
          )}

          {!loading && recentTournaments.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">No recent tournaments available.</p>
            </div>
          )}

          <div className="space-y-6">
            {recentTournaments.map((tournament, i) => (
              <Card key={i} className="border-accent/20 hover:border-accent/40 transition-colors overflow-hidden">
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-accent/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                                            <div>
                        <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Crown className="h-4 w-4" />
                            <span>{tournament.organizer}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{tournament.date}</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="hidden sm:block">
                        <Trophy className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                  </CardHeader>
                </div>

                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {tournament.winners.map((winner, wi) => {
                      const runnerUp = tournament.runnerUps.find((r) => r.division === winner.division)

                      return (
                        <div
                          key={wi}
                          className="group relative p-4 rounded-lg border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent hover:from-accent/10 hover:to-accent/5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                              {winner.division}
                            </span>
                            <Badge variant="secondary" className="text-xs font-bold">
                              {winner.rating ?? "—"}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3 pb-3 border-b border-accent/10">
                              <Crown className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground font-medium mb-1">CHAMPION</p>
                                <p className="font-bold text-foreground truncate">{winner.player}</p>
                              </div>
                            </div>

                            {runnerUp && (
                              <div className="flex items-start gap-3">
                                <Medal className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-muted-foreground font-medium mb-1">RUNNER-UP</p>
                                  <p className="text-sm text-muted-foreground truncate">{runnerUp.player}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
