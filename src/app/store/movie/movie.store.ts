import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY, forkJoin } from 'rxjs';
import { MovieService } from '../../features/dashboard/services/movie';
import { MovieDetailService } from '../../features/movie-detail/services/movie-detail';
import { Movie, MovieDetails } from '../../shared/models/movie.model';
import { AlertService } from '../../shared/services/alert/alert';

interface MovieState {
    trending: Movie[];
    popular: Movie[];
    topRated: Movie[];
    watchlistIds: number[];
    favoriteIds: number[];
    selectedMovie: MovieDetails | null;
    isLoading: boolean;
    isDetailLoading: boolean;
    detailError: string | null;
}

const initialState: MovieState = {
    trending: [],
    popular: [],
    topRated: [],
    watchlistIds: [],
    favoriteIds: [],
    selectedMovie: null,
    isLoading: false,
    isDetailLoading: false,
    detailError: null,
};

export const MovieStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
            movieService = inject(MovieService),
            detailService = inject(MovieDetailService),
            alertService = inject(AlertService),
        ) => ({
            clearSelectedMovie(): void {
                patchState(store, {
                    selectedMovie: null,
                    isDetailLoading: true,
                    detailError: null,
                });
            },
            loadAllMovies: rxMethod<void>(
                pipe(
                    tap(() => patchState(store, { isLoading: true })),
                    switchMap(() =>
                        forkJoin({
                            trending: movieService.getTrendingMovies(),
                            popular: movieService.getPopularMovies(),
                            topRated: movieService.getTopRatedMovies(),
                        }).pipe(
                            tap(({ trending, popular, topRated }) => {
                                patchState(store, {
                                    trending: trending.results,
                                    popular: popular.results,
                                    topRated: topRated.results,
                                    isLoading: false,
                                });
                            }),
                            catchError(() => {
                                patchState(store, { isLoading: false });
                                return EMPTY;
                            }),
                        ),
                    ),
                ),
            ),

            loadMovieDetail: rxMethod<string>(
                pipe(
                    tap(() => patchState(store, { isDetailLoading: true, detailError: null })),
                    switchMap((id) =>
                        detailService.getMovieDetails(id).pipe(
                            tap((movie) => {
                                // 1. Update the detailed view
                                patchState(store, {
                                    selectedMovie: movie as MovieDetails,
                                    isDetailLoading: false,
                                });

                                // 2. Sync global signals using the fetched account_states
                                if (movie.account_states) {
                                    const { watchlist, favorite } = movie.account_states;
                                    const mId = movie.id;

                                    if (watchlist && !store.watchlistIds().includes(mId)) {
                                        patchState(store, {
                                            watchlistIds: [...store.watchlistIds(), mId],
                                        });
                                    }

                                    if (favorite && !store.favoriteIds().includes(mId)) {
                                        patchState(store, {
                                            favoriteIds: [...store.favoriteIds(), mId],
                                        });
                                    }
                                }
                            }),
                            catchError((err) => {
                                patchState(store, {
                                    isDetailLoading: false,
                                    detailError: 'Cinematic asset could not be retrieved.',
                                });
                                return EMPTY;
                            }),
                        ),
                    ),
                ),
            ),

            toggleWatchlist: rxMethod<{ id: number; status: boolean }>(
                pipe(
                    switchMap(({ id, status }) => {
                        const current = store.watchlistIds();
                        const updated = status
                            ? [...current, id]
                            : current.filter((mId) => mId !== id);

                        patchState(store, { watchlistIds: updated });

                        return movieService.updateWatchlist(id, status).pipe(
                            tap(() =>
                                alertService.showAlert(
                                    status ? 'Added to Watchlist' : 'Removed from Watchlist',
                                    'success',
                                ),
                            ),
                            catchError(() => {
                                patchState(store, { watchlistIds: current });
                                alertService.showAlert('Failed to update watchlist.', 'error');
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),

            toggleFavorite: rxMethod<{ id: number; status: boolean }>(
                pipe(
                    switchMap(({ id, status }) => {
                        const current = store.favoriteIds();
                        const updated = status
                            ? [...current, id]
                            : current.filter((mId) => mId !== id);

                        patchState(store, { favoriteIds: updated });

                        return movieService.updateFavorite(id, status).pipe(
                            tap(() =>
                                alertService.showAlert(
                                    status ? 'Added to Favorites' : 'Removed from Favorites',
                                    'success',
                                ),
                            ),
                            catchError(() => {
                                patchState(store, { favoriteIds: current });
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),
        }),
    ),
);
