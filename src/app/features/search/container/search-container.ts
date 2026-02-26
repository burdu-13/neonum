import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SearchStore } from '../../../store/search/search.store';
import { CommonModule } from '@angular/common';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { NnEmptyState } from '../../../shared/components/nn-empty-state/nn-empty-state';
import { CastMember } from '../../../shared/models/movie.model';
import { SearchResultGrid } from '../components/search-result-grid/search-result-grid';
import { SearchFilters } from '../components/search-filters/search-filters';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NnInput } from '../../../shared/components/nn-input/nn-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { checkSearchEmptiness } from '../utils/search.utils';

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
    public readonly searchIconPath: string = 'images/svg/search/search.svg';

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

    public readonly isEmpty = computed<boolean>(() =>
        checkSearchEmptiness(
            this.searchType(),
            {
                movies: this.movieResults(),
                tv: this.tvResults(),
                actors: this.actorResults(),
            },
            this.isLoading(),
            this.searchControl.value,
            this.searchStore.query(),
        ),
    );

    constructor() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter((val) => val.length > 2 || val.length === 0),
                tap((value) => {
                    this.searchStore.updateQuery(value);
                    this.searchStore.search(value);
                }),
                takeUntilDestroyed(),
            )
            .subscribe();
    }

    public ngOnInit(): void {
        this.searchControl.setValue(this.searchStore.query(), { emitEvent: false });
    }

    public onTypeChange(type: 'multi' | 'movie' | 'tv' | 'person'): void {
        this.searchStore.updateType(type);
    }
}
