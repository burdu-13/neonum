import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        title: 'Neonum | Authenticate',
        loadChildren: () => import('./core/auth/auth.routes').then((c) => c.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        title: 'Neonum | Dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
    },
    {
        path: 'explore',
        title: 'Neonum | Explore Media',
        loadComponent: () =>
            import('./features/explore/container/explore-container').then(
                (c) => c.FeatureContainer,
            ),
    },
    {
        path: 'search',
        title: 'Neonum | Search',
        loadComponent: () =>
            import('./features/search/container/search-container').then((c) => c.SearchContainer),
    },
    {
        path: 'movie/:id',
        loadChildren: () =>
            import('./features/movie-detail/movie.routes').then((m) => m.MOVIE_ROUTES),
    },
    {
        path: 'tv/:id',
        loadChildren: () =>
            import('./features/movie-detail/movie.routes').then((m) => m.MOVIE_ROUTES),
    },
    {
        path: 'actor/:id',
        title: 'Neonum | Personnel Profile',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/actor-detail/container/actor-detail-container').then(
                (c) => c.ActorDetailContainer,
            ),
    },
    {
        path: 'profile/me',
        title: 'Neonum | My Profile',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/user-profile/container/user-profile-container').then(
                (c) => c.UserProfileContainer,
            ),
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
