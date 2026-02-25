import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { MovieService } from '../../features/dashboard/services/movie';
import { Movie } from '../../features/dashboard/models/movie.model';

interface MovieState {
    movies: Movie[];
    isLoading: boolean;
}

const initialState: MovieState = {
    movies: [],
    isLoading: false,
};

export const MovieStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, movieService = inject(MovieService)) => ({
        loadTrending: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() =>
                    movieService.getTrendingMovies().pipe(
                        tap((response) => {
                            patchState(store, {
                                movies: response.results,
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
