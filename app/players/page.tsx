"use client";

import { useEffect, useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, ExternalLink } from "lucide-react";

function PlayerGlossaryCard({ player }: { player: any }) {
  const getRatingColor = (rating: number | null) => {
    if (!rating) return "text-gray-500 dark:text-gray-400";
    if (rating >= 2400) return "text-yellow-600 dark:text-yellow-400";
    if (rating >= 1800) return "text-orange-600 dark:text-orange-400";
    if (rating >= 1400) return "text-blue-600 dark:text-blue-400";
    if (rating >= 1100) return "text-green-600 dark:text-green-400";
    return "text-purple-600 dark:text-purple-400";
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate hover:text-primary transition-colors">
              {player.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {player.country}
            </CardDescription>
          </div>
          <div className="text-right">
            <div
              className={`font-mono font-semibold ${getRatingColor(player.rating)}`}
            >
              {player.rating ?? "N/A"}
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <a
          href={player.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          View Profile
        </a>
      </CardContent>
    </Card>
  );
}

export default function GlossaryPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch players from your Next.js API
  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data.data || []))
      .catch((err) => console.error("Error fetching players:", err))
      .finally(() => setLoading(false));
  }, []);

  // Unique countries & first letters
  const countries = useMemo(() => {
    const unique = [...new Set(players.map((p) => p.country))].filter(Boolean);
    return unique.sort();
  }, [players]);

  const letters = useMemo(() => {
    const unique = [...new Set(players.map((p) => p.name[0].toUpperCase()))];
    return unique.sort();
  }, [players]);

  // Filters
  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || p.country === selectedCountry;
      const matchesLetter =
        selectedLetter === "all" || p.name[0].toUpperCase() === selectedLetter;

      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "2000+" && p.rating >= 2000) ||
        (selectedRating === "1700-1999" &&
          p.rating >= 1700 &&
          p.rating < 2000) ||
        (selectedRating === "1400-1699" &&
          p.rating >= 1400 &&
          p.rating < 1700) ||
        (selectedRating === "1100-1399" &&
          p.rating >= 1100 &&
          p.rating < 1400) ||
        (selectedRating === "700-1099" &&
          p.rating >= 700 &&
          p.rating < 1100) ||
        (selectedRating === "no-rating" && !p.rating);

      return (
        matchesSearch && matchesCountry && matchesLetter && matchesRating
      );
    });
  }, [players, searchTerm, selectedCountry, selectedLetter, selectedRating]);

  // Group alphabetically
  const groupedPlayers = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    filteredPlayers.forEach((p) => {
      const letter = p.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(p);
    });
    return groups;
  }, [filteredPlayers]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Community Players</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Alphabetical directory of all Age of Empires II community players
          </p>
        </div>

        {/* Filters + Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {/* Country Filter */}
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Countries" />
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

              {/* Rating Filter */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="2000+">2000+ Elo</SelectItem>
                  <SelectItem value="1700-1999">1700-1999 Elo</SelectItem>
                  <SelectItem value="1400-1699">1400-1699 Elo</SelectItem>
                  <SelectItem value="1100-1399">1100-1399 Elo</SelectItem>
                  <SelectItem value="700-1099">700-1099 Elo</SelectItem>
                  <SelectItem value="no-rating">No Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* Letter Filter */}
              <Select value={selectedLetter} onValueChange={setSelectedLetter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All Letters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Letters</SelectItem>
                  {letters.map((letter) => (
                    <SelectItem key={letter} value={letter}>
                      {letter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Loading / Empty states */}
        {loading && (
          <div className="text-center py-12 text-muted-foreground">
            Loading players...
          </div>
        )}

        {!loading && Object.entries(groupedPlayers).length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No players found.</p>
          </div>
        )}

        {/* Grouped Players */}
        {!loading && Object.entries(groupedPlayers).length > 0 && (
          <div className="space-y-8">
            {Object.entries(groupedPlayers)
              .sort()
              .map(([letter, list]) => (
                <div key={letter}>
                  <h2 className="text-2xl font-bold mb-4 text-primary">
                    {letter}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((player: any) => (
                      <PlayerGlossaryCard key={player._id} player={player} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
