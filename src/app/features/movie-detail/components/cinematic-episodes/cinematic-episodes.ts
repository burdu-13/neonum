import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { Episode } from '../../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cinematic-episodes',
    imports: [Skeleton,CommonModule],
    templateUrl: './cinematic-episodes.html',
    styleUrl: './cinematic-episodes.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinematicEpisodes {
    public readonly episodes = input<Episode[]>([]);
    public readonly isLoading = input<boolean>(false);
}
