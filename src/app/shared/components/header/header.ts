import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from '../../../store/user-info/user.store';
import { BreakpointService } from '../../services/breakpoint-service/breakpoint-service';
import { Skeleton } from '../skeleton/skeleton';
import { NnButton } from '../nn-button/nn-button';
import { MovieStore } from '../../../store/movie/movie.store';
import { MobileMenu } from './components/mobile-menu/mobile-menu';
import { NavLink } from './components/nav-link/nav-link';
import { BrandLogo } from './components/brand-logo/brand-logo';
import { NnTooltipDirective } from '../nn-tooltip/directives/tooltip';

@Component({
    selector: 'app-header',
    imports: [
        MatIconModule,
        Skeleton,
        NnButton,
        MobileMenu,
        NavLink,
        BrandLogo,
        NnTooltipDirective,
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    public readonly router = inject(Router);
    protected readonly store = inject(UserStore);
    protected readonly movieStore = inject(MovieStore);
    protected readonly bp = inject(BreakpointService);

    public isMenuOpen = signal(false);

    constructor() {
        effect(() => {
            if ((this.bp.isLargeTablet() || this.bp.isDesktop()) && this.isMenuOpen()) {
                this.closeMenu();
            }
        });
        effect(() => {
            document.body.style.overflow = this.isMenuOpen() ? 'hidden' : 'auto';
        });
    }

    public toggleMenu(): void {
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    public closeMenu(): void {
        this.isMenuOpen.set(false);
    }

    protected handleLogout(): void {
        this.store.logout();
        this.closeMenu();
    }

    protected handleLuckyClick(): void {
        this.movieStore.getRandomContent();

        this.closeMenu();
    }
}
