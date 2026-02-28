import { Movie } from '../../../shared/models/movie.model';

export interface ExploreFilters {
    page: number;
    sort_by: string;
    with_genres?: string;
    'vote_average.gte'?: number;
    'vote_count.gte'?: number;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    type: 'movie' | 'tv';
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface ExploreCacheEntry {
    results: Movie[];
    total: number;
    totalPages: number;
}
