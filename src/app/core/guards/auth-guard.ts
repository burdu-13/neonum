import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../store/user-info/user.store';

export const authGuard: CanActivateFn = () => {
    const store = inject(UserStore);
    const router = inject(Router);

    if (store.isAuthenticated()) {
        return true;
    }

    return router.parseUrl('/auth/login');
};
