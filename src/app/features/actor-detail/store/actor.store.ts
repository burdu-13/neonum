import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY, filter, distinctUntilChanged } from 'rxjs';
import { ActorCredit, ActorDetails } from '../../../shared/models/actor.model';
import { ActorApiService } from '../services/actor-api-service';

interface ActorState {
    detailsCache: Record<number, ActorDetails>;
    activeActorId: number | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ActorState = {
    detailsCache: {},
    activeActorId: null,
    isLoading: false,
    error: null,
};

export const ActorStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        selectedActor: computed(() => {
            const id = store.activeActorId();
            return id ? store.detailsCache()[id] || null : null;
        }),
    })),
    withComputed((store) => ({
        knownFor: computed<ActorCredit[]>(() => {
            const id = store.activeActorId();
            const actor = id ? store.detailsCache()[id] : null;

            if (!actor) return [];

            const creditsKey = Object.keys(actor).find((k) => k.startsWith('combined_credits'));

            const credits = creditsKey
                ? (actor as unknown as Record<string, { cast: ActorCredit[] }>)[creditsKey]
                : null;

            if (!credits?.cast) return [];

            return [...credits.cast]
                .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
                .slice(0, 15)
                .map(
                    (credit) =>
                        ({
                            ...credit,
                            title: credit.title || credit.name || 'Untitled Asset',
                            release_date: credit.release_date || credit.first_air_date || '',
                            overview: credit.overview || 'No description available.',
                            poster_path: credit.poster_path || '',
                            backdrop_path: credit.backdrop_path || '',
                            genre_ids: credit.genre_ids || [],
                            popularity: credit.popularity || 0,
                            adult: credit.adult || false,
                            vote_average: credit.vote_average || 0,
                            vote_count: credit.vote_count || 0,
                            videos: credit.videos || { results: [] },
                        }) as ActorCredit,
                );
        }),
    })),
    withMethods((store, actorService = inject(ActorApiService)) => ({
        loadActorDetails: rxMethod<string>(
            pipe(
                filter((id) => !!id),
                distinctUntilChanged(),
                tap((id) => {
                    const actorId = Number(id);
                    patchState(store, { activeActorId: actorId });
                    if (!store.detailsCache()[actorId]) {
                        patchState(store, { isLoading: true, error: null });
                    }
                }),
                switchMap((id) => {
                    const actorId = Number(id);
                    if (store.detailsCache()[actorId]) {
                        patchState(store, { isLoading: false });
                        return EMPTY;
                    }

                    return actorService.getActorDetails(id).pipe(
                        tap((actor) => {
                            patchState(store, {
                                detailsCache: {
                                    ...store.detailsCache(),
                                    [Number(actor.id)]: actor,
                                },
                                isLoading: false,
                            });
                        }),
                        catchError(() => {
                            patchState(store, {
                                isLoading: false,
                                error: 'Failed to retrieve biological data.',
                            });
                            return EMPTY;
                        }),
                    );
                }),
            ),
        ),
    })),
);
