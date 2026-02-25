export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    popularity: number;
    adult: boolean;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Credits {
    cast: CastMember[];
}

export interface MovieDetails extends Movie {
    tagline: string | null;
    runtime: number | null;
    genres: { id: number; name: string }[];
    credits: Credits;
    similar: { results: Movie[] };
    account_states?: AccountStates;
}

export interface AccountStates {
    favorite: boolean;
    watchlist: boolean;
    id: number;
    rated: boolean | { value: number };
}

export interface TmdbStatusResponse {
    success: boolean;
    status_code: number;
    status_message: string;
}

export interface WatchlistRequest {
    media_type: 'movie' | 'tv';
    media_id: number;
    watchlist: boolean;
}

export interface FavoriteRequest {
    media_type: 'movie' | 'tv';
    media_id: number;
    favorite: boolean;
}
