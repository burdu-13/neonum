import { DropdownOption } from '../../../../../shared/components/nn-dropdown/models/dropdown.model';
import { ToggleOption } from '../../../../../shared/components/nn-toggle/models/toggle.model';

export const EXPLORE_SORT_OPTIONS: DropdownOption[] = [
    { label: 'Most Popular', value: 'popularity.desc' },
    { label: 'Newest Releases', value: 'primary_release_date.desc' },
    { label: 'Top Rated', value: 'vote_average.desc' },
];

export const EXPLORE_TYPE_OPTIONS: ToggleOption[] = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
];
