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
        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=trending/movie/week`);
    }
}
