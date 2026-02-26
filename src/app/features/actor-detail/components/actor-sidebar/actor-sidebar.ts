import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActorDetails } from '../../../../shared/models/actor.model';
import { Skeleton } from "../../../../shared/components/skeleton/skeleton";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-actor-sidebar',
    imports: [Skeleton,CommonModule],
    templateUrl: './actor-sidebar.html',
    styleUrl: './actor-sidebar.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorSidebar {
    public readonly actor = input<ActorDetails | null>(null);
    public readonly isLoading = input<boolean>(false);
}
