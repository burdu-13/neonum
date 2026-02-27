import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ExploreStore } from '../store/explore.store';
import { MovieCard } from "../../dashboard/components/movie-card/movie-card";
import { Skeleton } from "../../../shared/components/skeleton/skeleton";
import { CategoryPill } from "../../../shared/components/category-pill/category-pill";
import { NnEmptyState } from "../../../shared/components/nn-empty-state/nn-empty-state";

@Component({
    selector: 'app-explore-container',
    imports: [MovieCard, Skeleton, CategoryPill, NnEmptyState],
    templateUrl: './explore-container.html',
    styleUrl: './explore-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureContainer implements OnInit {
    protected readonly exploreStore = inject(ExploreStore);

    handleGenreChange(genreId: number): void {
        const currentGenres = this.exploreStore.filters().with_genres?.split(',') || [];
        const idStr = genreId.toString();

        const newGenres = currentGenres.includes(idStr)
            ? currentGenres.filter((id) => id !== idStr)
            : [...currentGenres, idStr];

        this.exploreStore.updateFilters({ with_genres: newGenres.join(',') });
        this.exploreStore.loadMovies(this.exploreStore.filters());
    }

    ngOnInit(): void {
        this.exploreStore.loadGenres();
        this.exploreStore.loadMovies(this.exploreStore.filters());
    }
}
