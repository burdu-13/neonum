import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { ActorDetails } from '../../../../shared/models/actor.model';

@Component({
    selector: 'app-actor-hero',
    imports: [Skeleton],
    templateUrl: './actor-hero.html',
    styleUrl: './actor-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorHero {
    public readonly actor = input<ActorDetails | null>(null);
    public readonly isLoading = input<boolean>(false);

    public readonly profileUrl = computed(() => {
        const path = this.actor()?.profile_path;
        return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
    });
}
