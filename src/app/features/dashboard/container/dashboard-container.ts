import { Component, effect, inject, OnInit } from '@angular/core';
import { UserStore } from '../../../store/user-info/user.store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieStore } from '../../../store/movie/movie.store';
import { MovieCard } from '../../../shared/components/movie-card/movie-card';
import { NnEmptyState } from '../../../shared/components/nn-empty-state/nn-empty-state';
import { NnBanner } from '../../../shared/components/nn-banner/nn-banner';
import { NnButton } from '../../../shared/components/nn-button/nn-button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-container',
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MovieCard,
        NnEmptyState,
        NnBanner,
        NnButton,
    ],
    templateUrl: './dashboard-container.html',
    styleUrl: './dashboard-container.scss',
})
export class DashboardContainer implements OnInit {
    public readonly userStore = inject(UserStore);
    public readonly movieStore = inject(MovieStore);
    public readonly router = inject(Router);

    constructor() {
        effect(() => {
            const auth = this.userStore.isAuthenticated();
            const isGuest = this.userStore.isGuest();
            const loading = this.userStore.isLoading();

            if (auth && !isGuest && !loading) {
                this.movieStore.loadCollections();
            }
        });
    }

    ngOnInit(): void {
        this.movieStore.loadAllMovies();
    }

    protected navigateToExplore(): void {
        this.router.navigate(['/explore']);
    }
}
