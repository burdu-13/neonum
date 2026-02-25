import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CastActor } from './models/cast.model';

@Component({
    selector: 'app-cast-grid',
    imports: [MatIcon],
    templateUrl: './cast-grid.html',
    styleUrl: './cast-grid.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastGrid {
    public readonly cast = input.required<CastActor[]>();
}
