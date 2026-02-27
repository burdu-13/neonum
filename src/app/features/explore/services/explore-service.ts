import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ExploreFilters, GenreResponse } from '../models/explore.model';
import { MovieResponse } from '../../../shared/models/movie.model';

@Injectable({ providedIn: 'root' })
export class ExploreService {
    private readonly http = inject(HttpClient);
    private readonly proxyUrl = environment.proxyUrl;

    public discoverMovies(filters: ExploreFilters): Observable<MovieResponse> {
        let path = `discover/movie?page=${filters.page}&sort_by=${filters.sort_by}`;

        if (filters.with_genres) path += `&with_genres=${filters.with_genres}`;
        if (filters['vote_average.gte']) path += `&vote_average.gte=${filters['vote_average.gte']}`;
        if (filters['primary_release_date.gte'])
            path += `&primary_release_date.gte=${filters['primary_release_date.gte']}`;

        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=${path}`);
    }

    public getGenres(): Observable<GenreResponse> {
        return this.http.get<GenreResponse>(`${this.proxyUrl}?path=genre/movie/list`);
    }
}
