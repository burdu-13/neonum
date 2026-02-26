import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Movie, TVShow } from '../../../../shared/models/movie.model';
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
    public readonly movie = input.required<Movie | TVShow>();
    public readonly priority = input<boolean>(false);

    protected readonly displayData = computed(() => {
        const item = this.movie();

        const title = 'title' in item ? item.title : item.name;
        const date = 'release_date' in item ? item.release_date : item.first_air_date;
        const poster = item.poster_path;
        const rating = item.vote_average;

        return {
            id: item.id,
            title,
            date,
            poster,
            rating,
        };
    });
}
