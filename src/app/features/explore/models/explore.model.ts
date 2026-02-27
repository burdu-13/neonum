export interface ExploreFilters {
    page: number;
    with_genres?: string;
    sort_by: string;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    'vote_average.gte'?: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}
