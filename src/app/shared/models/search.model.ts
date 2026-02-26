import { ActorDetails } from './actor.model';
import { Movie, TVShow } from './movie.model';

export type MediaType = 'multi' | 'movie' | 'tv' | 'person';

export type SearchResultItem =
    | (Movie & { media_type: 'movie' })
    | (TVShow & { media_type: 'tv' })
    | (ActorDetails & { media_type: 'person' });
