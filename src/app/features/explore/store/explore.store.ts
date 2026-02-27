import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY, of } from 'rxjs';
import { Movie } from '../../../shared/models/movie.model';
import { ExploreCacheEntry, ExploreFilters, Genre } from '../models/explore.model';
import { ExploreService } from '../services/explore-service';

interface ExploreState {
    movies: Movie[];
    genres: Genre[];
    filters: ExploreFilters;
    isLoading: boolean;
    totalResults: number;
    totalPages: number;
    cache: Record<string, ExploreCacheEntry>;
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
    cache: {},
};

export const ExploreStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, exploreService = inject(ExploreService)) => ({
        loadGenres: rxMethod<'movie' | 'tv'>(
            pipe(
                switchMap((type) =>
                    exploreService.getGenres(type).pipe(
                        tap((res) => patchState(store, { genres: res.genres })),
                        catchError(() => EMPTY),
                    ),
                ),
            ),
        ),

        loadMovies: rxMethod<{ filters: ExploreFilters; append: boolean }>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(({ filters, append }) => {
                    const cacheKey = JSON.stringify(filters);
                    const cachedData = store.cache()[cacheKey];

                    if (cachedData && !append) {
                        patchState(store, {
                            movies: cachedData.results,
                            totalResults: cachedData.total,
                            isLoading: false,
                        });
                        return of(null);
                    }

                    return exploreService.discoverMovies(filters).pipe(
                        tap((res) => {
                            patchState(store, {
                                movies: append ? [...store.movies(), ...res.results] : res.results,
                                totalResults: res.total_results,
                                totalPages: res.total_pages,
                                isLoading: false,
                                cache: append
                                    ? store.cache()
                                    : {
                                          ...store.cache(),
                                          [cacheKey]: {
                                              results: res.results,
                                              total: res.total_results,
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
            patchState(store, (state) => {
                const updatedFilters = { ...state.filters, ...newFilters, page: 1 };

                const genreUpdate =
                    newFilters.type && newFilters.type !== state.filters.type
                        ? { genres: [], with_genres: '' }
                        : {};

                return {
                    filters: { ...updatedFilters, ...genreUpdate },
                };
            });
            this.loadMovies({ filters: store.filters(), append: false });
        },
    })),
);
