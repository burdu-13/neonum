import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from '../../../store/user-info/user.store';
import { BreakpointService } from '../../services/breakpoint-service/breakpoint-service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, MatIconModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    public readonly store = inject(UserStore);
    public readonly bp = inject(BreakpointService);
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
}
