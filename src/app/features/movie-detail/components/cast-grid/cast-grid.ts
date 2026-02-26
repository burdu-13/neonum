import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CastMember } from '../../../../shared/models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cast-grid',
    imports: [MatIcon,RouterLink],
    templateUrl: './cast-grid.html',
    styleUrl: './cast-grid.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastGrid {
    public readonly cast = input.required<CastMember[]>();
}
