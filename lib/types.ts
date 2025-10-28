// lib/types.ts
export interface Tournament {
  id: string
  name: string
  organizer: string
  date: string
  prizePool: string
  participants: number
  status: 'completed' | 'upcoming' | 'registration' | 'announced'
  winner: string
  type: 'Professional' | 'Community'
  registrationLink?: string
}

export interface Player {
  id: string
  name: string
  country: string
  rating: number
  rank: number
  tournaments: number
  wins: number
  winRate: number
  recentForm: number[]
  avatar: string
  specialization: string
  achievements: string[]
  totalEarnings: string
  favoriteMap: string
  mainCiv: string
}

export interface MapData {
  id: string
  name: string
  image: string
  type: 'Open' | 'Closed' | 'Water' | 'Hybrid' | 'Nomad'
  description: string
  bestCivs: string[]
  strategies: string[]
  tournaments: string[]
  features: string[]
}

export interface DiscordServer {
  id: string
  name: string
  description: string
  url: string
  featured: boolean
  memberCount?: number
}