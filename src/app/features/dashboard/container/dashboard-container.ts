import { Component, effect, inject, OnInit } from '@angular/core';
import { UserStore } from '../../../store/user-info/user.store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieStore } from '../../../store/movie/movie.store';
import { MovieCard } from '../components/movie-card/movie-card';
import { Skeleton } from '../../../shared/components/skeleton/skeleton';
import { MovieShelf } from "../components/movie-shelf/movie-shelf";

@Component({
    selector: 'app-dashboard-container',
    imports: [CommonModule, MatButtonModule, MatIconModule, MovieCard, Skeleton, MovieShelf],
    templateUrl: './dashboard-container.html',
    styleUrl: './dashboard-container.scss',
})
export class DashboardContainer implements OnInit {
    public readonly store = inject(UserStore);
    public readonly movieStore = inject(MovieStore);

    constructor() {
        effect(() => {
            if (this.store.isAuthenticated() && !this.store.isLoading()) {
                this.movieStore.loadCollections();
            }
        });
    }

    public ngOnInit(): void {
        this.movieStore.loadAllMovies();
    }
}
