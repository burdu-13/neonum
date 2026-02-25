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

// Add this to resolve the 'MovieResponse' error
export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// Ensure these are also exported for the detail view
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
}
