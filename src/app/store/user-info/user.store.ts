import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Router } from '@angular/router';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AccountDetails, AuthCredentials } from '../../core/auth/models/auth.model';
import { Auth } from '../../core/auth/services/auth';
import { AlertService } from '../../shared/services/alert/alert';

export interface UserState {
    sessionId: string | null;
    account: AccountDetails | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    sessionId: localStorage.getItem('neonum_session_id'),
    isLoading: false,
    account: null,
    isAuthenticated: !!localStorage.getItem('neonum_session_id'),
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
            authService = inject(Auth),
            alertService = inject(AlertService),
            router = inject(Router),
        ) => ({
            restoreSession: rxMethod<void>(
                pipe(
                    switchMap(() =>
                        authService.getAccountDetails().pipe(
                            tap((account) => {
                                patchState(store, { account, isAuthenticated: true });
                            }),
                            catchError((err) => {
                                console.error('Background profile fetch failed:', err);

                                if (err.status === 401) {
                                    localStorage.removeItem('neonum_session_id');
                                    patchState(store, {
                                        sessionId: null,
                                        account: null,
                                        isAuthenticated: false,
                                    });
                                }
                                return EMPTY;
                            }),
                        ),
                    ),
                ),
            ),

            login: rxMethod<AuthCredentials>(
                pipe(
                    tap(() => patchState(store, { isLoading: true })),
                    switchMap((credentials) =>
                        authService.login(credentials).pipe(
                            tap((session) => {
                                localStorage.removeItem('is_guest');
                                patchState(store, { sessionId: session.session_id });
                            }),
                            switchMap(() =>
                                authService.getAccountDetails().pipe(
                                    tap((account) => {
                                        patchState(store, {
                                            account,
                                            isAuthenticated: true,
                                            isLoading: false,
                                        });
                                        alertService.showAlert(
                                            `Welcome back, ${account.username}`,
                                            'success',
                                        );
                                        router.navigate(['/dashboard']);
                                    }),
                                    catchError(() => {
                                        patchState(store, { isLoading: false });
                                        alertService.showAlert(
                                            "Login successful, but we couldn't load your profile.",
                                            'error',
                                        );
                                        return EMPTY;
                                    }),
                                ),
                            ),
                            catchError((err) => {
                                patchState(store, { isLoading: false });
                                const message =
                                    err.status === 401
                                        ? 'Invalid username or password.'
                                        : 'The cinematic mainframe is currently unreachable.';
                                alertService.showAlert(message, 'error');
                                return EMPTY;
                            }),
                        ),
                    ),
                ),
            ),

            loginAsGuest: rxMethod<void>(
                pipe(
                    tap(() => patchState(store, { isLoading: true })),
                    switchMap(() =>
                        authService.loginAsGuest().pipe(
                            tap((res) => {
                                patchState(store, {
                                    sessionId: res.guest_session_id,
                                    isAuthenticated: true,
                                    isLoading: false,
                                });
                                alertService.showAlert('Guest Session Active.', 'info');
                                router.navigate(['/']);
                            }),
                            catchError(() => {
                                patchState(store, { isLoading: false });
                                alertService.showAlert('Failed to start guest session.', 'error');
                                return EMPTY;
                            }),
                        ),
                    ),
                ),
            ),

            logout(): void {
                localStorage.removeItem('neonum_session_id');
                localStorage.removeItem('is_guest');
                patchState(store, { sessionId: null, account: null, isAuthenticated: false });
                router.navigate(['/auth/login']);
            },
        }),
    ),

    withHooks({
        onInit(store) {
            const isGuest = localStorage.getItem('is_guest') === 'true';

            if (store.sessionId() && !isGuest) {
                store.restoreSession();
            }
        },
    }),
);
