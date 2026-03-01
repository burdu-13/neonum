import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Review, ReviewPayload } from '../../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MovieReviews } from '../movie-reviews/movie-reviews';
import { MovieReviewForm } from '../movie-reviews/components/movie-review-form/movie-review-form';
import { NnEmptyState } from '../../../../shared/components/nn-empty-state/nn-empty-state';

@Component({
    selector: 'app-movie-feedback',
    imports: [CommonModule, MatIcon, MovieReviews, MovieReviewForm, NnEmptyState],
    templateUrl: './movie-feedback.html',
    styleUrl: './movie-feedback.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFeedback {
    public readonly reviews = input.required<Review[]>();
    public readonly hasMore = input<boolean>(false);
    public readonly isRated = input<boolean>(false);
    public readonly isMember = input<boolean>(false);

    public readonly loadMore = output<void>();
    public readonly submitReview = output<ReviewPayload>();
}
