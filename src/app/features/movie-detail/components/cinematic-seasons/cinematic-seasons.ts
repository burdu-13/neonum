import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Season } from '../../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cinematic-seasons',
    imports: [CommonModule],
    templateUrl: './cinematic-seasons.html',
    styleUrl: './cinematic-seasons.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinematicSeasons {
    public readonly seasons = input.required<Season[]>();
    public readonly seasonClicked = output<number>();
    public readonly activeSeason = input<number | null>(null);
}
