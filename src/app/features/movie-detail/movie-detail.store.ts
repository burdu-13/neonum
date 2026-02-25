import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { MovieDetailService } from './services/movie-detail';
import { MovieDetails } from '../dashboard/models/movie.model';

export interface MovieDetailState {
    movie: MovieDetails | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: MovieDetailState = {
    movie: null,
    isLoading: true,
    error: null,
};

export const MovieDetailStore = signalStore(
    withState(initialState),
    withMethods((store, movieApi = inject(MovieDetailService)) => ({
        loadMovie: rxMethod<string>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap((id) =>
                    movieApi.getMovieDetails(id).pipe(
                        tap((movie) =>
                            patchState(store, { movie: movie as MovieDetails, isLoading: false }),
                        ),
                        catchError((err) => {
                            console.error('Asset retrieval failed:', err);
                            patchState(store, {
                                isLoading: false,
                                error: 'Cinematic asset could not be retrieved.',
                            });
                            return EMPTY;
                        }),
                    ),
                ),
            ),
        ),
    })),
);
