import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NnButton } from '../../../../shared/components/nn-button/nn-button';
import { MovieDetails } from '../../../../shared/models/movie.model';
import { NnTooltipDirective } from '../../../../shared/components/nn-tooltip/directives/tooltip';

@Component({
    selector: 'app-movie-actions',
    imports: [NnButton,NnTooltipDirective],
    templateUrl: './movie-actions.html',
    styleUrl: './movie-actions.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieActions {
    public readonly movie = input.required<MovieDetails | null>();
    public readonly watchlistIds = input.required<number[]>();
    public readonly favoriteIds = input.required<number[]>();
    public readonly hasTrailer = input<boolean>(false);
    public readonly isMember = input<boolean>(false);

    public readonly toggleWatchlist = output<{ id: number; status: boolean }>();
    public readonly toggleFavorite = output<{ id: number; status: boolean }>();
    public readonly openTrailer = output<void>();
}
