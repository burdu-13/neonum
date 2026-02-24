import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
    private readonly router = inject(Router);

    public readonly tmdbSignupUrl: string = 'https://www.themoviedb.org/signup';

    public onBackToLogin(): void {
        this.router.navigate(['/auth/login']);
    }
}
