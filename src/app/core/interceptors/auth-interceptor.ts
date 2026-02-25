import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStore } from '../../store/user-info/user.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(UserStore);
    const sessionId = store.sessionId();
    const isAuthRequest = req.url.includes('authentication');
    if (sessionId && !isAuthRequest) {
        const authReq = req.clone({
            setParams: { session_id: sessionId },
        });
        return next(authReq);
    }

    return next(req);
};
