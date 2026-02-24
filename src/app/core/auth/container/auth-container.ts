import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-container',
    imports: [RouterOutlet],
    templateUrl: './auth-container.html',
    styleUrl: './auth-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer {
    private readonly router = inject(Router);

    public navigateToRegister(): void {
        this.router.navigate(['/auth/sign-up']);
    }

    public handleGuestLogin(): void {}
}
