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
        knownFor: computed<ActorCredit[]>(() => {
            const actor = store.detailsCache()[store.activeActorId() ?? 0];
            if (!actor) return [];

            return [...actor.combined_credits.cast]
                .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
                .slice(0, 8);
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
                                    [actor.id]: actor,
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
