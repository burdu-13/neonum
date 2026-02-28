import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
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
    isGuest: boolean;
    guestCreatedAt: number | null;
}

const sessionId = localStorage.getItem('neonum_session_id');
const isGuest = localStorage.getItem('is_guest') === 'true';
const guestCreatedAt = localStorage.getItem('guest_created_at');

const initialState: UserState = {
    sessionId: sessionId,
    isLoading: !!sessionId && !isGuest,
    account: null,
    isAuthenticated: !!sessionId,
    isGuest: isGuest,
    guestCreatedAt: guestCreatedAt ? Number(guestCreatedAt) : null,
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ isGuest, guestCreatedAt }) => ({
        guestSessionRemainingHours: computed(() => {
            if (!isGuest() || !guestCreatedAt()) return 0;

            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;
            const elapsed = now - guestCreatedAt()!;
            const remaining = Math.max(0, twentyFourHours - elapsed);

            return Math.floor(remaining / (1000 * 60 * 60));
        }),
    })),
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
                                patchState(store, {
                                    account,
                                    isAuthenticated: true,
                                    isLoading: false,
                                });
                            }),
                            catchError((err) => {
                                console.error('Background profile fetch failed:', err);

                                if (err.status === 401) {
                                    localStorage.removeItem('neonum_session_id');
                                    patchState(store, {
                                        sessionId: null,
                                        account: null,
                                        isAuthenticated: false,
                                        isLoading: false,
                                    });
                                } else {
                                    patchState(store, { isLoading: false });
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
                                localStorage.removeItem('guest_created_at');
                                localStorage.setItem('neonum_session_id', session.session_id);

                                patchState(store, {
                                    sessionId: session.session_id,
                                    isGuest: false,
                                    guestCreatedAt: null,
                                });
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
                                        : 'The cinematic mainframe is unreachable.';
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
                                const now = Date.now();
                                localStorage.setItem('is_guest', 'true');
                                localStorage.setItem('guest_created_at', now.toString());
                                localStorage.setItem('neonum_session_id', res.guest_session_id);
                                patchState(store, {
                                    sessionId: res.guest_session_id,
                                    isAuthenticated: true,
                                    isGuest: true,
                                    guestCreatedAt: now,
                                    isLoading: false,
                                });

                                alertService.showAlert('Guest Session Active.', 'info');

                                router.navigate(['/dashboard']);
                            }),
                            catchError((err) => {
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
                localStorage.removeItem('guest_created_at');

                patchState(store, {
                    sessionId: null,
                    account: null,
                    isAuthenticated: false,
                    isGuest: false,
                    guestCreatedAt: null,
                });

                router.navigate(['/auth/login']);
            },
        }),
    ),

    withHooks({
        onInit(store) {
            const isGuest = localStorage.getItem('is_guest') === 'true';
            const createdAt = Number(localStorage.getItem('guest_created_at'));
            const isExpired = Date.now() - createdAt > 24 * 60 * 60 * 1000;

            if (isGuest && isExpired) {
                store.logout();
            } else if (store.sessionId() && !isGuest) {
                store.restoreSession();
            }
        },
    }),
);
