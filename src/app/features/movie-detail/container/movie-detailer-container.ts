import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MetaBadge } from '../../../shared/components/meta-badge/meta-badge';
import { CategoryPill } from '../../../shared/components/category-pill/category-pill';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { CastGrid } from '../components/cast-grid/cast-grid';
import { SimilarMovies } from '../components/similar-movies/similar-movies';
import { MovieStore } from '../../../store/movie/movie.store';

@Component({
    selector: 'app-movie-detailer-container',
    imports: [
        MatIconModule,
        CommonModule,
        MetaBadge,
        CategoryPill,
        Skeleton,
        CastGrid,
        SimilarMovies,
    ],
    templateUrl: './movie-detailer-container.html',
    styleUrl: './movie-detailer-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailerContainer {
    public readonly movieStore = inject(MovieStore);
    public readonly id = input.required<string>();

    constructor() {
        effect(() => {
            const currentId = this.id();
            this.movieStore.loadMovieDetail(currentId);
        });
    }

    public get topCast() {
        return this.movieStore.selectedMovie()?.credits?.cast?.slice(0, 8) || [];
    }
}
