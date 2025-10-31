"use client"

import { useEffect, useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, ExternalLink, Zap, Users, Globe } from "lucide-react"

function PlayerCard({ player }: { player: any }) {
  const getRatingColor = (rating: number | null) => {
  if (rating === null || rating === undefined)
    return "bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-200"; // no rating
  if (rating >= 2000)
    return "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200"; // 2000+
  if (rating >= 1700 && rating < 2000)
    return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"; // 1700–1999
  if (rating >= 1400 && rating < 1700)
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"; // 1400–1699
  if (rating >= 1100 && rating < 1400)
    return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"; // 1100–1399
  if (rating >= 700 && rating < 1100)
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"; // 700–1099
  if (rating > 0 && rating < 700)
    return "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200"; // 0–699
  return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"; // fallback
};



  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
              {player.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{player.country}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Rating</span>
          <div className="flex flex-col items-end gap-1">
            <Badge className={`${getRatingColor(player.rating)} font-mono font-semibold`}>
              {player.rating ?? "N/A"}
            </Badge>
          </div>
        </div>

        <a
          href={player.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium group/link"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Profile
          <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
        </a>
      </CardContent>
    </Card>
  )
}

export default function GlossaryPage() {
  const [players, setPlayers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [selectedLetter, setSelectedLetter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data.data || []))
      .catch((err) => console.error("Error fetching players:", err))
      .finally(() => setLoading(false))
  }, [])

  const countries = useMemo(() => {
    const unique = [...new Set(players.map((p) => p.country))].filter(Boolean)
    return unique.sort()
  }, [players])

  const letters = useMemo(() => {
  const lettersSet = new Set<string>()
  let hasOthers = false

  players.forEach((p) => {
    const firstChar = p.name?.[0]?.toUpperCase() || "#"
    if (/^[A-Z]$/.test(firstChar)) {
      lettersSet.add(firstChar)
    } else {
      hasOthers = true
    }
  })

  const sorted = Array.from(lettersSet).sort()
  if (hasOthers) sorted.unshift("#") // Add “Others” at the start
  return sorted
}, [players])



  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.country.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCountry = selectedCountry === "all" || p.country === selectedCountry
      const matchesLetter =
        selectedLetter === "all" ||
        (selectedLetter === "#" && !/^[A-Z]/i.test(p.name[0])) ||
        p.name[0].toUpperCase() === selectedLetter


      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "2000+" && p.rating >= 2000) ||
        (selectedRating === "1700-1999" && p.rating >= 1700 && p.rating < 2000) ||
        (selectedRating === "1400-1699" && p.rating >= 1400 && p.rating < 1700) ||
        (selectedRating === "1100-1399" && p.rating >= 1100 && p.rating < 1400) ||
        (selectedRating === "700-1099" && p.rating >= 700 && p.rating < 1100) ||
        (selectedRating === "0-699" && p.rating > 0 && p.rating < 700) ||
        (selectedRating === "no-rating" && !p.rating)
      return matchesSearch && matchesCountry && matchesLetter && matchesRating
    })
  }, [players, searchTerm, selectedCountry, selectedLetter, selectedRating])

  const groupedPlayers = useMemo(() => {
  const groups: { [key: string]: any[] } = { "#": [] }

  filteredPlayers.forEach((p) => {
    const firstChar = p.name[0]?.toUpperCase() || "#"
    const letter = /^[A-Z]$/.test(firstChar) ? firstChar : "#"
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(p)
  })

  return groups
}, [filteredPlayers])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-primary rounded-full" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Community Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-3">Age of Empires II Players</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the glossary of community players. Search, filter, and discover players by skill level,
            country, and name.
          </p>
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by player name or country..."
                className="pl-10 h-11 bg-card border-border/50 focus:border-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Selects */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-11 bg-card border-border/50 focus:border-primary/50">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="h-11 bg-card border-border/50 focus:border-primary/50">
                  <Zap className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="2000+">2000+ Elo</SelectItem>
                  <SelectItem value="1700-1999">1700-1999 Elo</SelectItem>
                  <SelectItem value="1400-1699">1400-1699 Elo</SelectItem>
                  <SelectItem value="1100-1399">1100-1399 Elo</SelectItem>
                  <SelectItem value="700-1099">700-1099 Elo</SelectItem>
                  <SelectItem value="0-699">Below 700 Elo</SelectItem>
                  <SelectItem value="no-rating">No Rating</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLetter} onValueChange={setSelectedLetter}>
              <SelectTrigger className="h-11 bg-card border-border/50 focus:border-primary/50">
                <SelectValue placeholder="Letter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Letters</SelectItem>
                {letters.map((letter) => (
                  <SelectItem key={letter} value={letter}>
                    {letter === "#" ? "Others" : letter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <span>Loading players...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && Object.entries(groupedPlayers).length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No players found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search term</p>
          </div>
        )}

        {!loading && Object.entries(groupedPlayers).length > 0 && (
            <div className="space-y-12">
              {Object.entries(groupedPlayers)
                .filter(([letter]) => {
                  if (selectedLetter === "all") return true
                  if (selectedLetter === "#" && letter === "#") return true
                  return letter === selectedLetter
                })
                .sort(([a], [b]) => {
                  if (a === "#") return -1
                  if (b === "#") return 1
                  return a.localeCompare(b)
                })
                .map(([letter, list]) => (
                  <section key={letter}>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-3xl font-bold text-primary">
                        {letter === "#" ? "Others" : letter}
                      </h2>
                      <Badge variant="secondary" className="text-sm">
                        {list.length} player{list.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {list.map((player: any) => (
                        <PlayerCard key={player._id} player={player} />
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          )}


        {!loading && players.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border/50">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Community Insights</h2>
              <p className="text-muted-foreground">Key statistics about the Age of Empires II player community</p>
            </div>

            {(() => {
              const totalPlayers = players.length
              const ratedPlayers = players.filter((p) => p.rating)
              const avgElo =
                ratedPlayers.length > 0
                  ? Math.round(ratedPlayers.reduce((sum, p) => sum + p.rating, 0) / ratedPlayers.length)
                  : "N/A"

              const countryCounts: Record<string, number> = {}
              players.forEach((p) => {
                if (p.country && p.country !== "Unknown") {
                  countryCounts[p.country] = (countryCounts[p.country] || 0) + 1
                }
              })
              const topCountries = Object.entries(countryCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)

              return (
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Total Players Card */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Total Players</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{totalPlayers}</div>
                      <p className="text-xs text-muted-foreground mt-1">Active community members</p>
                    </CardContent>
                  </Card>

                  {/* Average Rating Card */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Average Elo</CardTitle>
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{avgElo}</div>
                      <p className="text-xs text-muted-foreground mt-1">Based on {ratedPlayers.length} rated players</p>
                    </CardContent>
                  </Card>

                  {/* Top Countries Card */}
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Top Countries</CardTitle>
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {topCountries.map(([country, count], idx) => (
                          <li key={country} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-primary/60">#{idx + 1}</span>
                              {country}
                            </span>
                            <Badge variant="outline">{count}</Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )
            })()}
          </section>
        )}
      </main>
    </div>
  )
}
