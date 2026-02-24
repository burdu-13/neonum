import { Routes } from '@angular/router';
import { AuthContainer } from './core/auth/container/auth-container';
import { Login } from './core/auth/components/login/login';
import { SignUp } from './core/auth/components/sign-up/sign-up';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthContainer,
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: SignUp },
        ],
    },
];
