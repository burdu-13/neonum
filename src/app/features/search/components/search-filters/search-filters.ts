import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MediaType } from '../../../../shared/models/search.model';
import { SEARCH_FILTER_LABELS, SEARCH_FILTER_OPTIONS } from '../../config/search-filter.config';

@Component({
    selector: 'app-search-filters',
    imports: [],
    templateUrl: './search-filters.html',
    styleUrl: './search-filters.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilters {
    public readonly activeType = input.required<MediaType>();
    public readonly filterChanged = output<MediaType>();
    protected readonly filterOptions = SEARCH_FILTER_OPTIONS;
    protected readonly labels = SEARCH_FILTER_LABELS;
    public onFilterSelect(type: MediaType): void {
        this.filterChanged.emit(type);
    }
}
