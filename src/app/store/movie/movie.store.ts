import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
    pipe,
    switchMap,
    tap,
    catchError,
    EMPTY,
    forkJoin,
    filter,
    distinctUntilChanged,
} from 'rxjs';
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
    watchlistMovies: Movie[];
    favoriteMovies: Movie[];
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
    watchlistMovies: [],
    favoriteMovies: [],
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
            loadAllMovies: rxMethod<void>(
                pipe(
                    tap(() => {
                        if (store.trending().length === 0) {
                            patchState(store, { isLoading: true });
                        }
                    }),
                    switchMap(() => {
                        if (store.trending().length > 0) return EMPTY;

                        return forkJoin({
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
                        );
                    }),
                ),
            ),

            loadMovieDetail: rxMethod<string>(
                pipe(
                    filter((id) => !!id),

                    distinctUntilChanged(),
                    tap((id) => {
                        if (store.selectedMovie()?.id !== Number(id)) {
                            patchState(store, {
                                isDetailLoading: true,
                                detailError: null,
                                selectedMovie: null,
                            });
                        }
                    }),
                    switchMap((id) => {
                        if (store.selectedMovie()?.id === Number(id)) {
                            patchState(store, { isDetailLoading: false });
                            return EMPTY;
                        }

                        return detailService.getMovieDetails(id).pipe(
                            tap((movie) => {
                                patchState(store, {
                                    selectedMovie: movie as MovieDetails,
                                    isDetailLoading: false,
                                });
                            }),
                            catchError(() => {
                                patchState(store, { isDetailLoading: false, detailError: 'Error' });
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),
            toggleWatchlist: rxMethod<{ id: number; status: boolean }>(
                pipe(
                    switchMap(({ id, status }) => {
                        const currentIds = store.watchlistIds();
                        const currentMovies = store.watchlistMovies();

                        const updatedIds = status
                            ? [...currentIds, id]
                            : currentIds.filter((mId) => mId !== id);

                        let updatedMovies = [...currentMovies];
                        if (status) {
                            const movieToAdd =
                                [...store.trending(), ...store.popular(), ...store.topRated()].find(
                                    (m) => m.id === id,
                                ) || store.selectedMovie();
                            if (movieToAdd) updatedMovies.push(movieToAdd as Movie);
                        } else {
                            updatedMovies = updatedMovies.filter((m) => m.id !== id);
                        }

                        patchState(store, {
                            watchlistIds: updatedIds,
                            watchlistMovies: updatedMovies,
                        });

                        return movieService.updateWatchlist(id, status).pipe(
                            tap(() =>
                                alertService.showAlert(
                                    status ? 'Added to Watchlist' : 'Removed',
                                    'success',
                                ),
                            ),
                            catchError(() => {
                                patchState(store, {
                                    watchlistIds: currentIds,
                                    watchlistMovies: currentMovies,
                                });
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
                        const currentIds = store.favoriteIds();
                        const currentMovies = store.favoriteMovies();

                        const updatedIds = status
                            ? [...currentIds, id]
                            : currentIds.filter((mId) => mId !== id);

                        let updatedMovies = [...currentMovies];
                        if (status) {
                            const movieToAdd =
                                [...store.trending(), ...store.popular(), ...store.topRated()].find(
                                    (m) => m.id === id,
                                ) || store.selectedMovie();
                            if (movieToAdd) updatedMovies.push(movieToAdd as Movie);
                        } else {
                            updatedMovies = updatedMovies.filter((m) => m.id !== id);
                        }

                        patchState(store, {
                            favoriteIds: updatedIds,
                            favoriteMovies: updatedMovies,
                        });

                        return movieService.updateFavorite(id, status).pipe(
                            tap(() =>
                                alertService.showAlert(
                                    status ? 'Added to Favorites' : 'Removed',
                                    'success',
                                ),
                            ),
                            catchError(() => {
                                patchState(store, {
                                    favoriteIds: currentIds,
                                    favoriteMovies: currentMovies,
                                });
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),

            loadCollections: rxMethod<void>(
                pipe(
                    switchMap(() => {
                        if (store.watchlistMovies().length > 0 || store.favoriteMovies().length > 0)
                            return EMPTY;

                        return forkJoin({
                            watchlist: movieService.getWatchlistMovies(),
                            favorites: movieService.getFavoriteMovies(),
                        }).pipe(
                            tap(({ watchlist, favorites }) => {
                                patchState(store, {
                                    watchlistMovies: watchlist.results,
                                    favoriteMovies: favorites.results,
                                    watchlistIds: watchlist.results.map((m) => m.id),
                                    favoriteIds: favorites.results.map((m) => m.id),
                                });
                            }),
                        );
                    }),
                ),
            ),

            reset(): void {
                patchState(store, initialState);
            },
        }),
    ),
);
