import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
    FavoriteRequest,
    MovieResponse,
    TmdbStatusResponse,
    WatchlistRequest,
} from '../../../shared/models/movie.model';
import { UserStore } from '../../../store/user-info/user.store';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private readonly http = inject(HttpClient);
    private readonly userStore = inject(UserStore);
    private readonly proxyUrl = environment.proxyUrl;

    public getTrendingMovies(): Observable<MovieResponse> {
        return this.fetchFromProxy('trending/movie/week');
    }

    public getPopularMovies(): Observable<MovieResponse> {
        return this.fetchFromProxy('movie/popular');
    }

    public getTopRatedMovies(): Observable<MovieResponse> {
        return this.fetchFromProxy('movie/top_rated');
    }

    public updateWatchlist(movieId: number, status: boolean): Observable<TmdbStatusResponse> {
        const accountId = this.userStore.account()?.id;

        const body: WatchlistRequest = {
            media_type: 'movie',
            media_id: movieId,
            watchlist: status,
        };

        return this.http.post<TmdbStatusResponse>(
            `${this.proxyUrl}?path=account/${accountId}/watchlist`,
            body,
        );
    }
    public updateFavorite(movieId: number, status: boolean): Observable<TmdbStatusResponse> {
        const accountId = this.userStore.account()?.id;

        const body: FavoriteRequest = {
            media_type: 'movie',
            media_id: movieId,
            favorite: status,
        };

        return this.http.post<TmdbStatusResponse>(
            `${this.proxyUrl}?path=account/${accountId}/favorite`,
            body,
        );
    }

    private fetchFromProxy(path: string): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=${path}`);
    }
}
