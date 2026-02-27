import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MovieShelf } from '../../dashboard/components/movie-shelf/movie-shelf';
import { NnButton } from '../../../shared/components/nn-button/nn-button';
import { UserStore } from '../../../store/user-info/user.store';
import { MovieStore } from '../../../store/movie/movie.store';
import { UserProfileStore } from '../../../store/user-profile/user-profile.store';

@Component({
    selector: 'app-user-profile-container',
    imports: [MovieShelf],
    providers: [UserProfileStore],
    templateUrl: './user-profile-container.html',
    styleUrl: './user-profile-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainer implements OnInit {
    protected readonly userStore = inject(UserStore);
    protected readonly movieStore = inject(MovieStore);
    protected readonly profileStore = inject(UserProfileStore);
    public readonly id = input<string>();

    ngOnInit(): void {
        const profileId = this.id();
        if (profileId && profileId !== 'me') {
            this.profileStore.setProfileId(Number(profileId));
        } else {
            const currentUserId = this.userStore.account()?.id;
            if (currentUserId) this.profileStore.setProfileId(currentUserId);
        }

        if (!this.movieStore.collectionsLoaded()) {
            this.movieStore.loadCollections();
        }
    }
}
