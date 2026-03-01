import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Movie, TVShow } from '../../models/movie.model';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-movie-card',
    imports: [CommonModule, MatIcon, RouterLink, NgOptimizedImage],
    templateUrl: './movie-card.html',
    styleUrl: './movie-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
    public readonly movie = input.required<Movie | TVShow>();
    public readonly priority = input<boolean>(false);
    protected readonly isLoaded = signal<boolean>(false);

    protected readonly displayData = computed(() => {
        const item = this.movie();

        const type = 'title' in item ? 'movie' : 'tv';
        const title = 'title' in item ? item.title : item.name;
        const date = 'release_date' in item ? item.release_date : item.first_air_date;

        return {
            id: item.id,
            title,
            date,
            type,
            poster: item.poster_path,
            rating: item.vote_average,
        };
    });
}
