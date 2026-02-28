import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.routes').then((c) => c.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
    },
    {
        path: 'search',
        loadComponent: () =>
            import('./features/search/container/search-container').then((c) => c.SearchContainer),
    },
    {
        path: 'movie/:id',
        loadComponent: () =>
            import('./features/movie-detail/container/movie-detailer-container').then(
                (c) => c.MovieDetailerContainer,
            ),
    },
    {
        path: 'tv/:id',
        loadComponent: () =>
            import('./features/movie-detail/container/movie-detailer-container').then(
                (c) => c.MovieDetailerContainer,
            ),
    },
    {
        path: 'actor/:id',
        loadComponent: () =>
            import('./features/actor-detail/container/actor-detail-container').then(
                (c) => c.ActorDetailContainer,
            ),
    },
    {
        path: 'explore',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/explore/container/explore-container').then(
                (c) => c.FeatureContainer,
            ),
    },
    {
        path: 'profile/me',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/user-profile/container/user-profile-container').then(
                (c) => c.UserProfileContainer,
            ),
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
