import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SearchStore } from '../../../store/search/search.store';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MovieCard } from '../../dashboard/components/movie-card/movie-card';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { NnEmptyState } from '../../../shared/components/nn-empty-state/nn-empty-state';
import { CastGrid } from '../../movie-detail/components/cast-grid/cast-grid';
import { CastMember } from '../../../shared/models/movie.model';

@Component({
    selector: 'app-search-container',
    imports: [CommonModule, MatIcon, MovieCard, Skeleton, NnEmptyState, CastGrid],
    templateUrl: './search-container.html',
    styleUrl: './search-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchContainer {
    protected readonly searchStore = inject(SearchStore);

    public readonly actorResults = computed<CastMember[]>(() =>
        this.searchStore.actorResults().map((actor) => ({
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path,
            character: actor.known_for_department || 'Artist',
        })),
    );

    public readonly isEmpty = computed(() => {
        const s = this.searchStore;
        const query = s.query();
        return (
            !s.isLoading() &&
            query.length > 2 &&
            s.movieResults().length === 0 &&
            this.actorResults().length === 0 &&
            s.tvResults().length === 0
        );
    });

    public onSearchChange(query: string): void {
        this.searchStore.updateQuery(query);
        this.searchStore.search(query);
    }
}
