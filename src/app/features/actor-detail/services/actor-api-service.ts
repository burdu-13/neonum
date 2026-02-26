import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ActorDetails } from '../../../shared/models/actor.model';

@Injectable({
    providedIn: 'root',
})
export class ActorApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.proxyUrl;

    public getActorDetails(id: string): Observable<ActorDetails> {
        const tmdbPath = `person/${id}?append_to_response=combined_credits`;

        return this.http.get<ActorDetails>(`${this.baseUrl}?path=${tmdbPath}`);
    }
}
