import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MovieCard } from '../../../../shared/components/movie-card/movie-card';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { Movie } from '../../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-movie-shelf',
    imports: [MovieCard, Skeleton, CommonModule],
    templateUrl: './movie-shelf.html',
    styleUrl: './movie-shelf.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieShelf {
    public readonly title = input.required<string>();
    public readonly movies = input.required<Movie[]>();
    public readonly isLoading = input<boolean>(false);
    public readonly isPersonal = input<boolean>(false);
    public readonly emptyMessage = input<string>('No cinematic assets available.');
}
