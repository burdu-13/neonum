import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
    selector: 'app-movie-card',
    imports: [CommonModule],
    templateUrl: './movie-card.html',
    styleUrl: './movie-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
    public readonly movie = input.required<Movie>();
}
