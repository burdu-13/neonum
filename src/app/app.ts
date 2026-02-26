import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AlertUi } from './shared/components/alert/alert';
import { GlobalStore } from './store/global/global.store';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer, AlertUi],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly title = signal('neonum');
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    protected readonly globalStore = inject(GlobalStore);

    ngOnInit() {
        this.router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof NavigationStart ||
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError,
                ),

                tap((event) => {
                    if (event instanceof NavigationStart) {
                        this.globalStore.setLoading(true);
                    } else {
                        setTimeout(() => this.globalStore.setLoading(false), 300);
                    }
                }),

                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }
}
