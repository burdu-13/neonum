import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MetaBadge } from '../../../../shared/components/meta-badge/meta-badge';
import { Review } from '../../../../shared/models/movie.model';

@Component({
    selector: 'app-movie-reviews',
    imports: [CommonModule, MetaBadge],
    templateUrl: './movie-reviews.html',
    styleUrl: './movie-reviews.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieReviews {
    public readonly reviews = input.required<Review[]>();

    public getAvatarUrl(path: string | null): string | null {
        if (!path) return null;

        if (path.startsWith('http') || path.startsWith('https')) {
            return path.startsWith('/http') ? path.substring(1) : path;
        }

        return `https://image.tmdb.org/t/p/w150${path}`;
    }
}
