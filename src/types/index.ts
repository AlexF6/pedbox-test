// src/types/index.ts

export interface User {
  id: number;
  email: string;
}

export interface Location {
  id: number;
  externalId: number;
  name: string;
  type: string | null;
  dimension: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  id: number;
  externalId: number;
  name: string;
  airDate: string;
  episodeCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterEpisode {
  characterId: number;
  episodeId: number;
  episode: Episode;
}

export interface Character {
  id: number;
  externalId: number;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  image: string;
  locationId: number | null;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterDetail extends Character {
  characterEpisodes: CharacterEpisode[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export interface CharacterListResponse {
  data: Character[];
  pagination: Pagination;
  filters: CharacterFilters;
}

export interface SyncResponse {
  synced: number;
  episodes: number;
  relationships: number;
}