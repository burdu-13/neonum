import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-container',
    imports: [RouterOutlet],
    templateUrl: './auth-container.html',
    styleUrl: './auth-container.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainer {}
