import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY, of, concatMap } from 'rxjs';
import { Movie } from '../../../shared/models/movie.model';
import {
    ExploreCacheEntry,
    ExploreFilters,
    ExploreResponse,
    Genre,
    GenreResponse,
} from '../models/explore.model';
import { ExploreService } from '../services/explore-service';
import { GlobalStore } from '../../../store/global/global.store';

interface ExploreState {
    movies: Movie[];
    genres: Genre[];
    filters: ExploreFilters;
    isLoading: boolean;
    totalResults: number;
    totalPages: number;
    genreCache: Record<string, Genre[]>;
    movieCache: Record<string, ExploreResponse>;
}

const initialState: ExploreState = {
    movies: [],
    genres: [],
    filters: {
        page: 1,
        sort_by: 'popularity.desc',
        type: 'movie',
    },
    isLoading: false,
    totalResults: 0,
    totalPages: 0,
    genreCache: {},
    movieCache: {},
};

export const ExploreStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, exploreService = inject(ExploreService)) => ({
        loadGenres: rxMethod<'movie' | 'tv'>(
            pipe(
                switchMap((type) => {
                    const cacheKey = `genres_${type}`;
                    const cachedGenres = store.genreCache()[cacheKey];

                    if (cachedGenres) {
                        patchState(store, { genres: cachedGenres });
                        return EMPTY;
                    }

                    return exploreService.getGenres(type).pipe(
                        tap((res: GenreResponse) => {
                            const extractedGenres = res.genres;
                            patchState(store, {
                                genres: extractedGenres,
                                genreCache: {
                                    ...store.genreCache(),
                                    [cacheKey]: extractedGenres,
                                },
                            });
                        }),
                        catchError(() => EMPTY),
                    );
                }),
            ),
        ),

        loadMovies: rxMethod<{ filters: ExploreFilters; append: boolean }>(
            pipe(
                switchMap(({ filters, append }) => {
                    const cacheKey = `${filters.type}_${filters.sort_by}_${filters.with_genres}_p${filters.page}`;
                    const cachedResponse = store.movieCache()[cacheKey];

                    if (!append && cachedResponse) {
                        patchState(store, {
                            movies: cachedResponse.results,
                            totalResults: cachedResponse.total_results,
                            totalPages: cachedResponse.total_pages,
                            isLoading: false,
                        });
                        return EMPTY;
                    }

                    patchState(store, { isLoading: true });
                    return exploreService.discoverMovies(filters).pipe(
                        tap((res: ExploreResponse) => {
                            const newMovies = append
                                ? [...store.movies(), ...res.results]
                                : res.results;

                            patchState(store, {
                                movies: newMovies,
                                totalResults: res.total_results,
                                totalPages: res.total_pages,
                                isLoading: false,
                                movieCache: {
                                    ...store.movieCache(),
                                    [cacheKey]: {
                                        results: res.results,
                                        total_results: res.total_results,
                                        total_pages: res.total_pages,
                                    },
                                },
                            });
                        }),
                        catchError(() => {
                            patchState(store, { isLoading: false });
                            return EMPTY;
                        }),
                    );
                }),
            ),
        ),

        loadNextPage() {
            if (!store.isLoading() && store.filters().page < store.totalPages()) {
                const nextPage = store.filters().page + 1;
                patchState(store, (state) => ({
                    filters: { ...state.filters, page: nextPage },
                }));
                this.loadMovies({ filters: store.filters(), append: true });
            }
        },

        updateFilters(newFilters: Partial<ExploreFilters>) {
            const typeChanged = newFilters.type && newFilters.type !== store.filters().type;

            patchState(store, (state) => ({
                filters: {
                    ...state.filters,
                    ...newFilters,
                    page: 1,
                    with_genres: typeChanged
                        ? ''
                        : (newFilters.with_genres ?? state.filters.with_genres),
                },
                movies: typeChanged ? [] : state.movies,
            }));

            if (typeChanged) {
                this.loadGenres(newFilters.type as 'movie' | 'tv');
            }
            this.loadMovies({ filters: store.filters(), append: false });
        },
    })),
    withHooks({
        onInit(store) {
            const globalStore = inject(GlobalStore);
            globalStore.registerReset(() => patchState(store, initialState));
        },
    }),
);
