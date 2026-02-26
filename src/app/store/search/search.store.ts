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
import { SearchResultItem } from '../../shared/models/search.model';

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
    withComputed((store) => ({
        filteredResults: computed(() => {
            const type = store.searchType();
            const movies = store.movieResults();
            const tv = store.tvResults();
            const actors = store.actorResults();

            if (type === 'movie') return movies;
            if (type === 'tv') return tv;
            if (type === 'person') return actors;

            return [...movies, ...tv, ...actors].sort(
                (a, b) => (b.popularity || 0) - (a.popularity || 0),
            );
        }),
    })),
    withMethods((store, searchService = inject(SearchApiService)) => ({
        updateQuery: (query: string) => patchState(store, { query }),

        updateType: (type: 'multi' | 'movie' | 'tv' | 'person') =>
            patchState(store, { searchType: type }),

        search: rxMethod<string>(
            pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter((q) => q.length > 2),
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((query) => {
                    return searchService.multiSearch(query).pipe(
                        tap((results: SearchResultItem[]) => {
                            patchState(store, {
                                movieResults: results.filter(
                                    (r) => r.media_type === 'movie',
                                ) as Movie[],
                                tvResults: results.filter((r) => r.media_type === 'tv') as TVShow[],
                                actorResults: results.filter(
                                    (r) => r.media_type === 'person',
                                ) as ActorDetails[],
                                isLoading: false,
                            });
                        }),
                        catchError(() => {
                            patchState(store, {
                                isLoading: false,
                                error: 'Asset retrieval failed.',
                            });
                            return EMPTY;
                        }),
                    );
                }),
            ),
        ),

        clearStore: () => patchState(store, initialState),
    })),
);
