import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { ActorStore } from '../store/actor.store';
import { NnEmptyState } from "../../../shared/components/nn-empty-state/nn-empty-state";
import { MovieCard } from "../../dashboard/components/movie-card/movie-card";
import { Skeleton } from "../../../shared/components/skeleton/skeleton";
import { ActorHero } from "../components/actor-hero/actor-hero";

@Component({
    selector: 'app-actor-detail-container',
    imports: [NnEmptyState, MovieCard, Skeleton, ActorHero],
    templateUrl: './actor-detail-container.html',
    styleUrl: './actor-detail-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetailContainer {
    public readonly actorStore = inject(ActorStore);
    public readonly id = input.required<string>();

    constructor() {
        effect(() => {
            this.actorStore.loadActorDetails(this.id());
        });
    }
}
