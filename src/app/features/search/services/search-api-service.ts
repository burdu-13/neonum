import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map } from 'rxjs';
import { SearchResultItem } from '../../../shared/models/search.model';

@Injectable({
    providedIn: 'root',
})
export class SearchApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.proxyUrl;

    public multiSearch(query: string): Observable<SearchResultItem[]> {
        const tmdbPath = `search/multi&query=${encodeURIComponent(query)}&include_adult=false`;

        return this.http
            .get<{ results: SearchResultItem[] }>(`${this.baseUrl}?path=${tmdbPath}`)
            .pipe(map((response) => response.results || []));
    }
}
