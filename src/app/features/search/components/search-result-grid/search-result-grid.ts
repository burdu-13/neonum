import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MovieCard } from '../../../../shared/components/movie-card/movie-card';
import { CastGrid } from '../../../movie-detail/components/cast-grid/cast-grid';
import { CastMember, Movie, TVShow } from '../../../../shared/models/movie.model';

@Component({
    selector: 'app-search-result-grid',
    imports: [MovieCard, CastGrid],
    templateUrl: './search-result-grid.html',
    styleUrl: './search-result-grid.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultGrid {
    public readonly title = input.required<string>();
    public readonly type = input.required<'movie' | 'tv' | 'person'>();
    public readonly items = input<Movie[] | TVShow[]>([]);
    public readonly actors = input<CastMember[]>([]);

    protected readonly displayItems = computed<(Movie | TVShow)[]>(() => this.items());
}
