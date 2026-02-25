import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class BreakpointService {
    private readonly observer = inject(BreakpointObserver);

    private readonly queries = {
        mobile: '(max-width: 575px)',
        smallTablet: '(min-width: 576px) and (max-width: 767px)',
        tablet: '(min-width: 576px) and (max-width: 991px)',
        largeTablet: '(min-width: 992px) and (max-width: 1199px)',
        desktop: '(min-width: 1200px)',
    };

    public readonly isMobile = toSignal(
        this.observer.observe(this.queries.mobile).pipe(map((res) => res.matches)),
        { initialValue: false },
    );
    public readonly isSmallTablet = toSignal(
        this.observer.observe(this.queries.smallTablet).pipe(map((res) => res.matches)),
        { initialValue: false },
    );
    public readonly isTablet = toSignal(
        this.observer.observe(this.queries.tablet).pipe(map((res) => res.matches)),
        { initialValue: false },
    );
    public readonly isLargeTablet = toSignal(
        this.observer.observe(this.queries.largeTablet).pipe(map((res) => res.matches)),
        { initialValue: false },
    );
    public readonly isDesktop = toSignal(
        this.observer.observe(this.queries.desktop).pipe(map((res) => res.matches)),
        { initialValue: true },
    );
}
