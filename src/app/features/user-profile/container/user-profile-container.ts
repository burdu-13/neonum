import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MovieShelf } from '../../dashboard/components/movie-shelf/movie-shelf';
import { NnButton } from '../../../shared/components/nn-button/nn-button';
import { UserStore } from '../../../store/user-info/user.store';
import { MovieStore } from '../../../store/movie/movie.store';
import { UserProfileStore } from '../../../store/user-profile/user-profile.store';
import { ProfileStats } from '../components/profile-stats/profile-stats';
import { ProfileHero } from '../components/profile-hero/profile-hero';
import { Skeleton } from "../../../shared/components/skeleton/skeleton";

@Component({
    selector: 'app-user-profile-container',
    imports: [MovieShelf, ProfileStats, ProfileHero, Skeleton],
    providers: [UserProfileStore],
    templateUrl: './user-profile-container.html',
    styleUrl: './user-profile-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainer implements OnInit {
    protected readonly userStore = inject(UserStore);
    protected readonly movieStore = inject(MovieStore);
    protected readonly profileStore = inject(UserProfileStore);

    public ngOnInit(): void {
        const currentUserId = this.userStore.account()?.id;
        if (currentUserId) {
            this.profileStore.setProfileId(currentUserId);
        }

        if (!this.movieStore.collectionsLoaded()) {
            this.movieStore.loadCollections();
        }
    }
}
