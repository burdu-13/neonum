import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from "../../../../shared/components/skeleton/skeleton";

@Component({
    selector: 'app-cinematic-synopsis',
    imports: [Skeleton],
    templateUrl: './cinematic-synopsis.html',
    styleUrl: './cinematic-synopsis.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinematicSynopsis {
    public readonly overview = input<string | undefined>();
    public readonly isLoading = input<boolean>(false);
}
