"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Map as MapIcon, Search, Trophy, Zap, Target, Shield, Sword } from "lucide-react"


type MapType = {
  _id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  strategies: string[];
  tournaments: string[];
  features: string[];
  bestCivilizations?: string[];
};



const categories = ["All", "Open", "Closed", "Water", "Hybrid", "Nomad"];

function MapCard({ map }: { map: MapType }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Open":
        return <Target className="h-4 w-4" />;
      case "Water":
        return <Zap className="h-4 w-4" />;
      case "Hybrid":
        return <Shield className="h-4 w-4" />;
      case "Closed":
        return <Sword className="h-4 w-4" />;
      case "Nomad":
        return <MapIcon className="h-4 w-4" />;
      default:
        return <MapIcon className="h-4 w-4" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={map.image || "/placeholder.svg"}
              alt={map.name}
              fill
              className="object-cover transition-transform hover:scale-110"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              {map.name}
              {getTypeIcon(map.type)}
            </CardTitle>
            <CardDescription>{map.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center text-sm text-muted-foreground">
              <Badge variant="secondary">{map.type}</Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* === DIALOG CONTENT === */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon(map.type)}
            {map.name}
          </DialogTitle>
          <DialogDescription>{map.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left side — Image + basic info */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={map.image || "/placeholder.svg"}
                alt={map.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm">
  <p>
    <span className="font-medium">Type:</span> {map.type}
  </p>
</div>
        </div>

          {/* Right side — Tabs for details */}
          <div className="space-y-6">
            <Tabs defaultValue="strategies" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strategies" className="text-xs">
                  Strategies
                </TabsTrigger>
                <TabsTrigger value="civs" className="text-xs">
                  Best Civs
                </TabsTrigger>
                <TabsTrigger value="tournaments" className="text-xs">
                  Tournaments
                </TabsTrigger>
              </TabsList>

              {/* Strategies */}
              <TabsContent value="strategies" className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Recommended Strategies</h4>
                  {map.strategies?.length ? (
                    <ul className="space-y-2">
                      {map.strategies.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Target className="h-3 w-3 text-primary mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No strategies listed.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Best Civs */}
              <TabsContent value="civs" className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Best Civilizations</h4>
                  {map.bestCivilizations?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {map.bestCivilizations.map((civ) => (
                        <Badge key={civ} variant="secondary">
                          {civ}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No civilizations listed.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Tournaments */}
              <TabsContent value="tournaments" className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Featured in Tournaments</h4>
                  {map.tournaments?.length ? (
                    <div className="space-y-2">
                      {map.tournaments.map((tournament) => (
                        <div
                          key={tournament}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Trophy className="h-3 w-3 text-primary mt-0.5" />
                          <span>{tournament}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No tournament data available.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Key Features */}
            <div>
              <h4 className="font-medium mb-2">Key Features</h4>
              {map.features?.length ? (
                <div className="flex flex-wrap gap-2">
                  {map.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No key features listed.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



export default function MapsPage() {
  const [maps, setMaps] = useState<MapType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
  fetch("/api/maps")
    .then((res) => res.json())
    .then((data) => {
      if (data.success && Array.isArray(data.data)) {
        setMaps(data.data);
      }
    })
    .catch((err) => console.error("Error fetching maps:", err));
}, []);

  const filteredMaps = (maps || []).filter((map) => {
  const matchesSearch =
    map.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    map.description.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategory === "All" || map.type === selectedCategory;
  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-balance">Tournament Maps</h1>
          <p className="mt-2 text-lg text-muted-foreground text-pretty">
            Explore strategic maps used in competitive Age of Empires 2 tournaments
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search maps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Maps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMaps.map((map) => (
            <MapCard key={map._id || map._id} map={map} />
          ))}
        </div>

        {filteredMaps.length === 0 && (
          <div className="text-center py-12">
            <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No maps found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
