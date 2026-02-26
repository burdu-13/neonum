import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CastGrid } from '../components/cast-grid/cast-grid';
import { MovieStore } from '../../../store/movie/movie.store';
import { MovieTrailer } from '../../../shared/components/movie-trailer/movie-trailer';
import { ReviewPayload } from '../../../shared/models/movie.model';
import { MovieFeedback } from '../components/movie-feedback/movie-feedback';
import { MovieActions } from '../components/movie-actions/movie-actions';
import { MovieHero } from '../components/movie-hero/movie-hero';
import { Skeleton } from "../../../shared/components/skeleton/skeleton";

@Component({
    selector: 'app-movie-detailer-container',
    imports: [MatIconModule, CastGrid, MovieTrailer, MovieFeedback, MovieActions, MovieHero, Skeleton],
    templateUrl: './movie-detailer-container.html',
    styleUrl: './movie-detailer-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailerContainer {
    public readonly movieStore = inject(MovieStore);
    public readonly id = input.required<string>();
    public isTrailerOpen = signal(false);

    public readonly trailerKey = computed(() => {
        const videos = this.movieStore.selectedMovie()?.videos?.results;
        const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        return trailer?.key || videos?.[0]?.key || null;
    });

    constructor() {
        effect(() => {
            this.movieStore.loadMovieDetail(this.id());
        });
    }

    public get topCast() {
        return this.movieStore.selectedMovie()?.credits?.cast?.slice(0, 8) || [];
    }

    public handleReviewSubmit(payload: ReviewPayload, movieId: number): void {
        this.movieStore.submitRating({
            id: movieId,
            rating: payload.rating,
        });
    }
}
