import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NnButton } from '../../../../../../shared/components/nn-button/nn-button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NnRating } from '../../../../../../shared/components/nn-rating/nn-rating';
import { ReviewPayload } from '../../../../../../shared/models/movie.model';

@Component({
    selector: 'app-movie-review-form',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, NnButton, NnRating],
    templateUrl: './movie-review-form.html',
    styleUrl: './movie-review-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieReviewForm {
    public reviewContent = '';
    public rating = 0;
    public readonly submit = output<ReviewPayload>();
}
