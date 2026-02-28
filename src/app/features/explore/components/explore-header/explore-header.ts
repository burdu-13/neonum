import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { NnDropdown } from '../../../../shared/components/nn-dropdown/nn-dropdown';
import { EXPLORE_SORT_OPTIONS } from '../../config/explore.config';

@Component({
    selector: 'app-explore-header',
    imports: [NnDropdown],
    templateUrl: './explore-header.html',
    styleUrl: './explore-header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreHeader {
    public readonly sortValue = model.required<string>();
    protected readonly sortOptions = EXPLORE_SORT_OPTIONS;
}
