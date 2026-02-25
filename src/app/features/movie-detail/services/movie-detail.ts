import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MovieDetailService {
    private readonly http = inject(HttpClient);
    private readonly proxyUrl = environment.proxyUrl;
    public getMovieDetails(id: string): Observable<any> {
        return this.http.get<any>(
            `${this.proxyUrl}?path=movie/${id}&append_to_response=credits,videos`,
        );
    }
}
