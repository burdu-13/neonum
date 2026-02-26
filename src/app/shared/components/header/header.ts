import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from '../../../store/user-info/user.store';
import { BreakpointService } from '../../services/breakpoint-service/breakpoint-service';
import { Skeleton } from '../skeleton/skeleton';
import { NnButton } from "../nn-button/nn-button";

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, MatIconModule, Skeleton, NnButton],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    public readonly store = inject(UserStore);
    public readonly bp = inject(BreakpointService);
    public readonly router = inject(Router);
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

    public goToLogin(): void {
        this.closeMenu();
        this.router.navigate(['/auth/login']);
    }
}
