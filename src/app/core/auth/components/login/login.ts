import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, MatIconModule,MatFormFieldModule,MatInputModule,MatButtonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly _fb = inject(FormBuilder);

    public readonly loginForm: FormGroup = this._fb.nonNullable.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    public readonly loginSubmitted = output<void>();
    public readonly registerClicked = output<void>();
    public readonly guestClicked = output<void>();

    public onLogin(): void {
        if (this.loginForm.valid) {
            this.loginSubmitted.emit();
        }
    }
}
