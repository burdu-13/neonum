import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY, forkJoin } from 'rxjs';
import { MovieService } from '../../features/dashboard/services/movie';
import { Movie } from '../../features/dashboard/models/movie.model';

interface MovieState {
    trending: Movie[];
    popular: Movie[];
    topRated: Movie[];
    isLoading: boolean;
}

const initialState: MovieState = {
    trending: [],
    popular: [],
    topRated: [],
    isLoading: false,
};

export const MovieStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, movieService = inject(MovieService)) => ({
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
    })),
);
