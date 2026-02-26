import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NnButton } from '../../../../../../shared/components/nn-button/nn-button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-movie-review-form',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, NnButton],
    templateUrl: './movie-review-form.html',
    styleUrl: './movie-review-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieReviewForm {
    public reviewContent = '';
    public readonly submit = output<string>();
}
