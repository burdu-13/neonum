import { Routes } from '@angular/router';
import { AuthContainer } from './container/auth-container';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthContainer,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
            { path: 'sign-up', component: SignUp },
        ],
    },
];
