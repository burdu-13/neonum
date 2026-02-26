import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
    pipe,
    switchMap,
    tap,
    catchError,
    EMPTY,
    debounceTime,
    distinctUntilChanged,
    filter,
} from 'rxjs';
import { Movie, TVShow } from '../../shared/models/movie.model';
import { ActorDetails } from '../../shared/models/actor.model';
import { SearchApiService } from '../../features/search/services/search-api-service';

interface SearchState {
    query: string;
    movieResults: Movie[];
    tvResults: TVShow[];
    actorResults: ActorDetails[];
    isLoading: boolean;
    searchType: 'multi' | 'movie' | 'tv' | 'person';
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    movieResults: [],
    tvResults: [],
    actorResults: [],
    isLoading: false,
    searchType: 'multi',
    error: null,
};

export const SearchStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, searchService = inject(SearchApiService)) => ({
        updateQuery: (query: string) => patchState(store, { query }),

        updateType: (type: 'multi' | 'movie' | 'tv' | 'person') =>
            patchState(store, { searchType: type }),

        search: rxMethod<string>(
            pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter((q) => q.length > 2),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((query) => {
                    return searchService.multiSearch(query).pipe(
                        tap((results) => {
                            patchState(store, {
                                movieResults: results.filter((r) => r.media_type === 'movie'),
                                tvResults: results.filter((r) => r.media_type === 'tv'),
                                actorResults: results.filter((r) => r.media_type === 'person'),
                                isLoading: false,
                            });
                        }),
                        catchError(() => {
                            patchState(store, { isLoading: false, error: 'Search failed.' });
                            return EMPTY;
                        }),
                    );
                }),
            ),
        ),
    })),
);
