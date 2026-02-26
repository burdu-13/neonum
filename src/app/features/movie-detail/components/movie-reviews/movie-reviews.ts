import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MetaBadge } from '../../../../shared/components/meta-badge/meta-badge';
import { Review } from '../../../../shared/models/movie.model';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image-pipe';
import { NnButton } from '../../../../shared/components/nn-button/nn-button';
import { NnEmptyState } from "../../../../shared/components/nn-empty-state/nn-empty-state";

@Component({
    selector: 'app-movie-reviews',
    imports: [CommonModule, MetaBadge, TmdbImagePipe, NnButton, NnEmptyState],
    templateUrl: './movie-reviews.html',
    styleUrl: './movie-reviews.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieReviews {
    public readonly reviews = input.required<Review[]>();
    public readonly hasMore = input<boolean>(false);
    public readonly loadMore = output<void>();

    protected readonly expandedReviewIds = signal<Set<string>>(new Set());

    protected toggleExpand(id: string): void {
        const nextSet = new Set(this.expandedReviewIds());
        if (nextSet.has(id)) {
            nextSet.delete(id);
        } else {
            nextSet.add(id);
        }
        this.expandedReviewIds.set(nextSet);
    }
}
