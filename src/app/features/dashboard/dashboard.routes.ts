import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./container/dashboard-container').then((c) => c.DashboardContainer),
    },
];
