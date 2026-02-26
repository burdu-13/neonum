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
    videos: MovieVideoResponse;
    vote_count: number;
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
    reviews: ReviewResponse;
}

export interface ReviewPayload {
    content: string;
    rating: number;
}

export interface MovieVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes';
}

export interface MovieVideoResponse {
    results: MovieVideo[];
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

export interface Review {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string | null;
        rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    url: string;
}

export interface ReviewResponse {
    results: Review[];
    total_results: number;
}

export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    media_type: 'tv';
}
