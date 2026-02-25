import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MovieDetailStore } from '../movie-detail.store';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MetaBadge } from '../../../shared/components/meta-badge/meta-badge';
import { CategoryPill } from '../../../shared/components/category-pill/category-pill';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { CastGrid } from '../components/cast-grid/cast-grid';
import { SimilarMovies } from "../components/similar-movies/similar-movies";

@Component({
    selector: 'app-movie-detailer-container',
    imports: [MatIconModule, CommonModule, MetaBadge, CategoryPill, Skeleton, CastGrid, SimilarMovies],
    providers: [MovieDetailStore],
    templateUrl: './movie-detailer-container.html',
    styleUrl: './movie-detailer-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailerContainer {
    public readonly store = inject(MovieDetailStore);
    public readonly id = input.required<string>();

    constructor() {
        effect(() => {
            const currentId = this.id();
            if (currentId) {
                window.scrollTo({ top: 0, behavior: 'instant' });
                this.store.loadMovie(currentId);
            }
        });
    }

    public get topCast() {
        return this.store.movie()?.credits?.cast?.slice(0, 8) || [];
    }
}
