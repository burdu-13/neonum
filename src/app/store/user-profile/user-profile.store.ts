import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { UserStore } from '../user-info/user.store';

interface UserProfileState {
    viewedUserId: number | null;
    isEditMode: boolean;
}

export const UserProfileStore = signalStore(
    withState<UserProfileState>({
        viewedUserId: null,
        isEditMode: false,
    }),
    withComputed((store, userStore = inject(UserStore)) => ({
        isOwnProfile: computed(() => {
            const currentId = userStore.account()?.id;
            return !!currentId && store.viewedUserId() === currentId;
        }),

        userProfileData: computed(() => {
            if (store.viewedUserId() === userStore.account()?.id) {
                return userStore.account();
            }
            return null;
        }),
    })),
    withMethods((store) => ({
        setProfileId(id: number) {
            patchState(store, { viewedUserId: id });
        },
        toggleEditMode() {
            patchState(store, { isEditMode: !store.isEditMode() });
        },
    })),
);
