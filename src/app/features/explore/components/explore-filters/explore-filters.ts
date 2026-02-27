import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Genre } from '../../models/explore.model';
import { CategoryPill } from '../../../../shared/components/category-pill/category-pill';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-explore-filters',
    imports: [CategoryPill, MatIcon],
    templateUrl: './explore-filters.html',
    styleUrl: './explore-filters.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreFilters {
    public readonly genres = input.required<Genre[]>();
    public readonly activeGenreIds = input.required<string[]>();
    public readonly isExpanded = input.required<boolean>();
    public readonly showToggle = input<boolean>(false);

    public readonly toggle = output<void>();
    public readonly genreChange = output<number>();
}
