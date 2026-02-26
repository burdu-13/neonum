import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'app-search-filters',
    imports: [],
    templateUrl: './search-filters.html',
    styleUrl: './search-filters.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilters {
    public readonly activeType = input.required<'multi' | 'movie' | 'tv' | 'person'>();
    public readonly filterChanged = output<'multi' | 'movie' | 'tv' | 'person'>();

    protected readonly filterOptions: ('multi' | 'movie' | 'tv' | 'person')[] = [
        'multi',
        'movie',
        'tv',
        'person',
    ];

    protected readonly labels: Record<string, string> = {
        multi: 'ALL-STREAMS',
        movie: 'CINEMA-REELS',
        tv: 'BROADCAST-SIGNALS',
        person: 'ENTITY-PROFILES',
    };

    public onFilterSelect(type: 'multi' | 'movie' | 'tv' | 'person'): void {
        this.filterChanged.emit(type);
    }
}
