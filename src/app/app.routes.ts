import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./core/auth/auth.routes').then((c) => c.AUTH_ROUTES),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
    },
    {
        path: 'movie/:id',
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
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
