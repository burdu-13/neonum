import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.proxyUrl;

    public multiSearch(query: string): Observable<any[]> {
        const tmdbPath = `search/multi?query=${encodeURIComponent(query)}`;

        return this.http
            .get<{ results: any[] }>(`${this.baseUrl}?path=${tmdbPath}`)
            .pipe(map((response) => response.results));
    }
}
