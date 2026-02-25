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
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];
