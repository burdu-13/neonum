import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../../dashboard/models/movie.model';
import { MovieCard } from "../../../dashboard/components/movie-card/movie-card";

@Component({
    selector: 'app-similar-movies',
    imports: [MovieCard],
    templateUrl: './similar-movies.html',
    styleUrl: './similar-movies.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarMovies {
    public readonly movies = input.required<Movie[]>();
}
