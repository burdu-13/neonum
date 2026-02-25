import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/movie.model';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private readonly http = inject(HttpClient);
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

    public updateWatchlist(movieId: number, status: boolean): Observable<any> {
        return this.http.post<any>(`${this.proxyUrl}?path=account/{account_id}/watchlist`, {
            media_type: 'movie',
            media_id: movieId,
            watchlist: status,
        });
    }

    public updateFavorite(movieId: number, status: boolean): Observable<any> {
        return this.http.post<any>(`${this.proxyUrl}?path=account/{account_id}/favorite`, {
            media_type: 'movie',
            media_id: movieId,
            favorite: status,
        });
    }

    private fetchFromProxy(path: string): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=${path}`);
    }
}
