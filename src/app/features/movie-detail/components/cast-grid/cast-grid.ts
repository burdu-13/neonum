import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CastMember } from '../../../../shared/models/movie.model';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-cast-grid',
    imports: [MatIcon, RouterLink, NgOptimizedImage],
    templateUrl: './cast-grid.html',
    styleUrl: './cast-grid.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastGrid {
    public readonly cast = input.required<CastMember[]>();
}
