import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MovieShelf } from '../../dashboard/components/movie-shelf/movie-shelf';
import { UserStore } from '../../../store/user-info/user.store';
import { MovieStore } from '../../../store/movie/movie.store';
import { ProfileStats } from '../components/profile-stats/profile-stats';
import { ProfileHero } from '../components/profile-hero/profile-hero';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { NnEmptyState } from "../../../shared/components/nn-empty-state/nn-empty-state";

@Component({
    selector: 'app-user-profile-container',
    imports: [MovieShelf, ProfileStats, ProfileHero, Skeleton, NnEmptyState],
    templateUrl: './user-profile-container.html',
    styleUrl: './user-profile-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainer implements OnInit {
    protected readonly userStore = inject(UserStore);
    protected readonly movieStore = inject(MovieStore);

    public ngOnInit(): void {
        if (!this.movieStore.collectionsLoaded()) {
            this.movieStore.loadCollections();
        }
    }
}
