import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { catchError, EMPTY, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly authService = inject(Auth);
    private readonly snackBar = inject(MatSnackBar);

    public readonly loginForm: FormGroup = this.fb.nonNullable.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    public readonly loginSubmitted = output<void>();
    public readonly guestClicked = output<void>();

    public onLogin(): void {
        if (this.loginForm.invalid) return;

        this.authService
            .login(this.loginForm.getRawValue())
            .pipe(
                tap(() => {
                    this.loginSubmitted.emit();
                    this.router.navigate(['/']);
                }),

                catchError((err) => {
                    this.showErrorNotification();
                    return EMPTY;
                }),
            )
            .subscribe();
    }

    private showErrorNotification(): void {
        this.snackBar.open('Authorization failed. Check your TMDB credentials.', 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar'],
        });
    }

    public onRegisterNavigate(): void {
        this.router.navigate(['auth/sign-up']);
    }
}
