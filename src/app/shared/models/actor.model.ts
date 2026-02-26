import { Movie } from './movie.model';

export interface ActorCredit extends Movie {
    character: string;
    credit_id: string;
    media_type: 'movie' | 'tv';
    name?: string;
    first_air_date?: string;
}

export interface ActorDetails {
    id: number;
    name: string;
    biography: string;
    birthday: string;
    place_of_birth: string;
    profile_path: string;
    gender: number;
    combined_credits: {
        cast: ActorCredit[];
    };
}
