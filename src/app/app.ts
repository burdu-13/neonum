import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import {
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterOutlet,
} from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AlertUi } from './shared/components/alert/alert';
import { GlobalStore } from './store/global/global.store';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NnGuestBanner } from './shared/components/nn-guest-banner/nn-guest-banner';
import { UserStore } from './store/user-info/user.store';
import { NnGlobalLoader } from "./shared/components/nn-global-loader/nn-global-loader";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer, AlertUi, NnGuestBanner, NnGlobalLoader],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly title = signal('neonum');
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    protected readonly globalStore = inject(GlobalStore);
    protected readonly userStore = inject(UserStore);

    constructor() {
        this.router.events
            .pipe(
                filter(
                    (e) =>
                        e instanceof NavigationStart ||
                        e instanceof NavigationEnd ||
                        e instanceof NavigationCancel ||
                        e instanceof NavigationError,
                ),
                tap((event) => {
                    if (event instanceof NavigationStart) {
                        this.globalStore.setLoading(true);
                    } else {
                        window.scrollTo({ top: 0, behavior: 'instant' });

                        setTimeout(() => {
                            this.globalStore.setLoading(false);
                        }, 300);
                    }
                }),
                takeUntilDestroyed(),
            )
            .subscribe();
    }

    protected navigateToSignUp(): void {
        this.router.navigate(['/auth/sign-up']);
    }
}
