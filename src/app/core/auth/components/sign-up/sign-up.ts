import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NnButton } from '../../../../shared/components/nn-button/nn-button';

@Component({
    selector: 'app-sign-up',
    imports: [MatButtonModule, MatIconModule, NnButton],
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

    public onRegister(): void {
        window.open(this.tmdbSignupUrl, '_blank');
    }
}
