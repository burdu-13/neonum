import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    signal,
    untracked,
} from '@angular/core';
import { ExploreStore } from '../store/explore.store';
import { MovieCard } from '../../dashboard/components/movie-card/movie-card';
import { InteractionObserver } from '../../../shared/directives/interaction-observer';
import { BreakpointService } from '../../../shared/services/breakpoint-service/breakpoint-service';
import { ExploreFilters } from '../components/explore-filters/explore-filters';
import { ExploreHeader } from '../components/explore-header/explore-header';
import { EXPLORE_TYPE_OPTIONS } from '../components/explore-header/config/toggle.config';

@Component({
    selector: 'app-explore-container',
    imports: [MovieCard, InteractionObserver, ExploreFilters, ExploreHeader],
    templateUrl: './explore-container.html',
    styleUrl: './explore-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureContainer {
    protected readonly exploreStore = inject(ExploreStore);
    protected readonly breakpointService = inject(BreakpointService);

    private readonly mobileFiltersToggled = signal(false);

    protected readonly contentType = signal('movie');
    protected readonly typeOptions = EXPLORE_TYPE_OPTIONS;

    private lastType?: string;

    protected readonly isFiltersExpanded = computed(() => {
        if (!this.breakpointService.isMobile()) return true;
        return this.mobileFiltersToggled();
    });

    protected readonly activeGenreIds = computed(() => {
        const genres = this.exploreStore.filters().with_genres;
        return genres ? genres.split(',').filter((id) => !!id) : [];
    });

    protected readonly sortValue = signal(this.exploreStore.filters().sort_by);

    constructor() {
        effect(() => {
            const sort = this.sortValue();
            const type = this.contentType() as 'movie' | 'tv';

            untracked(() => {
                if (this.lastType !== type) {
                    this.exploreStore.loadGenres(type);
                    this.lastType = type;
                }

                this.exploreStore.updateFilters({
                    sort_by: sort,
                    type: type,
                });
            });
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
