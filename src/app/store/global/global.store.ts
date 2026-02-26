import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface GlobalState {
    isAppLoading: boolean;
}

const initialState: GlobalState = {
    isAppLoading: true,
};

export const GlobalStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setLoading(isLoading: boolean) {
            patchState(store, { isAppLoading: isLoading });
        },
    })),
);
