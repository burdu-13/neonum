import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie, TVShow } from '../../../../shared/models/movie.model';
import { MovieCard } from '../../../../shared/components/movie-card/movie-card';

@Component({
    selector: 'app-similar-movies',
    imports: [MovieCard],
    templateUrl: './similar-movies.html',
    styleUrl: './similar-movies.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarMovies {
    public readonly media = input.required<(Movie | TVShow)[]>();
}
