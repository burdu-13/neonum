import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
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
    exhaustMap,
} from 'rxjs';
import { MovieService } from '../../features/dashboard/services/movie';
import { MovieDetailService } from '../../features/movie-detail/services/movie-detail';
import {
    Episode,
    Movie,
    MovieDetails,
    MovieResponse,
    Review,
} from '../../shared/models/movie.model';
import { AlertService } from '../../shared/services/alert/alert';
import { UserStore } from '../user-info/user.store';
import { Router } from '@angular/router';

interface MovieState {
    trending: Movie[];
    popular: Movie[];
    topRated: Movie[];
    watchlistIds: number[];
    favoriteIds: number[];
    isLoading: boolean;
    isDetailLoading: boolean;
    detailError: string | null;
    watchlistMovies: Movie[];
    favoriteMovies: Movie[];
    detailsCache: Record<number, MovieDetails>;
    reviewLimit: number;
    activeDetailId: number | null;
    collectionsLoaded: boolean;
    activeSeasonEpisodes: Episode[];
    isSeasonLoading: boolean;
    seasonCache: Record<string, Episode[]>;
}

const initialState: MovieState = {
    trending: [],
    popular: [],
    topRated: [],
    watchlistIds: [],
    favoriteIds: [],
    isLoading: false,
    isDetailLoading: false,
    detailError: null,
    watchlistMovies: [],
    favoriteMovies: [],
    reviewLimit: 6,
    detailsCache: {},
    activeDetailId: null,
    collectionsLoaded: false,
    activeSeasonEpisodes: [],
    isSeasonLoading: false,
    seasonCache: {},
};

