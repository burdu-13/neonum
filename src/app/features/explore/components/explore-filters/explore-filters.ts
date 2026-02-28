import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { Genre } from '../../models/explore.model';
import { CategoryPill } from '../../../../shared/components/category-pill/category-pill';
import { MatIcon } from '@angular/material/icon';
import { NnToggle } from '../../../../shared/components/nn-toggle/nn-toggle';
import { ToggleOption } from '../../../../shared/components/nn-toggle/models/toggle.model';

@Component({
    selector: 'app-explore-filters',
    imports: [CategoryPill, MatIcon, NnToggle],
    templateUrl: './explore-filters.html',
    styleUrl: './explore-filters.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreFilters {
    public readonly contentType = model.required<string>();
    public readonly typeOptions = input.required<ToggleOption[]>();

    public readonly genres = input.required<Genre[]>();
    public readonly activeGenreIds = input.required<string[]>();
    public readonly isExpanded = input.required<boolean>();
    public readonly showToggle = input<boolean>(false);

    public readonly toggle = output<void>();
    public readonly genreChange = output<number>();
}
