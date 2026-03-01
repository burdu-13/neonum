import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    signal,
    untracked,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MovieStore } from '../../../store/movie/movie.store';
import { MovieTrailer } from '../../../shared/components/movie-trailer/movie-trailer';
import { Movie, MovieDetails, ReviewPayload, TVShow } from '../../../shared/models/movie.model';
import { MovieFeedback } from '../components/movie-feedback/movie-feedback';
import { MovieActions } from '../components/movie-actions/movie-actions';
import { MovieHero } from '../components/movie-hero/movie-hero';
import { ActivatedRoute } from '@angular/router';
import { HeroDisplayModel } from '../models/cinematic.config';
import { isTVShow } from '../utils/cinematics.utils';
import { CinematicCast } from '../components/cinematic-cast/cinematic-cast';
import { CinematicSeasons } from '../components/cinematic-seasons/cinematic-seasons';
import { CinematicSynopsis } from '../components/cinematic-synopsis/cinematic-synopsis';
import { CinematicEpisodes } from '../components/cinematic-episodes/cinematic-episodes';
import { UserStore } from '../../../store/user-info/user.store';
import { SimilarMovies } from '../components/similar-movies/similar-movies';

@Component({
    selector: 'app-movie-detailer-container',
    imports: [
        MatIconModule,
        MovieTrailer,
        MovieFeedback,
        MovieActions,
        MovieHero,
        CinematicCast,
        CinematicSeasons,
        CinematicSynopsis,
        CinematicEpisodes,
        SimilarMovies,
    ],
    templateUrl: './movie-detailer-container.html',
    styleUrl: './movie-detailer-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailerContainer {
    public readonly movieStore = inject(MovieStore);
    private readonly route = inject(ActivatedRoute);
    protected readonly userStore = inject(UserStore);

    public readonly id = input.required<string>();
    public isTrailerOpen = signal(false);

    protected readonly activeSeasonNumber = signal<number | null>(null);

    public readonly trailerKey = computed(() => {
        const videos = this.movieStore.selectedMovie()?.videos?.results;
        const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        return trailer?.key || videos?.[0]?.key || null;
    });

    protected readonly isMember = computed(() => !!this.userStore.account());

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
        if (!movie) return;

        if (this.activeSeasonNumber() === seasonNumber) {
            this.activeSeasonNumber.set(null);
            this.movieStore.clearSeasonEpisodes();
        } else {
            this.activeSeasonNumber.set(seasonNumber);
            this.movieStore.loadSeasonDetails({
                tvId: movie.id,
                seasonNumber,
            });
        }
    }

    constructor() {
        effect(() => {
            const segments =
                this.route.snapshot.url.length > 0
                    ? this.route.snapshot.url
                    : this.route.parent?.snapshot.url;

            const type = segments?.[0]?.path as 'movie' | 'tv';

            if (type && this.id()) {
                this.movieStore.loadMovieDetail({
                    id: this.id(),
                    type,
                });
            }
        });

        effect(() => {
            if (this.isMember() && !this.movieStore.collectionsLoaded()) {
                untracked(() => this.movieStore.loadCollections());
            }
        });
    }

    public get topCast() {
        return this.movieStore.selectedMovie()?.credits?.cast?.slice(0, 8) || [];
    }

    protected readonly similarMovies = computed(() => {
        const movie = this.movieStore.selectedMovie() as MovieDetails & {
            recommendations?: { results: (Movie | TVShow)[] };
            similar?: { results: (Movie | TVShow)[] };
        };

        if (!movie) return [];

        const results = movie.recommendations?.results || movie.similar?.results || [];
        return results.slice(0, 12);
    });

    public handleReviewSubmit(payload: ReviewPayload, movieId: number): void {
        this.movieStore.submitRating({
            id: movieId,
            rating: payload.rating,
        });
    }
}
