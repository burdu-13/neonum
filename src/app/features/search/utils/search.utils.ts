import { CastMember, Movie, TVShow } from '../../../shared/models/movie.model';

export const checkSearchEmptiness = (
    type: 'multi' | 'movie' | 'tv' | 'person',
    results: { movies: Movie[]; tv: TVShow[]; actors: CastMember[] },
    isLoading: boolean,
    queryLength: number,
): boolean => {
    if (isLoading || queryLength <= 2) return false;

    const hasMovies = results.movies.length > 0;
    const hasTV = results.tv.length > 0;
    const hasActors = results.actors.length > 0;

    switch (type) {
        case 'movie':
            return !hasMovies;
        case 'tv':
            return !hasTV;
        case 'person':
            return !hasActors;
        case 'multi':
            return !hasMovies && !hasTV && !hasActors;
        default:
            return false;
    }
};
