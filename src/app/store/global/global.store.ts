import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface GlobalState {
    isAppLoading: boolean;
}

const initialState: GlobalState = {
    isAppLoading: true,
};

const resetCallbacks = new Set<() => void>();

export const GlobalStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setLoading(isLoading: boolean) {
            patchState(store, { isAppLoading: isLoading });
        },

        registerReset(resetFn: () => void) {
            resetCallbacks.add(resetFn);
        },

        resetAllStores() {
            resetCallbacks.forEach((reset) => reset());
        },
    })),
);
