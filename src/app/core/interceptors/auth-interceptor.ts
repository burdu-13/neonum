import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const sessionId = localStorage.getItem('neonum_session_id');
    const isAuthRequest = req.url.includes('authentication');

    if (sessionId && !isAuthRequest) {
        const authReq = req.clone({
            setParams: { session_id: sessionId },
        });
        return next(authReq);
    }

    return next(req);
};
