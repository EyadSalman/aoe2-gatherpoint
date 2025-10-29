// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Generic API fetcher
async function apiFetch(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

// Tournament API functions
export const tournamentApi = {
  // Get all tournaments with optional filters
  getAll: async (params?: {
    year?: string;
    status?: string;
    type?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.year) queryParams.append('year', params.year);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/api/tournaments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiFetch(endpoint);
  },

  // Get single tournament
  getById: async (id: string) => {
    return apiFetch(`/api/tournaments/${id}`);
  },

  // Get tournament statistics
  getStats: async () => {
    return apiFetch('/api/tournaments/stats/overview');
  },
};

// Player API functions
export const playerApi = {
  // Get all players with optional filters
  getAll: async (params?: {
    search?: string;
    country?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minRating?: number;
    maxRating?: number;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.country) queryParams.append('country', params.country);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.maxRating) queryParams.append('maxRating', params.maxRating.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/api/players${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiFetch(endpoint);
  },

  // Get top players
  getTopRankings: async (limit = 50, category = 'all') => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (category !== 'all') params.append('category', category);
    
    return apiFetch(`/api/players/top/rankings?${params.toString()}`);
  },

  // Get rising star players
  getRisingStars: async (limit = 20) => {
    return apiFetch(`/api/players/rising/stars?limit=${limit}`);
  },

  // Get single player
  getById: async (id: string) => {
    return apiFetch(`/api/players/${id}`);
  },
};

// Map API functions
export const mapApi = {
  // Get all maps with optional filters
  getAll: async (params?: {
    type?: string;
    search?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.type && params.type !== 'All') queryParams.append('type', params.type);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/api/maps${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiFetch(endpoint);
  },

  // Get single map
  getById: async (id: string) => {
    return apiFetch(`/api/maps/${id}`);
  },

  // Get map statistics
  getStats: async () => {
    return apiFetch('/api/maps/stats/overview');
  },
};

// Discord API functions
export const discordApi = {
  // Get Discord servers
  getServers: async (params?: {
    featured?: boolean;
    category?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.category) queryParams.append('category', params.category);

    const endpoint = `/api/discord/servers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiFetch(endpoint);
  },
};

// Auth API functions (for future admin features)
export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getProfile: async (token: string) => {
    return apiFetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
