import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { MetaBadge } from '../../../../shared/components/meta-badge/meta-badge';
import { MovieDetails } from '../../../../shared/models/movie.model';
import { CategoryPill } from '../../../../shared/components/category-pill/category-pill';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-movie-hero',
    imports: [Skeleton, MetaBadge, CategoryPill, CommonModule],
    templateUrl: './movie-hero.html',
    styleUrl: './movie-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieHero {
    public readonly movie = input<MovieDetails | null>(null);
    public readonly isLoading = input<boolean>(false);
}
