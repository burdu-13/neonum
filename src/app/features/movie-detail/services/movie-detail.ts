import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MovieDetails } from '../../../shared/models/movie.model';

@Injectable({
    providedIn: 'root',
})
export class MovieDetailService {
    private readonly http = inject(HttpClient);
    private readonly proxyUrl = environment.proxyUrl;
    public getMovieDetails(id: string): Observable<MovieDetails> {
        return this.http.get<MovieDetails>(
            `${this.proxyUrl}?path=movie/${id}&append_to_response=credits,videos,similar,reviews,account_states`,
        );
    }
}
