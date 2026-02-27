import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ExploreStore } from '../store/explore.store';
import { MovieCard } from '../../dashboard/components/movie-card/movie-card';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { CategoryPill } from '../../../shared/components/category-pill/category-pill';
import { NnEmptyState } from '../../../shared/components/nn-empty-state/nn-empty-state';
import { InteractionObserver } from '../../../shared/directives/interaction-observer';

@Component({
    selector: 'app-explore-container',
    imports: [MovieCard, Skeleton, CategoryPill, NnEmptyState,InteractionObserver],
    templateUrl: './explore-container.html',
    styleUrl: './explore-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureContainer implements OnInit {
    protected readonly exploreStore = inject(ExploreStore);

    public ngOnInit(): void {
        this.exploreStore.loadGenres();
        this.exploreStore.loadMovies({
            filters: this.exploreStore.filters(),
            append: false,
        });
    }

    protected handleGenreChange(genreId: number): void {
        const currentGenres = this.exploreStore.filters().with_genres?.split(',') || [];
        const idStr = genreId.toString();

        const newGenres = currentGenres.includes(idStr)
            ? currentGenres.filter((id) => id !== idStr)
            : [...currentGenres, idStr];

        this.exploreStore.updateFilters({ with_genres: newGenres.join(',') });
    }

    protected handleSortChange(event: Event): void {
        const sortBy = (event.target as HTMLSelectElement).value;
        this.exploreStore.updateFilters({ sort_by: sortBy });
    }
}
