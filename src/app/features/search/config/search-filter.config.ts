import { MediaType } from "../../../shared/models/search.model";

export const SEARCH_FILTER_LABELS: Record<MediaType, string> = {
    multi: 'All',
    movie: 'Movies',
    tv: 'TV Shows',
    person: 'Actors',
} as const;

export const SEARCH_FILTER_OPTIONS: MediaType[] = ['multi', 'movie', 'tv', 'person'] as const;