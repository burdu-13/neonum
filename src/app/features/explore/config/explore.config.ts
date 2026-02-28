import { DropdownOption } from '../../../shared/components/nn-dropdown/models/dropdown.model';

export const EXPLORE_SORT_OPTIONS: DropdownOption[] = [
    { label: 'Most Popular', value: 'popularity.desc' },
    { label: 'Newest Releases', value: 'primary_release_date.desc' },
    { label: 'Top Rated', value: 'vote_average.desc' },
];

export const EXPLORE_SKELETON_COUNT = 8;
