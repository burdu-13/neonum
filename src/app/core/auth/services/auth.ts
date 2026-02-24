import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthCredentials, SessionResponse, TokenResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class Auth {
    private readonly http = inject(HttpClient);
    private readonly proxyUrl = environment.proxyUrl;
    private readonly AUTH_KEY = 'neonum_session_id';

    public login(credentials: AuthCredentials): Observable<SessionResponse> {
        return this.getRequestToken().pipe(
            switchMap((tokenRes) => this.validateToken(credentials, tokenRes.request_token)),
            switchMap((validatedRes) => this.createSession(validatedRes.request_token)),
            tap((session) => this.saveSession(session.session_id)),
        );
    }

    private getRequestToken(): Observable<TokenResponse> {
        return this.http.get<TokenResponse>(`${this.proxyUrl}?path=authentication/token/new`);
    }

    private validateToken(credentials: AuthCredentials, token: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(
            `${this.proxyUrl}?path=authentication/token/validate_with_login`,
            {
                ...credentials,
                request_token: token,
            },
        );
    }

    private createSession(token: string): Observable<SessionResponse> {
        return this.http.post<SessionResponse>(`${this.proxyUrl}?path=authentication/session/new`, {
            request_token: token,
        });
    }

    private saveSession(sessionId: string): void {
        localStorage.setItem(this.AUTH_KEY, sessionId);
    }

    public get isAuthenticated(): boolean {
        return !!localStorage.getItem(this.AUTH_KEY);
    }
}
