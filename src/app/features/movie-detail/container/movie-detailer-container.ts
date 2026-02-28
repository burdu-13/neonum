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
import { MovieDetails, ReviewPayload } from '../../../shared/models/movie.model';
import { MovieFeedback } from '../components/movie-feedback/movie-feedback';
import { MovieActions } from '../components/movie-actions/movie-actions';
import { MovieHero } from '../components/movie-hero/movie-hero';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { ActivatedRoute } from '@angular/router';
import { HeroDisplayModel } from '../models/cinematic.config';
import { isTVShow } from '../utils/cinematics.utils';
import { CinematicCast } from "../components/cinematic-cast/cinematic-cast";
import { CinematicSeasons } from "../components/cinematic-seasons/cinematic-seasons";
import { CinematicSynopsis } from "../components/cinematic-synopsis/cinematic-synopsis";
import { CinematicEpisodes } from "../components/cinematic-episodes/cinematic-episodes";

@Component({
    selector: 'app-movie-detailer-container',
    imports: [
    MatIconModule,
    CastGrid,
    MovieTrailer,
    MovieFeedback,
    MovieActions,
    MovieHero,
    Skeleton,
    CinematicCast,
    CinematicSeasons,
    CinematicSynopsis,
    CinematicEpisodes
],
    templateUrl: './movie-detailer-container.html',
    styleUrl: './movie-detailer-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailerContainer {
    public readonly movieStore = inject(MovieStore);
    private readonly route = inject(ActivatedRoute);

    public readonly id = input.required<string>();
    public isTrailerOpen = signal(false);

    public readonly trailerKey = computed(() => {
        const videos = this.movieStore.selectedMovie()?.videos?.results;
        const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        return trailer?.key || videos?.[0]?.key || null;
    });

    protected readonly heroDisplay = computed((): HeroDisplayModel | null => {
        const movie = this.movieStore.selectedMovie();
        if (!movie) return null;

        const tv = isTVShow(movie);

        return {
            title: tv ? movie.name : (movie as MovieDetails).title,
            tagline: movie.tagline || '',
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            rating: movie.vote_average,
            metadata: [
                {
                    text: new Date(tv ? movie.first_air_date : (movie as MovieDetails).release_date)
                        .getFullYear()
                        .toString(),
                },
                ...(tv
                    ? [
                          { text: `${movie.number_of_seasons} SEASONS` },
                          { text: `${movie.number_of_episodes} EPISODES` },
                      ]
                    : [{ text: `${(movie as MovieDetails).runtime} MIN` }]),
            ],
            genres: movie.genres,
        };
    });

    protected readonly seasons = computed(() => {
        const movie = this.movieStore.selectedMovie();
        return movie && isTVShow(movie) ? movie.seasons : [];
    });

    public onSeasonSelect(seasonNumber: number): void {
        const movie = this.movieStore.selectedMovie();
        if (movie) {
            this.movieStore.loadSeasonDetails({
                tvId: movie.id,
                seasonNumber,
            });
        }
    }

    constructor() {
        effect(() => {
            const type = this.route.snapshot.url[0].path as 'movie' | 'tv';

            this.movieStore.loadMovieDetail({
                id: this.id(),
                type,
            });
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
