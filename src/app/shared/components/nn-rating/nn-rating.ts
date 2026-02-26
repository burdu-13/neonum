import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-nn-rating',
    imports: [MatIcon],
    templateUrl: './nn-rating.html',
    styleUrl: './nn-rating.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnRating {
    public readonly value = input<number>(0);
    public readonly valueChange = output<number>();
    protected readonly hoveredStar = signal(0);
}
