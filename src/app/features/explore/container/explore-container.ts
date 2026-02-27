import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { ExploreStore } from '../store/explore.store';
import { MovieCard } from '../../dashboard/components/movie-card/movie-card';
import { InteractionObserver } from '../../../shared/directives/interaction-observer';
import { BreakpointService } from '../../../shared/services/breakpoint-service/breakpoint-service';
import { ExploreFilters } from '../components/explore-filters/explore-filters';
import { ExploreHeader } from '../components/explore-header/explore-header';

@Component({
    selector: 'app-explore-container',
    imports: [
        MovieCard,
        InteractionObserver,
        ExploreFilters,
        ExploreHeader,
    ],
    templateUrl: './explore-container.html',
    styleUrl: './explore-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureContainer implements OnInit {
    protected readonly exploreStore = inject(ExploreStore);
    protected readonly breakpointService = inject(BreakpointService);

    private readonly mobileFiltersToggled = signal(false);

    protected readonly isFiltersExpanded = computed(() => {
        if (!this.breakpointService.isMobile()) return true;
        return this.mobileFiltersToggled();
    });

    protected readonly activeGenreIds = computed(
        () => this.exploreStore.filters().with_genres?.split(',') ?? [],
    );

    protected readonly sortValue = signal(this.exploreStore.filters().sort_by);

    constructor() {
        effect(() => {
            const val = this.sortValue();
            if (val !== this.exploreStore.filters().sort_by) {
                this.exploreStore.updateFilters({ sort_by: val });
            }
        });
    }

    public ngOnInit(): void {
        this.exploreStore.loadGenres();
        this.exploreStore.loadMovies({
            filters: this.exploreStore.filters(),
            append: false,
        });
    }

    protected toggleFilters(): void {
        this.mobileFiltersToggled.update((v) => !v);
    }

    protected handleGenreChange(genreId: number): void {
        const currentGenres = this.activeGenreIds();
        const idStr = genreId.toString();
        const newGenres = currentGenres.includes(idStr)
            ? currentGenres.filter((id) => id !== idStr)
            : [...currentGenres, idStr];

        this.exploreStore.updateFilters({ with_genres: newGenres.join(',') });
    }
}
