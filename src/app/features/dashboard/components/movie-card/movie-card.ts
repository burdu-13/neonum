import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-movie-card',
    imports: [CommonModule, MatIcon, RouterLink],
    templateUrl: './movie-card.html',
    styleUrl: './movie-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
    public readonly movie = input.required<Movie>();
}
