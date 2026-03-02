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
        const contentType = filters.type || 'movie';
        let path = `discover/${contentType}?page=${filters.page}`;

        let sort = filters.sort_by || 'popularity.desc';
        if (contentType === 'tv' && sort === 'primary_release_date.desc') {
            sort = 'first_air_date.desc';
        }
        path += `&sort_by=${sort}`;

        if (sort === 'vote_average.desc') {
            path += '&vote_count.gte=300';
        }

        if (sort === 'primary_release_date.desc' || sort === 'first_air_date.desc') {
            const today = new Date().toISOString().split('T')[0];
            if (contentType === 'movie') {
                path += `&primary_release_date.lte=${today}`;
            } else {
                path += `&first_air_date.lte=${today}`;
            }
            path += '&vote_count.gte=20';
        }

        if (filters.with_genres) path += `&with_genres=${filters.with_genres}`;

        const safePath = encodeURIComponent(path);
        return this.http.get<MovieResponse>(`${this.proxyUrl}?path=${safePath}`);
    }

    public getGenres(type: 'movie' | 'tv' = 'movie'): Observable<GenreResponse> {
        return this.http.get<GenreResponse>(`${this.proxyUrl}?path=genre/${type}/list`);
    }
}
