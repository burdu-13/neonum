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

    private fetchFromProxy(path: string): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=${path}`);
    }
}
