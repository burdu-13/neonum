import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-category-pill',
    imports: [],
    templateUrl: './category-pill.html',
    styleUrl: './category-pill.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPill {
    public readonly label = input.required<string>();
}
