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
    cache: Record<string, ExploreCacheEntry>;
}

const initialState: ExploreState = {
    movies: [],
    genres: [],
    filters: {
        page: 1,
        sort_by: 'popularity.desc',
    },
    isLoading: false,
    totalResults: 0,
    cache: {},
};

export const ExploreStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, exploreService = inject(ExploreService)) => ({
        loadGenres: rxMethod<void>(
            pipe(
                switchMap(() =>
                    exploreService.getGenres().pipe(
                        tap((res) => patchState(store, { genres: res.genres })),
                        catchError(() => EMPTY),
                    ),
                ),
            ),
        ),

        loadMovies: rxMethod<ExploreFilters>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap((filters) => {
                    const cacheKey = JSON.stringify(filters);

                    const cachedData = store.cache()[cacheKey];

                    if (cachedData) {
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
                                movies: res.results,
                                totalResults: res.total_results,
                                isLoading: false,
                                cache: {
                                    ...store.cache(),
                                    [cacheKey]: { results: res.results, total: res.total_results },
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

        updateFilters(newFilters: Partial<ExploreFilters>) {
            patchState(store, (state) => ({
                filters: { ...state.filters, ...newFilters, page: newFilters.page ?? 1 },
            }));
        },
    })),
);
