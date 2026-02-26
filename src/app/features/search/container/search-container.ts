import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SearchStore } from '../../../store/search/search.store';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MovieCard } from '../../dashboard/components/movie-card/movie-card';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { NnEmptyState } from '../../../shared/components/nn-empty-state/nn-empty-state';
import { CastGrid } from '../../movie-detail/components/cast-grid/cast-grid';
import { CastMember } from '../../../shared/models/movie.model';
import { SearchResultGrid } from '../components/search-result-grid/search-result-grid';
import { SearchFilters } from '../components/search-filters/search-filters';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NnInput } from '../../../shared/components/nn-input/nn-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-container',
    imports: [
        CommonModule,
        Skeleton,
        NnEmptyState,
        SearchResultGrid,
        SearchFilters,
        NnInput,
        ReactiveFormsModule,
    ],
    templateUrl: './search-container.html',
    styleUrl: './search-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchContainer {
    private readonly searchStore = inject(SearchStore);

    public readonly searchControl = new FormControl('', { nonNullable: true });
    public readonly searchIconPath: string = 'assets/icons/search.svg';

    public readonly isLoading = this.searchStore.isLoading;
    public readonly searchType = this.searchStore.searchType;
    public readonly movieResults = this.searchStore.movieResults;
    public readonly tvResults = this.searchStore.tvResults;

    public readonly actorResults = computed<CastMember[]>(() =>
        this.searchStore.actorResults().map((actor) => ({
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path,
            character: actor.known_for_department || 'NEURAL-LINKED',
        })),
    );

    public readonly isEmpty = computed<boolean>(() => {
        const type = this.searchType();
        const hasMovies = this.movieResults().length > 0;
        const hasTV = this.tvResults().length > 0;
        const hasActors = this.actorResults().length > 0;

        if (this.isLoading() || this.searchControl.value.length <= 2) return false;

        return (
            (type === 'movie' && !hasMovies) ||
            (type === 'tv' && !hasTV) ||
            (type === 'person' && !hasActors) ||
            (type === 'multi' && !hasMovies && !hasTV && !hasActors)
        );
    });


    public ngOnInit(): void {
        this.searchControl.setValue(this.searchStore.query(), { emitEvent: false });
    }

    public onTypeChange(type: 'multi' | 'movie' | 'tv' | 'person'): void {
        this.searchStore.updateType(type);
    }
}
