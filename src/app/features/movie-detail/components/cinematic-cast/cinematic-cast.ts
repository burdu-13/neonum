import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { CastGrid } from '../cast-grid/cast-grid';
import { CastMember } from '../../../../shared/models/movie.model';

@Component({
    selector: 'app-cinematic-cast',
    imports: [Skeleton, CastGrid],
    templateUrl: './cinematic-cast.html',
    styleUrl: './cinematic-cast.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinematicCast {
    public readonly cast = input.required<CastMember[]>();
    public readonly isLoading = input<boolean>(false);

    
}
