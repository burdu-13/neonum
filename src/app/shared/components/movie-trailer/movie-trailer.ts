import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';

@Component({
    selector: 'app-movie-trailer',
    imports: [MatIcon, SafeUrlPipe],
    templateUrl: './movie-trailer.html',
    styleUrl: './movie-trailer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieTrailer {
    public readonly trailerKey = input.required<string>();
    public readonly close = output<void>();
}