export const MovieStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store, userStore = inject(UserStore)) => ({
        selectedMovie: computed(() => {
            const id = store.activeDetailId();
            return id ? store.detailsCache()[id] || null : null;
        }),

        processedReviews: computed(() => {
            const movie = store.detailsCache()[store.activeDetailId() ?? 0];
            if (!movie) return [];

            const account = userStore.account();
            const allReviews = [...movie.reviews.results];

            if (movie.account_states?.rated) {
                const ratingValue =
                    typeof movie.account_states.rated === 'object'
                        ? movie.account_states.rated.value
                        : movie.account_states.rated;

                const alreadyExists = allReviews.some((r) => r.author === account?.username);

                if (!alreadyExists && account) {
                    allReviews.unshift({
                        id: 'local-user-rating',
                        author: account.username,
                        author_details: {
                            name: account.username,
                            username: account.username,
                            rating: Number(ratingValue),
                            avatar_path: account.avatar?.tmdb?.avatar_path || null,
                        },
                        content: 'You have assessed this cinematic asset with a personal rating.',
                        created_at: new Date().toISOString(),
                        url: '',
                    } as Review);
                }
            }

            return allReviews.slice(0, store.reviewLimit());
        }),

        hasMoreReviews: computed(() => {
            const movie = store.detailsCache()[store.activeDetailId() ?? 0];
            return movie ? store.reviewLimit() < movie.reviews.results.length : false;
        }),
    })),
    withMethods(
        (
            store,
            movieService = inject(MovieService),
            detailService = inject(MovieDetailService),
            alertService = inject(AlertService),
            router = inject(Router),
        ) => ({
            loadAllMovies: rxMethod<void>(
                pipe(
                    tap(() => {
                        if (store.trending().length === 0) {
                            patchState(store, { isLoading: true });
                        }
                    }),
                    switchMap(() => {
                        if (store.trending().length > 0) {
                            patchState(store, { isLoading: false });
                            return EMPTY;
                        }

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

            loadMoreReviews() {
                patchState(store, { reviewLimit: store.reviewLimit() + 6 });
            },

            loadMovieDetail: rxMethod<{ id: string; type: 'movie' | 'tv' }>(
                pipe(
                    filter((data) => !!data.id),
                    distinctUntilChanged(
                        (prev, curr) => prev.id === curr.id && prev.type === curr.type,
                    ),
                    tap(({ id, type }) => {
                        const mId = Number(id);

                        patchState(store, {
                            activeDetailId: mId,
                            reviewLimit: 6,
                        });

                        if (!store.detailsCache()[mId]) {
                            patchState(store, { isLoading: true, detailError: null });
                        }
                    }),
                    switchMap(({ id, type }) => {
                        const mId = Number(id);

                        if (store.detailsCache()[mId]) {
                            patchState(store, { isLoading: false });
                            return EMPTY;
                        }

                        return detailService.getMovieDetails(id, type).pipe(
                            tap((movie) => {
                                patchState(store, {
                                    detailsCache: {
                                        ...store.detailsCache(),
                                        [movie.id]: movie as MovieDetails,
                                    },
                                    isLoading: false,
                                });
                            }),
                            catchError(() => {
                                patchState(store, {
                                    isLoading: false,
                                    detailError: 'Error loading asset.',
                                });
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

            getRandomContent: rxMethod<void>(
                pipe(
                    switchMap(() => {
                        const randomPage = Math.floor(Math.random() * 500) + 1;
                        const isMovie = Math.random() > 0.5;
                        const type = isMovie ? 'movie' : 'tv';

                        return movieService.discover(type, randomPage).pipe(
                            tap((response: MovieResponse) => {
                                const results = response.results;
                                if (results?.length > 0) {
                                    const randomItem =
                                        results[Math.floor(Math.random() * results.length)];
                                    const route = isMovie ? '/movie' : '/tv';
                                    router.navigate([route, randomItem.id]);
                                }
                            }),
                            catchError((err) => {
                                console.error('Failed to find lucky content:', err);
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),

            loadSeasonDetails: rxMethod<{ tvId: number; seasonNumber: number }>(
                pipe(
                    // Prevent re-fetching if the same season is clicked multiple times
                    distinctUntilChanged(
                        (prev, curr) =>
                            prev.tvId === curr.tvId && prev.seasonNumber === curr.seasonNumber,
                    ),
                    tap(({ tvId, seasonNumber }) => {
                        const cacheKey = `${tvId}_s${seasonNumber}`;
                        const cachedData = store.seasonCache()[cacheKey];

                        if (cachedData) {
                            // Immediate UI update from cache
                            patchState(store, {
                                activeSeasonEpisodes: cachedData,
                                isSeasonLoading: false,
                            });
                        } else {
                            // Trigger loading state for new data
                            patchState(store, {
                                isSeasonLoading: true,
                                activeSeasonEpisodes: [],
                            });
                        }
                    }),
                    switchMap(({ tvId, seasonNumber }) => {
                        const cacheKey = `${tvId}_s${seasonNumber}`;

                        if (store.seasonCache()[cacheKey]) {
                            return EMPTY;
                        }

                        return detailService.getSeasonDetails(tvId.toString(), seasonNumber).pipe(
                            tap((detail) => {
                                patchState(store, {
                                    activeSeasonEpisodes: detail.episodes,
                                    seasonCache: {
                                        ...store.seasonCache(),
                                        [cacheKey]: detail.episodes,
                                    },
                                    isSeasonLoading: false,
                                });
                            }),
                            catchError(() => {
                                patchState(store, { isSeasonLoading: false });
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
                    filter(() => !store.collectionsLoaded() && !store.isDetailLoading()),

                    exhaustMap(() => {
                        patchState(store, { isDetailLoading: true });

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
                                    collectionsLoaded: true,
                                    isDetailLoading: false,
                                });
                            }),
                            catchError(() => {
                                patchState(store, { isDetailLoading: false });
                                return EMPTY;
                            }),
                        );
                    }),
                ),
            ),

            submitRating: rxMethod<{ id: number; rating: number }>(
                pipe(
                    switchMap(({ id, rating }) => {
                        return movieService.addRating(id, rating).pipe(
                            tap(() => {
                                alertService.showAlert(
                                    `Successfully rated: ${rating}/10`,
                                    'success',
                                );
                                const movie = store.detailsCache()[id];
                                if (movie) {
                                    const updated = {
                                        ...movie,
                                        account_states: {
                                            ...movie.account_states!,
                                            rated: { value: rating },
                                        },
                                    };
                                    patchState(store, {
                                        detailsCache: {
                                            ...store.detailsCache(),
                                            [id]: updated as MovieDetails,
                                        },
                                    });
                                }
                            }),
                            catchError(() => {
                                alertService.showAlert('Rating failed.', 'error');
                                return EMPTY;
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
