import { CastMember, Movie, TVShow } from '../../../shared/models/movie.model';
import { MediaType } from '../../../shared/models/search.model';

export const checkSearchEmptiness = (
    type: MediaType,
    results: { movies: Movie[]; tv: TVShow[]; actors: CastMember[] },
    isLoading: boolean,
    currentInput: string,
    storeQuery: string,
): boolean => {
    if (isLoading || !currentInput || currentInput !== storeQuery) {
        return false;
    }

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
